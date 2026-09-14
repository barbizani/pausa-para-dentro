"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { FacilitadorCard } from "@/components/FacilitadorCard";
import {
  EVENT,
  CONTEXT,
  NASCIMENTO,
  UNIAO,
  OQUEE,
  DIFER,
  PROGRAMA,
  FACILITADORES,
  PARCEIROS,
  QUEM,
  FINAL,
} from "@/lib/content";

// Prefixo para subpasta. Em static export o next/image NÃO prefixa o basePath,
// por isso aplicamo-lo manualmente a todas as imagens. Em produção BASE = "".
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const HERO = BASE + "/photos/hero-floresta.jpg";
const AMBIENTE = BASE + "/photos/ambiente-reflexo.jpg";

const T = {
  teal: "#234d57",
  deep: "#16343b",
  sage: "#8fa896",
  ivory: "#f3f5f2",
  ink: "#1f302e",
};

function Eyebrow({ children, light = false }: { children: string; light?: boolean }) {
  return (
    <span
      style={{ fontFamily: "var(--font-roboto)", color: light ? T.sage : "#5d8a82" }}
      className="text-[11.5px] font-medium tracking-[0.32em] uppercase"
    >
      {children}
    </span>
  );
}

export default function Cuidado() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 160]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 50);
    addEventListener("scroll", on);
    return () => removeEventListener("scroll", on);
  }, []);

  return (
    <main style={{ background: T.ivory, color: T.ink, fontFamily: "var(--font-roboto)" }}>
      {/* NAV */}
      <header
        className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 md:px-10"
        style={
          scrolled
            ? { background: "rgba(243,245,242,.8)", backdropFilter: "blur(16px)", boxShadow: "0 1px 0 rgba(0,0,0,.05)" }
            : {}
        }
      >
        <div className="flex items-center gap-2.5" style={{ opacity: scrolled ? 1 : 0, transition: "opacity .4s" }}>
          <Image src={BASE + "/brand/cuidado-symbol.png"} alt="" width={30} height={30} style={{ height: "auto" }} />
          <span style={{ fontFamily: "var(--font-cormorant)" }} className="text-lg italic">Pausa para Dentro</span>
        </div>
        <a
          href="#inscricao"
          className="rounded-full px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
          style={{ background: T.teal }}
        >
          {EVENT.cta}
        </a>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative grain flex min-h-screen items-center overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image src={HERO} alt="Floresta serena" fill priority className="object-cover" />
        </motion.div>
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(22,52,59,.62) 0%, rgba(35,77,87,.40) 45%, rgba(22,52,59,.78) 100%)" }}
        />
        <motion.div style={{ opacity: fade }} className="relative mx-auto w-full max-w-5xl px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="glass max-w-2xl rounded-[28px] p-9 md:p-12"
            style={{ background: "rgba(243,245,242,.1)" }}
          >
            <Image src={BASE + "/brand/cuidado-symbol-light.png"} alt="" width={64} height={64} className="mb-7 opacity-95" />
            <Eyebrow light>{EVENT.edition}</Eyebrow>
            <h1
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-5 text-5xl leading-[0.98] text-white md:text-7xl"
            >
              Pausa para Dentro
            </h1>
            <p className="mt-3 text-sm text-white/70">{EVENT.coCreation}</p>
            <p
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-7 max-w-md text-xl italic leading-snug text-white/95 md:text-2xl"
            >
              {EVENT.sub}
            </p>
            <p className="mt-4 text-sm" style={{ color: T.sage }}>{EVENT.impact}</p>
            <a
              href="#inscricao"
              className="mt-9 inline-flex items-center gap-3 rounded-full px-9 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              style={{ background: T.teal }}
            >
              {EVENT.cta} <span aria-hidden>→</span>
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* CONTEXTO */}
      <section className="px-6 py-28 md:px-10 md:py-36" style={{ background: T.deep, color: "rgba(255,255,255,.8)" }}>
        <div className="mx-auto max-w-2xl">
          <Reveal><Eyebrow light>{CONTEXT.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl text-white md:text-5xl">
              {CONTEXT.title}
            </h2>
          </Reveal>
          <Reveal><p className="mt-7 text-[18px] leading-relaxed">{CONTEXT.intro}</p></Reveal>
          <Reveal>
            <div style={{ fontFamily: "var(--font-cormorant)" }} className="my-9 space-y-1 text-2xl italic text-white">
              {CONTEXT.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          </Reveal>
          <Reveal><p className="text-[18px] leading-relaxed">{CONTEXT.outro}</p></Reveal>
        </div>
      </section>

      {/* NASCIMENTO */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal><Eyebrow>{NASCIMENTO.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl md:text-5xl" >
              {NASCIMENTO.title}
            </h2>
          </Reveal>
          <Reveal><p className="mt-7 text-[18px] leading-relaxed text-[#4a5a57]">{NASCIMENTO.p1}</p></Reveal>
          <Reveal><p className="mt-5 text-[18px] leading-relaxed text-[#4a5a57]">{NASCIMENTO.p2}</p></Reveal>
        </div>
      </section>

      {/* UNIÃO */}
      <section className="relative grain px-6 py-28 md:px-10 md:py-36" style={{ background: "linear-gradient(180deg,#e6ede9,#dbe6e1)" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal><Eyebrow>{UNIAO.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl md:text-5xl">{UNIAO.title}</h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {UNIAO.cards.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="glass h-full rounded-3xl p-8" style={{ background: "rgba(255,255,255,.42)", borderColor: "rgba(255,255,255,.6)" }}>
                  <div className="flex h-16 items-center">
                    <img src={BASE + c.logo} alt={c.name} className="max-h-16 w-auto max-w-[120px] object-contain" style={c.logo.endsWith(".svg") ? { filter: "invert(1) brightness(.2)" } : undefined} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-5 text-xl" >{c.name}</h3>
                  <p className="mt-3 text-[16px] leading-relaxed text-[#4a5a57]">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mx-auto mt-16 max-w-2xl text-center text-2xl italic text-[#234d57] md:text-3xl">
              {UNIAO.close}
            </p>
          </Reveal>
        </div>
      </section>

      {/* O QUE É */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal><Eyebrow>{OQUEE.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl md:text-5xl">{OQUEE.title}</h2></Reveal>
          <Reveal><p className="mt-7 text-[18px] leading-relaxed text-[#4a5a57]">{OQUEE.intro}</p></Reveal>
          <Reveal>
            <div style={{ fontFamily: "var(--font-cormorant)" }} className="my-7 text-3xl italic" >
              {OQUEE.not.map((n) => <p key={n} style={{ color: T.sage }}>{n}</p>)}
            </div>
          </Reveal>
          <Reveal><p className="text-[18px] leading-relaxed text-[#4a5a57]">{OQUEE.is}</p></Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {OQUEE.temas.map((t) => (
                <span key={t} className="rounded-full border px-5 py-2 text-sm" style={{ borderColor: "rgba(35,77,87,.18)", color: T.teal }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAÇÃO + ambiente image */}
      <section className="relative grain overflow-hidden">
        <Image src={AMBIENTE} alt="Reflexão ao pôr-do-sol" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(22,52,59,.82),rgba(35,77,87,.7))" }} />
        <div className="relative mx-auto max-w-2xl px-6 py-32 md:px-10 md:py-44">
          <Reveal><Eyebrow light>{DIFER.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-5xl leading-[1.02] text-white md:text-6xl">
              {DIFER.quoteA}<br /><span style={{ color: T.sage }}>{DIFER.quoteB}</span>
            </p>
          </Reveal>
          <Reveal><p className="mt-9 text-[18px] leading-relaxed text-white/85">{DIFER.intro}</p></Reveal>
          <Reveal>
            <div className="mt-7 flex flex-wrap gap-2.5">
              {DIFER.modos.map((m) => (
                <span key={m} className="glass rounded-full px-5 py-2 text-sm text-white">{m}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMA */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal><Eyebrow>{PROGRAMA.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl md:text-5xl">{PROGRAMA.title}</h2></Reveal>
          <Reveal>
            <div className="mt-6 space-y-3">
              {PROGRAMA.intro.map((line) => (
                <p key={line} className="text-[16px] text-[#4a5a57]">{line}</p>
              ))}
            </div>
          </Reveal>
          <div className="mt-12 border-t" style={{ borderColor: "rgba(35,77,87,.15)" }}>
            {PROGRAMA.blocos.map((b, i) => (
              <Reveal key={b.label} delay={i * 0.06}>
                <div className="grid grid-cols-[110px_1fr] gap-6 border-b py-7" style={{ borderColor: "rgba(35,77,87,.15)" }}>
                  <div style={{ fontFamily: "var(--font-cormorant)" }} className="text-lg italic" >{b.time}</div>
                  <div>
                    <span style={{ fontFamily: "var(--font-roboto)", color: "#5d8a82" }} className="text-[11px] font-medium tracking-[0.22em] uppercase">
                      {b.label}
                    </span>
                    {"title" in b && b.title && (
                      <h3 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-1 text-xl">{b.title}</h3>
                    )}
                    <div className="mt-2 space-y-2">
                      {b.desc.map((line) => (
                        <p key={line} className="text-[16px] text-[#4a5a57]">{line}</p>
                      ))}
                    </div>
                    {"perguntas" in b && b.perguntas && (
                      <ul className="mt-2 space-y-1.5 border-l pl-4" style={{ borderColor: "rgba(35,77,87,.2)" }}>
                        {b.perguntas.map((q) => (
                          <li key={q} style={{ fontFamily: "var(--font-cormorant)" }} className="text-[16px] italic text-[#4a5a57]">
                            {q}
                          </li>
                        ))}
                      </ul>
                    )}
                    {"movimentos" in b && b.movimentos && (
                      <ul className="mt-3 space-y-3">
                        {b.movimentos.map((m) => (
                          <li key={m} className="text-[16px] text-[#4a5a57]">{m}</li>
                        ))}
                      </ul>
                    )}
                    {"descFinal" in b && b.descFinal && (
                      <p className="mt-3 text-[16px] text-[#4a5a57]">{b.descFinal}</p>
                    )}
                    {"facilitador" in b && b.facilitador && (
                      <p style={{ fontFamily: "var(--font-cormorant)", color: T.teal }} className="mt-3 text-[15px] italic">
                        {b.facilitador}
                      </p>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FACILITADORES */}
      <section className="px-6 py-28 md:px-10 md:py-36" style={{ background: "linear-gradient(180deg,#f3f5f2,#eaf0eb)" }}>
        <div className="mx-auto max-w-5xl">
          <Reveal className="text-center"><Eyebrow>{FACILITADORES.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <h2
              style={{ fontFamily: "var(--font-cormorant)" }}
              className="mt-6 text-center text-4xl md:text-5xl"
            >
              {FACILITADORES.title}
            </h2>
          </Reveal>
          <Reveal>
            <p className="mx-auto mt-5 max-w-md text-center text-[15px] text-[#4a5a57]">
              {FACILITADORES.intro}
            </p>
          </Reveal>
          {/* flex + wrap (em vez de grid) para que a última linha incompleta
              fique centrada em vez de alinhada à esquerda com espaço vazio */}
          <div className="mt-14 flex flex-wrap justify-center gap-5">
            {FACILITADORES.pessoas.map((pessoa, i) => (
              <Reveal
                key={pessoa.slug}
                delay={i * 0.05}
                className="h-full w-[calc(50%-10px)] md:w-[calc(33.333%-13.34px)] lg:w-[calc(25%-15px)]"
              >
                <FacilitadorCard pessoa={pessoa} base={BASE} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* LOCAL E DATA */}
      <section className="px-6 py-24 md:px-10" style={{ background: "linear-gradient(180deg,#e6ede9,#dbe6e1)" }}>
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center"><Eyebrow>Onde e quando</Eyebrow></Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {[
              { k: "Local", v: `${EVENT.place}\n${EVENT.city}`, logo: "/logos/fundacao-maria-droste.svg" },
              { k: "Data", v: EVENT.date },
              { k: "Horário", v: EVENT.time },
            ].map((m, i) => (
              <Reveal key={m.k} delay={i * 0.08}>
                <div className="glass rounded-3xl p-9 text-center" style={{ background: "rgba(255,255,255,.5)", borderColor: "rgba(255,255,255,.7)" }}>
                  <div className="text-[11.5px] uppercase tracking-[0.2em] text-[#5d8a82]">{m.k}</div>
                  <div style={{ fontFamily: "var(--font-cormorant)" }} className="mt-3 whitespace-pre-line text-2xl text-[#234d57]">{m.v}</div>
                  {m.logo && (
                    <div className="relative mx-auto mt-4 h-9 w-full max-w-[150px]">
                      <Image src={BASE + m.logo} alt={m.v.split("\n")[0]} fill className="object-contain" />
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARCEIROS */}
      <section className="px-6 py-24 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal><Eyebrow>{PARCEIROS.eyebrow}</Eyebrow></Reveal>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-5 text-3xl md:text-4xl">
              {PARCEIROS.title}
            </h2>
          </Reveal>
          {/* filtro a preto e branco por defeito (uniformiza cores muito
              diferentes entre logos) — revela a cor real ao passar o rato.
              Largura em percentagem (2 / 3 / 4 por linha, em vez de deixar
              o flex-wrap quebrar sozinho) para a última linha ficar sempre
              centrada como um grupo, nunca com um logo solto e desalinhado. */}
          <div className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-10">
            {PARCEIROS.logos.map((p, i) => (
              <Reveal
                key={p.nome}
                delay={i * 0.04}
                className="flex w-[calc(50%-20px)] justify-center sm:w-[calc(33.333%-26.67px)] lg:w-[calc(25%-30px)]"
              >
                <div className="relative h-11 w-28 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-12 sm:w-32">
                  <Image src={BASE + p.logo} alt={p.nome} fill className="object-contain" />
                </div>
              </Reveal>
            ))}
          </div>

          {/* Anfitriãs: fecham a secção, em destaque (maiores) — são as 3
              organizações que co-criam o evento, cujo texto nos logos
              (Georgina Angélica, Colo di Mamá) precisa de mais espaço para
              se ler bem. */}
          <div className="mt-16">
            <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-9">
              {PARCEIROS.hosts.map((p, i) => (
                <Reveal key={p.nome} delay={i * 0.06}>
                  <div className="relative h-16 w-40 opacity-90 grayscale transition hover:opacity-100 hover:grayscale-0 sm:h-20 sm:w-48">
                    <Image src={BASE + p.logo} alt={p.nome} fill className="object-contain" />
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-2xl">
          <Reveal><Eyebrow>{QUEM.eyebrow}</Eyebrow></Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-cormorant)" }} className="mt-6 text-4xl md:text-5xl">{QUEM.title}</h2></Reveal>
          <Reveal><p className="mt-6 text-[18px] text-[#4a5a57]">{QUEM.intro}</p></Reveal>
          <ul className="mt-8 grid gap-3.5 sm:grid-cols-2">
            {QUEM.items.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 0.05}>
                <span className="flex items-start gap-3 text-[18px] text-[#234d57]">
                  <span className="mt-2 inline-block h-2.5 w-2.5 flex-none rounded-full border-[1.5px]" style={{ borderColor: T.sage }} />
                  {it}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL / INSCRIÇÃO */}
      <section id="inscricao" className="relative grain px-6 py-32 text-center md:px-10 md:py-44" style={{ background: "radial-gradient(120% 90% at 50% 25%,#eef3f0,#cfe0d9)" }}>
        <div className="mx-auto max-w-2xl">
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-cormorant)" }} className="text-5xl leading-[1.04] text-[#1f302e] md:text-6xl">
              {FINAL.titleA}<br /><span style={{ color: T.teal }}>{FINAL.titleB}</span>
            </h2>
          </Reveal>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mx-auto mt-7 max-w-md text-xl italic text-[#3c5450] md:text-2xl">{FINAL.lead}</p>
          </Reveal>
          <Reveal>
            <div className="glass-dark mx-auto mt-14 max-w-lg rounded-[26px] p-10 text-white" style={{ background: "rgba(22,52,59,.92)" }}>
              <div className="text-[11.5px] uppercase tracking-[0.24em]" style={{ color: T.sage }}>Inscrição</div>
              <div style={{ fontFamily: "var(--font-cormorant)" }} className="mt-4 text-3xl italic">Pausa para Dentro</div>
              <div className="mt-2 text-sm text-white/65">{EVENT.date} · {EVENT.place}, {EVENT.city}</div>
              {/* placeholder — ligar ao checkout de pagamento */}
              <a href="#" data-checkout className="mt-8 inline-flex items-center gap-3 rounded-full px-10 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5" style={{ background: T.sage, color: T.deep }}>
                {EVENT.ctaFinal} → garantir o meu lugar
              </a>
              <div className="mt-5 text-xs text-white/45">{FINAL.micro}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 text-center md:px-10" style={{ background: T.deep }}>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10">
          <img src={BASE + "/logos/ga.png"} alt="Educar com Amor e Consciência" className="h-12 opacity-90" />
          <img src={BASE + "/logos/colodimama.png"} alt="Colo di Mama" className="h-12 opacity-90" />
          <img src={BASE + "/logos/mentalks-light.png"} alt="Men Talks" className="h-12 opacity-90" />
        </div>
        <p className="mt-8 text-xs text-white/40">Educar com Amor e Consciência · Colo di Mama · Men Talks</p>
      </footer>
    </main>
  );
}
