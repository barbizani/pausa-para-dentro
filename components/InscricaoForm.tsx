"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/lib/content";

const T = {
  teal: "#234d57",
  deep: "#16343b",
  sage: "#8fa896",
  ink: "#1f302e",
};

type SimNao = "Sim" | "Não";

type FormState = {
  nomeCompleto: string;
  email: string;
  telemovel: string;
  cidade: string;
  funcao: string;
  instituicao: string;
  motivacao: string;
  expectativa: string;
  comoSoube: string;
  jaParticipou: SimNao | "";
  restricaoAlimentar: string;
  nif: string;
  consentimentoReceberInfo: SimNao;
  consentimentoComunicacoesFuturas: SimNao;
  consentimentoFotosVideo: SimNao;
};

const EMPTY: FormState = {
  nomeCompleto: "",
  email: "",
  telemovel: "",
  cidade: "",
  funcao: "",
  instituicao: "",
  motivacao: "",
  expectativa: "",
  comoSoube: "",
  jaParticipou: "",
  restricaoAlimentar: "",
  nif: "",
  consentimentoReceberInfo: "Não",
  consentimentoComunicacoesFuturas: "Não",
  consentimentoFotosVideo: "Não",
};

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-medium uppercase tracking-[0.16em]" style={{ color: "#5d8a82" }}>
        {label}
      </span>
      <div className="mt-2">{children}</div>
      {hint && <span className="mt-1.5 block text-[12.5px] text-[#5d6b68]">{hint}</span>}
    </label>
  );
}

const inputClass =
  "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-[15px] text-[#1f302e] outline-none transition placeholder:text-black/30 focus:border-[#234d57] focus:ring-2 focus:ring-[#234d57]/15";

function YesNoToggle({
  value,
  onChange,
  required,
}: {
  value: SimNao | "";
  onChange: (v: SimNao) => void;
  required?: boolean;
}) {
  return (
    <div className="flex gap-2" role="radiogroup" aria-required={required}>
      {(["Sim", "Não"] as const).map((opt) => (
        <button
          key={opt}
          type="button"
          role="radio"
          aria-checked={value === opt}
          onClick={() => onChange(opt)}
          className="rounded-full px-5 py-2 text-sm font-medium transition"
          style={
            value === opt
              ? { background: T.teal, color: "white" }
              : { background: "rgba(35,77,87,.07)", color: T.teal }
          }
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export function InscricaoForm({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [data, setData] = useState<FormState>(EMPTY);
  const [mostrarNif, setMostrarNif] = useState(false);
  const [dadosSensiveisOk, setDadosSensiveisOk] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!data.jaParticipou) {
      setError("Falta responder se já participaste numa edição anterior.");
      return;
    }
    if (!dadosSensiveisOk) {
      setError("É necessário aceitar o consentimento sobre a restrição alimentar para avançar.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/inscricao", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          instituicao: data.instituicao || undefined,
          nif: data.nif || undefined,
          consentimentoDadosSensiveis: "Sim",
        }),
      });
      const result = await res.json();
      if (!res.ok) {
        setError(
          result.erro === "lugares_esgotados"
            ? "Lamentamos — as vagas para esta edição já estão esgotadas."
            : "Não foi possível validar os dados. Verifica o formulário e tenta novamente."
        );
        setSubmitting(false);
        return;
      }
      window.location.href = result.redirectUrl;
    } catch {
      setError("Ocorreu um erro de ligação. Tenta novamente.");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center overflow-y-auto bg-black/55 p-4 backdrop-blur-sm md:p-6">
      <div
        className="relative my-6 w-full max-w-xl rounded-[26px] bg-[#f3f5f2] p-7 shadow-2xl md:p-10"
        role="dialog"
        aria-modal="true"
        aria-labelledby="inscricao-titulo"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar formulário"
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-lg transition hover:bg-black/5"
          style={{ color: T.ink }}
        >
          ×
        </button>

        <span className="text-[11.5px] font-medium uppercase tracking-[0.28em]" style={{ color: "#5d8a82" }}>
          Inscrição
        </span>
        <h2
          id="inscricao-titulo"
          style={{ fontFamily: "var(--font-cormorant)" }}
          className="mt-2 text-3xl italic text-[#1f302e] md:text-4xl"
        >
          {EVENT.name}
        </h2>
        <p className="mt-1.5 text-sm text-[#4a5a57]">
          {EVENT.date} · {EVENT.place}, {EVENT.city}
        </p>
        <p className="mt-1 text-sm font-medium" style={{ color: T.teal }}>
          {EVENT.preco}€ por participante
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Nome completo">
              <input
                required
                minLength={3}
                className={inputClass}
                value={data.nomeCompleto}
                onChange={(e) => set("nomeCompleto", e.target.value)}
              />
            </Field>
            <Field label="Email">
              <input
                required
                type="email"
                className={inputClass}
                value={data.email}
                onChange={(e) => set("email", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Telemóvel">
              <input
                required
                type="tel"
                minLength={9}
                className={inputClass}
                value={data.telemovel}
                onChange={(e) => set("telemovel", e.target.value)}
              />
            </Field>
            <Field label="Cidade">
              <input
                required
                className={inputClass}
                value={data.cidade}
                onChange={(e) => set("cidade", e.target.value)}
              />
            </Field>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Field label="Função">
              <input
                required
                placeholder="ex.: professora, psicólogo, pai/mãe..."
                className={inputClass}
                value={data.funcao}
                onChange={(e) => set("funcao", e.target.value)}
              />
            </Field>
            <Field label="Instituição (opcional)">
              <input
                className={inputClass}
                value={data.instituicao}
                onChange={(e) => set("instituicao", e.target.value)}
              />
            </Field>
          </div>

          <Field label="O que te motiva a participar?">
            <textarea
              required
              rows={3}
              className={inputClass}
              value={data.motivacao}
              onChange={(e) => set("motivacao", e.target.value)}
            />
          </Field>

          <Field label="O que esperas levar deste dia?">
            <textarea
              required
              rows={3}
              className={inputClass}
              value={data.expectativa}
              onChange={(e) => set("expectativa", e.target.value)}
            />
          </Field>

          <Field label="Como soubeste deste evento?">
            <input
              required
              className={inputClass}
              value={data.comoSoube}
              onChange={(e) => set("comoSoube", e.target.value)}
            />
          </Field>

          <Field label="Já participaste numa edição anterior?">
            <YesNoToggle
              required
              value={data.jaParticipou}
              onChange={(v) => set("jaParticipou", v)}
            />
          </Field>

          <Field
            label="Restrição alimentar"
            hint='Escreve "Nenhuma" se não se aplicar.'
          >
            <input
              required
              className={inputClass}
              value={data.restricaoAlimentar}
              onChange={(e) => set("restricaoAlimentar", e.target.value)}
            />
          </Field>

          {mostrarNif ? (
            <Field label="NIF (opcional)">
              <input
                inputMode="numeric"
                autoFocus
                className={inputClass}
                value={data.nif}
                onChange={(e) => set("nif", e.target.value)}
              />
            </Field>
          ) : (
            <button
              type="button"
              onClick={() => setMostrarNif(true)}
              className="text-sm font-medium underline-offset-2 hover:underline"
              style={{ color: T.teal }}
            >
              Quero NIF na fatura ›
            </button>
          )}

          <div className="border-t pt-6" style={{ borderColor: "rgba(35,77,87,.15)" }}>
            <div className="flex items-center justify-between gap-4">
              <span className="text-[11.5px] font-medium uppercase tracking-[0.24em]" style={{ color: "#5d8a82" }}>
                Consentimentos
              </span>
              <button
                type="button"
                onClick={() =>
                  setData((d) => ({
                    ...d,
                    consentimentoReceberInfo: "Sim",
                    consentimentoComunicacoesFuturas: "Sim",
                    consentimentoFotosVideo: "Sim",
                  }))
                }
                className="text-[13px] font-medium underline-offset-2 hover:underline"
                style={{ color: T.teal }}
              >
                Aceitar tudo
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <p className="text-[14.5px] text-[#4a5a57]">
                  Aceito receber informações sobre a minha inscrição (confirmação, lembretes, alterações).
                </p>
                <YesNoToggle
                  value={data.consentimentoReceberInfo}
                  onChange={(v) => set("consentimentoReceberInfo", v)}
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-[14.5px] text-[#4a5a57]">
                  Aceito receber comunicações futuras sobre outros eventos e iniciativas.
                </p>
                <YesNoToggle
                  value={data.consentimentoComunicacoesFuturas}
                  onChange={(v) => set("consentimentoComunicacoesFuturas", v)}
                />
              </div>
              <div className="flex items-start justify-between gap-4">
                <p className="text-[14.5px] text-[#4a5a57]">
                  Aceito ser fotografado(a)/filmado(a) durante o evento, para fins de divulgação.
                </p>
                <YesNoToggle
                  value={data.consentimentoFotosVideo}
                  onChange={(v) => set("consentimentoFotosVideo", v)}
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-start gap-3 rounded-2xl border p-4" style={{ borderColor: "rgba(35,77,87,.25)", background: "rgba(35,77,87,.05)" }}>
              <input
                required
                type="checkbox"
                className="mt-0.5 h-4 w-4 flex-none accent-[#234d57]"
                checked={dadosSensiveisOk}
                onChange={(e) => setDadosSensiveisOk(e.target.checked)}
              />
              <span className="text-[13.5px] leading-relaxed text-[#4a5a57]">
                Autorizo o tratamento do dado sobre a minha restrição alimentar, exclusivamente
                para a organização da refeição do evento (dado de categoria especial ao abrigo do
                RGPD). <strong>Sem este consentimento não é possível prosseguir com a inscrição.</strong>
              </span>
            </label>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>
          )}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 w-full rounded-full px-8 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
            style={{ background: T.teal }}
          >
            {submitting ? "A processar…" : `Continuar para pagamento → ${EVENT.preco}€`}
          </button>
          <p className="text-center text-[12.5px] text-[#5d6b68]">
            Serás redirecionado(a) para o pagamento seguro (Stripe). A inscrição só fica
            confirmada depois do pagamento.
          </p>
        </form>
      </div>
    </div>
  );
}
