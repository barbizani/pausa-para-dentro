import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { contarConfirmados, gravarPendente, DadosInscricao } from "@/lib/sheets";

// Número de lugares do evento "Pausa para Dentro — 3.ª edição Educar com Amor e Consciência".
const CAPACIDADE_MAXIMA = Number(process.env.CAPACIDADE_MAXIMA ?? 60);

// O Payment Link do Stripe (guardar em variável de ambiente, não fixar no código —
// facilita trocar entre o link de TESTE, em uso agora, e o link LIVE em produção).
const STRIPE_PAYMENT_LINK = process.env.STRIPE_PAYMENT_LINK_URL!;

const schema = z.object({
  nomeCompleto: z.string().min(3),
  email: z.string().email(),
  telemovel: z.string().min(9),
  cidade: z.string().min(2),
  funcao: z.string().min(2),
  instituicao: z.string().optional(),
  motivacao: z.string().min(1),
  expectativa: z.string().min(1),
  comoSoube: z.string().min(1),
  jaParticipou: z.string().min(1),
  restricaoAlimentar: z.string().min(1), // "Nenhuma" se não aplicável
  nif: z.string().optional(),
  consentimentoReceberInfo: z.enum(["Sim", "Não"]),
  consentimentoComunicacoesFuturas: z.enum(["Sim", "Não"]),
  consentimentoFotosVideo: z.enum(["Sim", "Não"]),
  // Consentimento explícito e separado por se tratar de dado de categoria
  // especial RGPD (restrição alimentar pode revelar saúde ou religião).
  // Tem de ser "Sim" para a inscrição prosseguir.
  consentimentoDadosSensiveis: z.literal("Sim"),
});

export async function POST(req: NextRequest) {
  let body: DadosInscricao;
  try {
    body = schema.parse(await req.json());
  } catch {
    return NextResponse.json(
      { erro: "Dados do formulário inválidos ou incompletos." },
      { status: 400 }
    );
  }

  // Verificação de capacidade ANTES de gravar dados pessoais —
  // evita recolher PII para um evento já esgotado.
  const confirmados = await contarConfirmados();
  if (confirmados >= CAPACIDADE_MAXIMA) {
    return NextResponse.json(
      { erro: "lugares_esgotados" },
      { status: 409 }
    );
  }

  const registrationId = await gravarPendente(body);

  const redirectUrl = new URL(STRIPE_PAYMENT_LINK);
  redirectUrl.searchParams.set("client_reference_id", registrationId);
  redirectUrl.searchParams.set("prefilled_email", body.email);

  return NextResponse.json({ redirectUrl: redirectUrl.toString() });
}
