"use client";

import { Reveal } from "@/components/Reveal";

// Secção "O Nome" — explica a construção gráfica do logótipo (o «u» de
// pausa substituído por dois traços verticais). Serviu para alinhamento
// interno da marca; retirada do site público a pedido do cliente (não é
// conteúdo que o público final precise de ver). Guardada aqui, pronta a
// reutilizar — por exemplo num post a explicar a identidade visual do
// evento. Para repor no site: importar <ONomeSection /> em
// app/cuidado-v2/page.tsx e renderizar onde fizer sentido no fluxo.

const T = {
  ink: "#1f302e",
};

/**
 * Wordmark "PAUSA" onde o «u» é substituído por dois "ll" em Roboto,
 * evocando o símbolo gráfico de pausa (‖). Lê-se como PAUSA.
 *  variante "a": minúsculas — P(34) a(34) l(26) l(26) s(34) a(34)
 *  variante "b": maiúsculas — P(34) A(34) l(32) l(32) S(34) A(34)
 */
function PausaLL({
  variant = "a",
  ink = T.ink,
  bar,
}: {
  variant?: "a" | "b";
  ink?: string;
  bar?: string;
}) {
  const upper = variant === "b";
  const lRatio = upper ? 32 / 34 : 26 / 34; // proporção pedida (l vs restantes letras)
  const L = { P: "P", A: upper ? "A" : "a", S: upper ? "S" : "s" };
  const barColor = bar ?? ink;
  return (
    <span
      style={{
        fontFamily: "var(--font-roboto), system-ui, sans-serif",
        fontWeight: 400,
        display: "inline-flex",
        alignItems: "baseline",
        color: ink,
        lineHeight: 1,
        letterSpacing: "-0.01em",
      }}
      aria-label="Pausa"
    >
      <span>{L.P}</span>
      <span>{L.A}</span>
      <span style={{ fontSize: `${lRatio}em`, color: barColor, marginLeft: "0.05em" }}>l</span>
      <span style={{ fontSize: `${lRatio}em`, color: barColor, marginLeft: "0.03em", marginRight: "0.06em" }}>l</span>
      <span>{L.S}</span>
      <span>{L.A}</span>
    </span>
  );
}

function Eyebrow({ children }: { children: string }) {
  return (
    <span
      style={{ fontFamily: "var(--font-roboto)", color: "#5d8a82" }}
      className="text-[11.5px] font-medium tracking-[0.32em] uppercase"
    >
      {children}
    </span>
  );
}

export function ONomeSection() {
  return (
    <section className="relative grain px-6 py-28 text-center md:px-10 md:py-40" style={{ background: "linear-gradient(180deg,#f6f8f5,#e7eee8)" }}>
      <div className="mx-auto max-w-4xl">
        <Reveal><Eyebrow>O nome</Eyebrow></Reveal>
        <Reveal>
          <div className="mt-10 flex justify-center" style={{ fontSize: "clamp(76px,15vw,168px)" }}>
            <PausaLL variant="a" ink={T.ink} bar="#C97E63" />
          </div>
        </Reveal>
        <Reveal>
          <p style={{ fontFamily: "var(--font-cormorant)" }} className="mx-auto mt-9 max-w-xl text-2xl italic leading-snug text-[#3c5450] md:text-3xl">
            Repara no nome. O «u» de <span className="italic">pausa</span> é, afinal, o próprio símbolo de pausa — dois traços que pedem para parar.
          </p>
        </Reveal>
        <Reveal>
          <p className="mx-auto mt-5 max-w-lg text-[16px] leading-relaxed text-[#4a5a57]">
            O movimento proposto pelo evento está no princípio do gesto escrito.<br />
            As duas hastes substituem o «u» de forma orgânica: ao ler-se, <strong style={{ color: "#234d57" }}>pausa</strong>; respira-se antes de continuar.
          </p>
        </Reveal>
        {/* comparação das duas escalas */}
        <Reveal>
          <div className="mx-auto mt-16 grid max-w-2xl gap-5 sm:grid-cols-2">
            <div className="glass rounded-3xl p-9" style={{ background: "rgba(255,255,255,.5)", borderColor: "rgba(255,255,255,.7)" }}>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#5d8a82]">Opção A · minúsculas</div>
              <div className="mt-6 flex justify-center" style={{ fontSize: "clamp(44px,10vw,60px)" }}><PausaLL variant="a" ink={T.ink} /></div>
            </div>
            <div className="glass rounded-3xl p-9" style={{ background: "rgba(255,255,255,.5)", borderColor: "rgba(255,255,255,.7)" }}>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#5d8a82]">Opção B · maiúsculas</div>
              <div className="mt-6 flex justify-center" style={{ fontSize: "clamp(44px,10vw,60px)" }}><PausaLL variant="b" ink={T.ink} /></div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
