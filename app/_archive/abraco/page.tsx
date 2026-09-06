"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import {
  EVENT, CONTEXT, NASCIMENTO, UNIAO, OQUEE, DIFER, LEGACY_PROGRAMA as PROGRAMA, QUEM, FINAL,
} from "@/lib/content";

const HERO = "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=2000&q=80&auto=format&fit=crop";
const AMBIENTE = "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1600&q=80&auto=format&fit=crop";

const C = {
  ink: "#14120e",
  paper: "#F5F1E8",
  teal: "#1E8C97",
  amber: "#E7A33C",
};

const CORAL = "#E96F4C";

// barra de pausa = altura/largura de um "u" (x-height, assente na baseline)
function Pausa({ size = 1, light = false }: { size?: number; light?: boolean }) {
  const bar = light ? "#5fb4bd" : C.teal;
  return (
    <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 700, letterSpacing: "-0.05em", lineHeight: 1, fontSize: `${size}em`, display: "inline-flex", alignItems: "baseline" }}>
      pa
      <svg viewBox="0 0 46 62" width="0.55em" height="0.5em" preserveAspectRatio="xMidYMid meet" style={{ margin: "0 0.05em" }}>
        <rect x="1" width="18" height="62" rx="9" fill={bar} />
        <rect x="27" width="18" height="62" rx="9" fill={bar} />
      </svg>
      sa
    </span>
  );
}

// "( para dentro )" — os parênteses são o abraço
function ParaDentro({ size = 1, ink = "#fff", arc = CORAL }: { size?: number; ink?: string; arc?: string }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "0.42em", fontSize: `${size}em` }}>
      <svg viewBox="0 0 36 100" width="0.5em" height="1.35em" style={{ flex: "none" }}><path d="M30 8 A52 52 0 0 0 30 92" fill="none" stroke={arc} strokeWidth="3.6" strokeLinecap="round" /></svg>
      <span style={{ fontFamily: "var(--font-cormorant)", fontStyle: "italic", fontWeight: 500, color: ink, whiteSpace: "nowrap" }}>para dentro</span>
      <svg viewBox="0 0 36 100" width="0.5em" height="1.35em" style={{ flex: "none" }}><path d="M6 8 A52 52 0 0 1 6 92" fill="none" stroke={arc} strokeWidth="3.6" strokeLinecap="round" /></svg>
    </span>
  );
}

function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="no-bar overflow-hidden border-y py-5" style={{ borderColor: "rgba(245,241,232,.14)" }}>
      <motion.div className="flex w-max gap-10 whitespace-nowrap" animate={{ x: ["0%", "-50%"] }} transition={{ duration: 28, repeat: Infinity, ease: "linear" }}>
        {row.map((t, i) => (
          <span key={i} style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700 }} className="text-3xl uppercase tracking-tight" >
            <span style={{ color: C.amber }}>—</span> {t}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export default function Abraco() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 50);
    addEventListener("scroll", on);
    return () => removeEventListener("scroll", on);
  }, []);

  const eyebrow = (t: string, color = C.amber): ReactNode => (
    <span style={{ fontFamily: "var(--font-grotesk)", color }} className="text-[11px] font-medium uppercase tracking-[0.28em]">{t}</span>
  );

  return (
    <main style={{ background: C.ink, color: C.paper, fontFamily: "var(--font-inter)" }}>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 transition-all duration-500 md:px-10"
        style={scrolled ? { background: "rgba(20,18,14,.82)", backdropFilter: "blur(16px)", borderBottom: "1px solid rgba(245,241,232,.08)" } : {}}>
        <div className="flex items-center gap-5">
          <Link href="/" style={{ fontFamily: "var(--font-grotesk)" }} className="text-xs uppercase tracking-[0.12em] text-white/55 transition-colors hover:text-white">← propostas</Link>
          <span style={{ opacity: scrolled ? 1 : 0, transition: "opacity .4s" }}><Pausa size={1.2} /></span>
        </div>
        <a href="#inscricao" className="rounded-md px-6 py-2.5 text-xs font-medium uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5" style={{ background: C.teal }}>{EVENT.cta}</a>
      </header>

      {/* HERO */}
      <section ref={heroRef} className="relative grain flex min-h-screen flex-col justify-center overflow-hidden px-6 pt-28 pb-16 md:px-10">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image src={HERO} alt="Abraço ao pôr-do-sol" fill priority className="object-cover" />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,18,14,.55),rgba(20,18,14,.35) 40%,rgba(20,18,14,.94))" }} />
        <div className="relative mx-auto w-full max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-7 text-white">
              <Pausa size={1.9} />
              <div className="mt-1.5"><ParaDentro size={1} /></div>
            </div>
            {eyebrow(EVENT.edition)}
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92 }}
            className="mt-5 text-[clamp(56px,13vw,180px)] text-white">
            Cuidar<br /><span style={{ color: C.amber }}>começa</span> por parar.
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.5 }} className="mt-8 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="max-w-md text-xl italic leading-snug text-white/85 md:text-2xl">{EVENT.sub}</p>
            <a href="#inscricao" className="inline-flex w-max items-center gap-3 rounded-md px-9 py-4 text-sm font-medium text-white transition-transform hover:-translate-y-0.5" style={{ background: C.amber, color: C.ink }}>
              {EVENT.cta} <span aria-hidden>→</span>
            </a>
          </motion.div>
        </div>
      </section>

      {/* MARQUEE */}
      <Marquee items={OQUEE.temas} />

      {/* CONTEXTO — editorial big */}
      <section className="px-6 py-28 md:px-10 md:py-40">
        <div className="mx-auto max-w-6xl">
          <Reveal>{eyebrow(CONTEXT.eyebrow)}</Reveal>
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.95 }} className="mt-6 text-[clamp(44px,8vw,110px)]">
              Vivemos em<br />excesso de tudo.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-2">
            <Reveal><p className="text-lg leading-relaxed text-white/70">{CONTEXT.intro}</p></Reveal>
            <Reveal>
              <div style={{ fontFamily: "var(--font-cormorant)" }} className="space-y-2 text-2xl italic md:text-3xl">
                {CONTEXT.lines.map((l) => <p key={l}>{l}</p>)}
              </div>
            </Reveal>
          </div>
          <Reveal><p className="mt-10 max-w-3xl text-lg leading-relaxed text-white/70">{CONTEXT.outro}</p></Reveal>
        </div>
      </section>

      {/* NASCIMENTO — split with rule */}
      <section className="border-t px-6 py-28 md:px-10 md:py-36" style={{ borderColor: "rgba(245,241,232,.1)" }}>
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.5fr_1fr]">
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.03em" }} className="text-4xl leading-tight md:text-5xl">{NASCIMENTO.title}</h2></Reveal>
          <div>
            <Reveal>{eyebrow(NASCIMENTO.eyebrow, C.teal)}</Reveal>
            <Reveal><p className="mt-5 text-lg leading-relaxed text-white/75">{NASCIMENTO.p1}</p></Reveal>
            <Reveal><p className="mt-5 text-lg leading-relaxed text-white/75">{NASCIMENTO.p2}</p></Reveal>
          </div>
        </div>
      </section>

      {/* UNIÃO — glass-dark cards */}
      <section className="px-6 py-28 md:px-10 md:py-36" style={{ background: "#0e0c09" }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>{eyebrow(UNIAO.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em" }} className="mt-6 text-[clamp(38px,6vw,82px)] leading-[0.95]">{UNIAO.title}</h2></Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {UNIAO.cards.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="glass-dark h-full rounded-2xl p-8">
                  <div className="flex h-16 items-center">
                    <img src={c.logo} alt={c.name} className="max-h-16 w-auto max-w-[120px] object-contain" style={c.logo.endsWith(".svg") ? { filter: "brightness(0) invert(1)" } : undefined} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 600 }} className="mt-5 text-xl">{c.name}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mt-16 max-w-3xl text-3xl italic leading-snug md:text-4xl">
              {UNIAO.close}
            </p>
          </Reveal>
        </div>
      </section>

      {/* O QUE É */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-5xl">
          <Reveal>{eyebrow(OQUEE.eyebrow, C.teal)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em" }} className="mt-6 text-[clamp(40px,7vw,96px)] leading-[0.95]"><Pausa size={1} /> <span className="text-white/50">o que é?</span></h2></Reveal>
          <Reveal><p className="mt-8 text-lg leading-relaxed text-white/75">{OQUEE.intro}</p></Reveal>
          <Reveal>
            <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.03em" }} className="my-8 text-4xl md:text-5xl">
              {OQUEE.not.map((n) => <p key={n} style={{ color: C.amber }}>{n}</p>)}
            </div>
          </Reveal>
          <Reveal><p className="text-lg leading-relaxed text-white/75">{OQUEE.is}</p></Reveal>
          <Reveal>
            <div className="mt-8 flex flex-wrap gap-3">
              {OQUEE.temas.map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-grotesk)", borderColor: "rgba(245,241,232,.18)" }} className="rounded-md border px-5 py-2.5 text-sm text-white/80">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAÇÃO — image band */}
      <section className="relative grain overflow-hidden">
        <Image src={AMBIENTE} alt="Mãos em coração" fill className="object-cover" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,18,14,.7),rgba(20,18,14,.86))" }} />
        <div className="relative mx-auto max-w-5xl px-6 py-32 md:px-10 md:py-48">
          <Reveal>{eyebrow(DIFER.eyebrow)}</Reveal>
          <Reveal>
            <div className="mt-6 flex items-center justify-center gap-3 md:gap-7">
              <svg viewBox="0 0 36 100" className="h-[clamp(130px,26vw,320px)] w-auto flex-none" aria-hidden><path d="M30 8 A52 52 0 0 0 30 92" fill="none" stroke={CORAL} strokeWidth="2.6" strokeLinecap="round" /></svg>
              <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92 }} className="text-center text-[clamp(46px,9vw,128px)]">
                {DIFER.quoteA}<br /><span style={{ color: C.amber }}>{DIFER.quoteB}</span>
              </p>
              <svg viewBox="0 0 36 100" className="h-[clamp(130px,26vw,320px)] w-auto flex-none" aria-hidden><path d="M6 8 A52 52 0 0 1 6 92" fill="none" stroke={CORAL} strokeWidth="2.6" strokeLinecap="round" /></svg>
            </div>
          </Reveal>
          <Reveal><p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/80">{DIFER.intro}</p></Reveal>
          <Reveal>
            <div className="mt-7 flex flex-wrap gap-3">
              {DIFER.modos.map((m) => <span key={m} className="glass rounded-md px-5 py-2.5 text-sm text-white">{m}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMA — big numbers */}
      <section className="px-6 py-28 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>{eyebrow(PROGRAMA.eyebrow, C.teal)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em" }} className="mt-6 text-[clamp(36px,6vw,76px)] leading-[0.95]">{PROGRAMA.title}</h2></Reveal>
          <div className="mt-14">
            {PROGRAMA.blocos.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="grid grid-cols-[auto_1fr] items-baseline gap-6 border-t py-8 md:grid-cols-[120px_180px_1fr]" style={{ borderColor: "rgba(245,241,232,.12)" }}>
                  <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, color: C.amber }} className="text-2xl md:text-3xl">0{i + 1}</div>
                  <div style={{ fontFamily: "var(--font-grotesk)" }} className="text-sm uppercase tracking-wider text-white/60">{b.time}</div>
                  <div className="col-span-2 md:col-span-1">
                    <h3 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 600 }} className="text-2xl">{b.title}</h3>
                    <p className="mt-1 text-[15px] text-white/60">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ fontFamily: "var(--font-cormorant)" }} className="mt-10 text-2xl italic text-white/85">{PROGRAMA.close}</p></Reveal>
          <Reveal><p className="mt-4 text-xs text-white/40">{PROGRAMA.note}</p></Reveal>
        </div>
      </section>

      {/* LOCAL + PARA QUEM */}
      <section className="px-6 py-24 md:px-10" style={{ background: "#0e0c09" }}>
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-2">
          <div>
            <Reveal>{eyebrow("Onde e quando")}</Reveal>
            <div className="mt-8 space-y-5">
              {[{ k: "📍 Local", v: `${EVENT.place}, ${EVENT.city}` }, { k: "📅 Data", v: EVENT.date }, { k: "🕙 Horário", v: EVENT.time }].map((m) => (
                <Reveal key={m.k}>
                  <div className="flex items-baseline justify-between border-b pb-4" style={{ borderColor: "rgba(245,241,232,.12)" }}>
                    <span className="text-sm uppercase tracking-wider text-white/55">{m.k}</span>
                    <span style={{ fontFamily: "var(--font-bricolage)", fontWeight: 600 }} className="text-xl">{m.v}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div>
            <Reveal>{eyebrow(QUEM.eyebrow, C.teal)}</Reveal>
            <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.03em" }} className="mt-5 text-3xl md:text-4xl">{QUEM.title}</h2></Reveal>
            <ul className="mt-7 space-y-3">
              {QUEM.items.map((it, i) => (
                <Reveal as="li" key={it} delay={i * 0.04}>
                  <span className="flex items-center gap-3 text-lg text-white/80"><span className="h-1.5 w-6 rounded" style={{ background: C.amber }} />{it}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FINAL */}
      <section id="inscricao" className="relative grain px-6 py-32 md:px-10 md:py-48">
        <div className="mx-auto max-w-5xl">
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 0.92 }} className="text-[clamp(48px,10vw,140px)]">
              {FINAL.titleA}<br /><span style={{ color: C.amber }}>{FINAL.titleB}</span>
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
            <Reveal><p style={{ fontFamily: "var(--font-cormorant)" }} className="max-w-lg text-2xl italic leading-snug text-white/80">{FINAL.lead}</p></Reveal>
            <Reveal>
              <div className="glass-dark rounded-2xl p-8">
                <div style={{ fontFamily: "var(--font-grotesk)", color: C.amber }} className="text-[11px] uppercase tracking-[0.22em]">Inscrição</div>
                <div className="mt-3"><Pausa size={1.7} /></div>
                <div className="mt-1.5"><ParaDentro size={0.82} /></div>
                <div className="mt-2 text-sm text-white/55">{EVENT.dateShort} · {EVENT.city}</div>
                <a href="#" data-checkout className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-md px-8 py-4 text-sm font-medium transition-transform hover:-translate-y-0.5" style={{ background: C.amber, color: C.ink }}>
                  {EVENT.ctaFinal} →
                </a>
                <div className="mt-4 text-center text-xs text-white/40">{FINAL.micro}</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t px-6 py-14 text-center md:px-10" style={{ borderColor: "rgba(245,241,232,.1)" }}>
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10">
          <img src="/logos/ga.png" alt="Educar com Amor e Consciência" className="h-12 opacity-90" />
          <img src="/logos/colodimama.png" alt="Colo di Mama" className="h-12 opacity-90" />
          <img src="/logos/mentalks.svg" alt="Men Talks" className="h-12 opacity-90" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
        <p className="mt-8 text-xs text-white/40">Educar com Amor e Consciência · Colo di Mama · Men Talks</p>
      </footer>
    </main>
  );
}
