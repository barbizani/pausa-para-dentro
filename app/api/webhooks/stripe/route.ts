import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";
import { procurarPorId, marcarComoPago } from "@/lib/sheets";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

const EMAIL_ORGANIZACAO = "info@georginangelica.com";
const EMAIL_REMETENTE = process.env.EMAIL_REMETENTE ?? "inscricoes@eventos.mentalks.pt";

// Necessário para verificar a assinatura do webhook: precisamos do corpo
// em bruto (raw), sem o Next.js o converter em JSON automaticamente.
export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const corpo = await req.text();
  const assinatura = req.headers.get("stripe-signature");

  let evento: Stripe.Event;
  try {
    evento = stripe.webhooks.constructEvent(
      corpo,
      assinatura!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (erro) {
    console.error("Assinatura do webhook inválida:", erro);
    return NextResponse.json({ erro: "assinatura_invalida" }, { status: 400 });
  }

  if (evento.type !== "checkout.session.completed") {
    // Não é o evento que nos interessa — responder 200 na mesma para o
    // Stripe não continuar a reenviar.
    return NextResponse.json({ recebido: true });
  }

  const session = evento.data.object as Stripe.Checkout.Session;
  const registrationId = session.client_reference_id;

  if (!registrationId) {
    console.error("checkout.session.completed sem client_reference_id:", session.id);
    // Responder 200 para não gerar retries infinitos — mas isto precisa de
    // investigação manual (ex. pagamento feito sem passar pelo formulário).
    return NextResponse.json({ recebido: true, aviso: "sem_registration_id" });
  }

  const registo = await procurarPorId(registrationId);
  if (!registo) {
    console.error("Registo não encontrado para registration_id:", registrationId);
    return NextResponse.json({ recebido: true, aviso: "registo_nao_encontrado" });
  }

  try {
    await marcarComoPago(registo.linhaIndex, {
      stripeSessionId: session.id,
      valorPagoCentimos: session.amount_total ?? 0,
      dataPagamento: new Date().toISOString(),
    });
  } catch (erro) {
    console.error(`[marcarComoPago] falhou para registration_id ${registrationId}:`, erro);
  }

  // Nota de faturação: a Georgina emite a fatura manualmente. O NIF (se
  // fornecido) vai neste email para ela não ter de ir procurar na Sheet.
  try {
    await resend.emails.send({
      from: EMAIL_REMETENTE,
      to: EMAIL_ORGANIZACAO,
      subject: `Nova inscrição paga — ${registo.nomeCompleto}`,
      html: `
        <h2>Nova inscrição confirmada — Pausa para Dentro</h2>
        <p><strong>Valor pago:</strong> ${((session.amount_total ?? 0) / 100).toFixed(2)} €</p>
        <hr>
        <p><strong>Nome:</strong> ${registo.nomeCompleto}</p>
        <p><strong>Email:</strong> ${registo.email}</p>
        <p><strong>Telemóvel:</strong> ${registo.telemovel}</p>
        <p><strong>NIF:</strong> ${registo.nif || "não fornecido"}</p>
        <p><strong>Cidade:</strong> ${registo.cidade}</p>
        <p><strong>Função:</strong> ${registo.funcao}</p>
        <p><strong>Instituição:</strong> ${registo.instituicao || "—"}</p>
        <p><strong>Restrição alimentar:</strong> ${registo.restricaoAlimentar}</p>
        <hr>
        <p><strong>Motivação:</strong> ${registo.motivacao}</p>
        <p><strong>Expectativa:</strong> ${registo.expectativa}</p>
        <p><strong>Como soube do evento:</strong> ${registo.comoSoube}</p>
        <p><strong>Já participou antes:</strong> ${registo.jaParticipou}</p>
        <hr>
        <p><strong>Aceita receber informações:</strong> ${registo.consentimentoReceberInfo}</p>
        <p><strong>Aceita comunicações futuras:</strong> ${registo.consentimentoComunicacoesFuturas}</p>
        <p><strong>Aceita fotos/vídeo:</strong> ${registo.consentimentoFotosVideo}</p>
      `,
    });
  } catch (erro) {
    console.error(`[email organização] falhou para registration_id ${registrationId}:`, erro);
  }

  // Confirmação ao participante — sem valor pago nem dados de pagamento
  // (o Stripe já emite o recibo próprio, com "Successful payments" ativado).
  try {
    await resend.emails.send({
      from: EMAIL_REMETENTE,
      to: registo.email,
      replyTo: EMAIL_ORGANIZACAO,
      subject: "A tua inscrição no Pausa para Dentro está confirmada 🌿",
      html: `
        <p>Olá ${registo.nomeCompleto},</p>
        <p>A tua inscrição na 3.ª edição do Pausa para Dentro — Educar com Amor e Consciência está confirmada. Ficamos felizes por te teres inscrito.</p>
        <p>Os detalhes do dia:<br>
        Data: 24 de outubro de 2026<br>
        Hora: 10h-17h<br>
        Local: Fundação Maria Droste, Lisboa</p>
        <p>Traz a tua intenção e a tua presença — deixa a pausa cuidar de ti.</p>
        <p>Qualquer dúvida, estamos por aqui:<br>
        info@georginangelica.com</p>
        <p>Georgina Angélica: +351 965 718 540<br>
        Cristina Figueira: +351 916 876 121<br>
        Ângela Almeida: +351 966 068 641</p>
        <p>Se responderes a este email, garante que envias para info@georginangelica.com — esta caixa não é monitorizada.</p>
        <p>Até breve,<br>
        <img src="https://pausaparadentro.georginangelica.com/brand/cuidado-symbol.png" alt="Pausa para Dentro" width="48" style="max-width:48px;height:auto;vertical-align:middle;margin-right:8px;">
        Equipa Pausa para Dentro</p>
      `,
    });
  } catch (erro) {
    console.error(`[email participante] falhou para registration_id ${registrationId}:`, erro);
  }

  return NextResponse.json({ recebido: true });
}
