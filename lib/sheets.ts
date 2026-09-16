import { google } from "googleapis";

// ── Configuração ────────────────────────────────────────────────────────
// Variáveis de ambiente necessárias (ver .env.example):
//   GOOGLE_SERVICE_ACCOUNT_EMAIL
//   GOOGLE_PRIVATE_KEY          (com \n literais — ver nota no .env.example)
//   GOOGLE_SHEET_ID
//
// A Sheet deve ter uma aba chamada "Inscricoes" com estas colunas, por esta ordem:
// A: registration_id | B: timestamp | C: status | D: nomeCompleto | E: email
// F: telemovel | G: cidade | H: funcao | I: instituicao | J: motivacao
// K: expectativa | L: comoSoube | M: jaParticipou | N: restricaoAlimentar
// O: nif | P: consentimentoReceberInfo | Q: consentimentoComunicacoesFuturas
// R: consentimentoFotosVideo | S: consentimentoDadosSensiveis
// T: stripeSessionId | U: valorPagoCentimos | V: dataPagamento

const SHEET_NAME = "Inscricoes";

const CABECALHO = [
  "registration_id", "timestamp", "status", "nomeCompleto", "email",
  "telemovel", "cidade", "funcao", "instituicao", "motivacao",
  "expectativa", "comoSoube", "jaParticipou", "restricaoAlimentar", "nif",
  "consentimentoReceberInfo", "consentimentoComunicacoesFuturas",
  "consentimentoFotosVideo", "consentimentoDadosSensiveis",
  "stripeSessionId", "valorPagoCentimos", "dataPagamento",
];

/**
 * Garante que a linha 1 tem o cabeçalho esperado antes de qualquer leitura/escrita
 * que assuma dados a partir da linha 2 (contarConfirmados, procurarPorId, gravarPendente).
 * Sem isto, uma Sheet nova/vazia faz o primeiro append() cair na linha 1, onde as
 * leituras "A2:V" nunca a encontram — foi exatamente isto que aconteceu na 1ª inscrição
 * de teste (registration_id ficou invisível para procurarPorId).
 */
async function garantirCabecalho(sheets: ReturnType<typeof getSheets>) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A1:V1`,
  });
  const linhaAtual = res.data.values?.[0] ?? [];
  const temCabecalho = CABECALHO.every((col, i) => linhaAtual[i] === col);
  if (temCabecalho) return;

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A1:V1`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [CABECALHO] },
  });
}

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  if (!email || !privateKey) {
    throw new Error("Credenciais Google Sheets em falta nas variáveis de ambiente.");
  }
  return new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
}

function getSheets() {
  return google.sheets({ version: "v4", auth: getAuth() });
}

export interface DadosInscricao {
  nomeCompleto: string;
  email: string;
  telemovel: string;
  cidade: string;
  funcao: string;
  instituicao?: string;
  motivacao: string;
  expectativa: string;
  comoSoube: string;
  jaParticipou: string;
  restricaoAlimentar: string;
  nif?: string;
  consentimentoReceberInfo: "Sim" | "Não";
  consentimentoComunicacoesFuturas: "Sim" | "Não";
  consentimentoFotosVideo: "Sim" | "Não";
  consentimentoDadosSensiveis: "Sim" | "Não";
}

/**
 * Conta quantas inscrições já têm status "Pago".
 * Usar antes de mostrar o formulário / aceitar nova inscrição, para
 * respeitar o limite de vagas de forma independente do limite nativo
 * configurado no Payment Link.
 */
export async function contarConfirmados(): Promise<number> {
  const sheets = getSheets();
  await garantirCabecalho(sheets);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!C2:C`,
  });
  const linhas = res.data.values ?? [];
  return linhas.filter((linha) => linha[0] === "Pago").length;
}

/**
 * Grava uma nova inscrição como "Pendente", antes do redirect para o Stripe.
 * Devolve o registration_id gerado (usa-se como client_reference_id no Stripe).
 */
export async function gravarPendente(
  dados: DadosInscricao
): Promise<string> {
  const sheets = getSheets();
  await garantirCabecalho(sheets);
  const registrationId = crypto.randomUUID();
  const timestamp = new Date().toISOString();

  const linha = [
    registrationId,
    timestamp,
    "Pendente",
    dados.nomeCompleto,
    dados.email,
    dados.telemovel,
    dados.cidade,
    dados.funcao,
    dados.instituicao ?? "",
    dados.motivacao,
    dados.expectativa,
    dados.comoSoube,
    dados.jaParticipou,
    dados.restricaoAlimentar,
    dados.nif ?? "",
    dados.consentimentoReceberInfo,
    dados.consentimentoComunicacoesFuturas,
    dados.consentimentoFotosVideo,
    dados.consentimentoDadosSensiveis,
    "", // stripeSessionId — preenchido pelo webhook
    "", // valorPagoCentimos — preenchido pelo webhook
    "", // dataPagamento — preenchido pelo webhook
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A:V`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [linha] },
  });

  return registrationId;
}

export interface RegistoCompleto extends DadosInscricao {
  registrationId: string;
  linhaIndex: number; // índice 1-based na Sheet, para update
}

/**
 * Procura um registo pendente pelo registration_id (client_reference_id
 * devolvido pelo webhook do Stripe).
 */
export async function procurarPorId(
  registrationId: string
): Promise<RegistoCompleto | null> {
  const sheets = getSheets();
  await garantirCabecalho(sheets);
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!A2:V`,
  });
  const linhas = res.data.values ?? [];
  const idx = linhas.findIndex((linha) => linha[0] === registrationId);
  if (idx === -1) return null;

  const linha = linhas[idx];
  return {
    registrationId: linha[0],
    linhaIndex: idx + 2, // +2 porque A2 é a primeira linha de dados
    nomeCompleto: linha[3],
    email: linha[4],
    telemovel: linha[5],
    cidade: linha[6],
    funcao: linha[7],
    instituicao: linha[8],
    motivacao: linha[9],
    expectativa: linha[10],
    comoSoube: linha[11],
    jaParticipou: linha[12],
    restricaoAlimentar: linha[13],
    nif: linha[14],
    consentimentoReceberInfo: linha[15] as "Sim" | "Não",
    consentimentoComunicacoesFuturas: linha[16] as "Sim" | "Não",
    consentimentoFotosVideo: linha[17] as "Sim" | "Não",
    consentimentoDadosSensiveis: linha[18] as "Sim" | "Não",
  };
}

/**
 * Atualiza só a coluna de status (ex.: "Falhou", depois de
 * checkout.session.async_payment_failed) — sem tocar nas colunas de
 * pagamento, que só fazem sentido quando o pagamento é confirmado.
 */
export async function marcarStatus(linhaIndex: number, status: string) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!C${linhaIndex}:C${linhaIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [[status]] },
  });
}

/**
 * Marca um registo como "Pago" depois de confirmação via webhook.
 */
export async function marcarComoPago(
  linhaIndex: number,
  info: { stripeSessionId: string; valorPagoCentimos: number; dataPagamento: string }
) {
  const sheets = getSheets();
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!C${linhaIndex}:C${linhaIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [["Pago"]] },
  });
  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `${SHEET_NAME}!T${linhaIndex}:V${linhaIndex}`,
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[info.stripeSessionId, info.valorPagoCentimos, info.dataPagamento]],
    },
  });
}
