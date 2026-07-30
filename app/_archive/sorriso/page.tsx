"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Reveal } from "@/components/Reveal";
import {
  EVENT, CONTEXT, NASCIMENTO, UNIAO, OQUEE, DIFER, PROGRAMA, QUEM, FINAL,
} from "@/lib/content";

const HERO = "https://images.unsplash.com/photo-1528319725582-ddc096101511?w=2000&q=80&auto=format&fit=crop";
const AMBIENTE = "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1800&q=80&auto=format&fit=crop";

const S = {
  ink: "#141410",
  panel: "#1b1a14",
  ivory: "#efe9dd",
  sage: "#9aa691",
  gold: "#c2a667",
};

function Smile({ size = 80, stroke = S.ivory, w = 2.8 }: { size?: number; stroke?: string; w?: number }) {
  return (
    <svg viewBox="0 0 100 110" width={size} height={(size * 110) / 100} style={{ flex: "none" }} aria-hidden>
      <path d="M14 42 A58 58 0 0 0 14 104" fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" />
      <path d="M86 42 A58 58 0 0 1 86 104" fill="none" stroke={stroke} strokeWidth={w} strokeLinecap="round" />
      <rect x="30" y="6" width="13" height="58" rx="6.5" fill={stroke} />
      <rect x="57" y="6" width="13" height="58" rx="6.5" fill={stroke} />
    </svg>
  );
}

function Lockup({ symSize = 54, big = false, light = true }: { symSize?: number; big?: boolean; light?: boolean }) {
  const ink = light ? S.ivory : S.ink;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: ".5em" }}>
      <Smile size={symSize} stroke={ink} />
      <span style={{ display: "flex", flexDirection: "column", lineHeight: 1, textAlign: "left" }}>
        <b style={{ fontFamily: "var(--font-bricolage)", fontWeight: 700, letterSpacing: "-0.04em", color: ink, fontSize: big ? "clamp(40px,7vw,72px)" : "1.4em" }}>pausa</b>
        <span style={{ fontFamily: "var(--font-grotesk)", fontWeight: 300, color: light ? "rgba(239,233,221,.55)" : "rgba(20,20,16,.55)", fontSize: big ? "clamp(18px,3vw,30px)" : "0.62em", letterSpacing: ".01em" }}>para dentro</span>
      </span>
    </span>
  );
}

export default function Sorriso() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 140]);

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 50);
    addEventListener("scroll", on);
    return () => removeEventListener("scroll", on);
  }, []);

  const label = (t: string, color = S.gold): ReactNode => (
    <span style={{ fontFamily: "var(--font-grotesk)", color }} className="text-[11px] font-light uppercase tracking-[0.34em]">{t}</span>
  );
  const rule = <div className="h-px w-full" style={{ background: "rgba(239,233,221,.12)" }} />;

  return (
    <main style={{ background: S.ink, color: S.ivory, fontFamily: "var(--font-inter)" }}>
      {/* NAV */}
      <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-all duration-500 md:px-12"
        style={scrolled ? { background: "rgba(20,20,16,.8)", backdropFilter: "blur(14px)", borderBottom: "1px solid rgba(239,233,221,.07)" } : {}}>
        <div className="flex items-center gap-6">
          <Link href="/" style={{ fontFamily: "var(--font-grotesk)", color: "rgba(239,233,221,.6)" }} className="text-xs font-light uppercase tracking-[0.16em] transition-colors hover:text-white">← propostas</Link>
          <span style={{ opacity: scrolled ? 1 : 0, transition: "opacity .4s" }}><Lockup symSize={26} /></span>
        </div>
        <a href="#inscricao" className="rounded-sm border px-6 py-2.5 text-xs font-light uppercase tracking-[0.16em] transition-colors hover:bg-white/5"
          style={{ borderColor: "rgba(239,233,221,.3)", color: S.ivory }}>{EVENT.cta}</a>
      </header>

      {/* HERO — minimal premium */}
      <section ref={heroRef} className="relative grain flex min-h-screen flex-col justify-center overflow-hidden px-6 md:px-12">
        <motion.div style={{ y }} className="absolute inset-0">
          <Image src={HERO} alt="Mãos em meditação" fill priority className="object-cover" style={{ objectPosition: "center" }} />
        </motion.div>
        <div className="absolute inset-0" style={{ background: "linear-gradient(110deg,rgba(20,20,16,.92) 0%,rgba(20,20,16,.74) 45%,rgba(20,20,16,.5) 100%)" }} />
        <div className="relative mx-auto w-full max-w-5xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}>
            <div className="mb-10">{label(EVENT.edition)}</div>
            <div className="mb-8"><Lockup big /></div>
            <p className="text-sm text-white/45">{EVENT.coCreation}</p>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mt-10 max-w-xl text-2xl font-light italic leading-snug text-white/90 md:text-3xl">{EVENT.sub}</p>
            <p className="mt-5 text-sm tracking-wide" style={{ color: S.sage }}>{EVENT.impact}</p>
            <a href="#inscricao" className="group mt-12 inline-flex items-center gap-4 text-sm uppercase tracking-[0.18em]" style={{ color: S.gold }}>
              <span className="inline-block h-px w-12 transition-all duration-300 group-hover:w-20" style={{ background: S.gold }} />
              {EVENT.cta}
            </a>
          </motion.div>
        </div>
      </section>

      {/* CONTEXTO — minimal, generous space */}
      <section className="px-6 py-32 md:px-12 md:py-48">
        <div className="mx-auto max-w-3xl">
          <Reveal>{label(CONTEXT.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-5xl leading-tight md:text-6xl">{CONTEXT.title}</h2></Reveal>
          <Reveal><p className="mt-10 text-lg font-light leading-loose text-white/60">{CONTEXT.intro}</p></Reveal>
          <Reveal>
            <div style={{ fontFamily: "var(--font-cormorant)" }} className="my-12 space-y-3 text-2xl font-light italic text-white/90 md:text-3xl">
              {CONTEXT.lines.map((l) => <p key={l}>{l}</p>)}
            </div>
          </Reveal>
          <Reveal><p className="text-lg font-light leading-loose text-white/60">{CONTEXT.outro}</p></Reveal>
        </div>
      </section>

      {/* NASCIMENTO */}
      <section className="px-6 md:px-12"><div className="mx-auto max-w-5xl">{rule}</div></section>
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>{label(NASCIMENTO.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-4xl leading-tight md:text-5xl">{NASCIMENTO.title}</h2></Reveal>
          <Reveal><p className="mt-9 text-lg font-light leading-loose text-white/60">{NASCIMENTO.p1}</p></Reveal>
          <Reveal><p className="mt-6 text-lg font-light leading-loose text-white/60">{NASCIMENTO.p2}</p></Reveal>
        </div>
      </section>

      {/* UNIÃO */}
      <section className="px-6 py-32 md:px-12 md:py-44" style={{ background: S.panel }}>
        <div className="mx-auto max-w-5xl">
          <Reveal>{label(UNIAO.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-4xl md:text-5xl">{UNIAO.title}</h2></Reveal>
          <div className="mt-16 grid gap-px md:grid-cols-3" style={{ background: "rgba(239,233,221,.1)" }}>
            {UNIAO.cards.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.1}>
                <div className="h-full p-9" style={{ background: S.panel }}>
                  <div className="flex h-14 items-center">
                    <img src={c.logo} alt={c.name} className="max-h-14 w-auto max-w-[110px] object-contain opacity-90" style={c.logo.endsWith(".svg") ? { filter: "brightness(0) invert(1)" } : undefined} />
                  </div>
                  <h3 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500 }} className="mt-6 text-lg">{c.name}</h3>
                  <p className="mt-3 text-sm font-light leading-relaxed text-white/55">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p style={{ fontFamily: "var(--font-cormorant)" }} className="mx-auto mt-16 max-w-2xl text-center text-2xl font-light italic md:text-3xl" >{UNIAO.close}</p>
          </Reveal>
        </div>
      </section>

      {/* O QUE É */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>{label(OQUEE.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-4xl md:text-5xl">{OQUEE.title}</h2></Reveal>
          <Reveal><p className="mt-9 text-lg font-light leading-loose text-white/60">{OQUEE.intro}</p></Reveal>
          <Reveal>
            <div style={{ fontFamily: "var(--font-cormorant)" }} className="my-9 text-3xl font-light italic">
              {OQUEE.not.map((n) => <p key={n} style={{ color: S.sage }}>{n}</p>)}
            </div>
          </Reveal>
          <Reveal><p className="text-lg font-light leading-loose text-white/60">{OQUEE.is}</p></Reveal>
          <Reveal>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {OQUEE.temas.map((t) => (
                <span key={t} style={{ fontFamily: "var(--font-grotesk)", borderColor: "rgba(239,233,221,.16)" }} className="rounded-sm border px-5 py-2.5 text-sm font-light text-white/75">{t}</span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* DIFERENCIAÇÃO — banda com imagem (silêncio) */}
      <section className="relative grain overflow-hidden px-6 py-36 text-center md:px-12 md:py-52">
        <Image src={AMBIENTE} alt="Silêncio ao amanhecer" fill className="object-cover" style={{ objectPosition: "center 35%" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,rgba(20,20,16,.78),rgba(20,20,16,.9))" }} />
        <div className="relative mx-auto max-w-3xl">
          <Reveal><div className="mb-10 flex justify-center"><Smile size={48} stroke={S.gold} w={3} /></div></Reveal>
          <Reveal>
            <p style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="text-5xl leading-[1.05] md:text-6xl">
              {DIFER.quoteA}<br /><span style={{ color: S.gold }}>{DIFER.quoteB}</span>
            </p>
          </Reveal>
          <Reveal><p className="mx-auto mt-10 max-w-xl text-lg font-light leading-loose text-white/60">{DIFER.intro}</p></Reveal>
          <Reveal>
            <div className="mt-9 flex flex-wrap justify-center gap-2.5">
              {DIFER.modos.map((m) => <span key={m} style={{ borderColor: "rgba(239,233,221,.16)" }} className="rounded-sm border px-5 py-2.5 text-sm font-light text-white/75">{m}</span>)}
            </div>
          </Reveal>
        </div>
      </section>

      {/* PROGRAMA */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>{label(PROGRAMA.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-4xl md:text-5xl">{PROGRAMA.title}</h2></Reveal>
          <div className="mt-14">
            {PROGRAMA.blocos.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.06}>
                <div className="grid grid-cols-[120px_1fr] gap-8 border-t py-8" style={{ borderColor: "rgba(239,233,221,.1)" }}>
                  <div style={{ fontFamily: "var(--font-grotesk)", color: S.gold }} className="text-sm uppercase tracking-wider">{b.time}</div>
                  <div>
                    <h3 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500 }} className="text-xl">{b.title}</h3>
                    <p className="mt-1.5 text-sm font-light text-white/50">{b.desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal><p style={{ fontFamily: "var(--font-cormorant)" }} className="mt-12 text-center text-xl font-light italic" >{PROGRAMA.close}</p></Reveal>
          <Reveal><p className="mt-4 text-center text-xs text-white/35">{PROGRAMA.note}</p></Reveal>
        </div>
      </section>

      {/* LOCAL E DATA */}
      <section className="px-6 md:px-12"><div className="mx-auto max-w-5xl">{rule}</div></section>
      <section className="px-6 py-24 md:px-12">
        <div className="mx-auto grid max-w-5xl gap-px md:grid-cols-3" style={{ background: "rgba(239,233,221,.1)" }}>
          {[{ k: "Local", v: `${EVENT.place}, ${EVENT.city}` }, { k: "Data", v: EVENT.date }, { k: "Horário", v: EVENT.time }].map((m, i) => (
            <Reveal key={m.k} delay={i * 0.08}>
              <div className="p-10 text-center" style={{ background: S.ink }}>
                <div className="text-[11px] uppercase tracking-[0.2em]" style={{ color: S.gold }}>{m.k}</div>
                <div style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500 }} className="mt-4 text-xl">{m.v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PARA QUEM */}
      <section className="px-6 py-32 md:px-12 md:py-44">
        <div className="mx-auto max-w-3xl">
          <Reveal>{label(QUEM.eyebrow)}</Reveal>
          <Reveal><h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="mt-8 text-4xl md:text-5xl">{QUEM.title}</h2></Reveal>
          <Reveal><p className="mt-7 text-lg font-light text-white/60">{QUEM.intro}</p></Reveal>
          <ul className="mt-10 divide-y" style={{ borderColor: "rgba(239,233,221,.1)" }}>
            {QUEM.items.map((it, i) => (
              <Reveal as="li" key={it} delay={i * 0.04}>
                <span className="flex items-center gap-4 border-t py-4 text-lg font-light text-white/85" style={{ borderColor: "rgba(239,233,221,.1)" }}>
                  <span className="text-xs" style={{ color: S.gold }}>0{i + 1}</span>{it}
                </span>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* FINAL */}
      <section id="inscricao" className="relative grain px-6 py-36 text-center md:px-12 md:py-52" style={{ background: S.panel }}>
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <h2 style={{ fontFamily: "var(--font-bricolage)", fontWeight: 500, letterSpacing: "-0.03em" }} className="text-5xl leading-[1.06] md:text-6xl">
              {FINAL.titleA}<br /><span style={{ color: S.gold }}>{FINAL.titleB}</span>
            </h2>
          </Reveal>
          <Reveal><p style={{ fontFamily: "var(--font-cormorant)" }} className="mx-auto mt-9 max-w-xl text-xl font-light italic leading-snug text-white/65 md:text-2xl">{FINAL.lead}</p></Reveal>
          <Reveal>
            <div className="mx-auto mt-16 max-w-md rounded-lg border p-10" style={{ borderColor: "rgba(239,233,221,.14)", background: "rgba(20,20,16,.5)", backdropFilter: "blur(12px)" }}>
              <div className="text-[11px] uppercase tracking-[0.24em]" style={{ color: S.gold }}>Inscrição</div>
              <div className="mt-6 flex justify-center"><Lockup symSize={34} /></div>
              <div className="mt-4 text-sm text-white/50">{EVENT.date} · {EVENT.place}</div>
              <a href="#" data-checkout className="mt-8 inline-flex items-center gap-3 rounded-sm px-9 py-4 text-sm font-medium transition-transform hover:-translate-y-0.5" style={{ background: S.gold, color: S.ink }}>
                {EVENT.ctaFinal} → garantir o meu lugar
              </a>
              <div className="mt-5 text-xs text-white/35">{FINAL.micro}</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-6 py-16 text-center md:px-12">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-10">
          <img src="/logos/ga.png" alt="Educar com Amor e Consciência" className="h-11 opacity-80" />
          <img src="/logos/colodimama.png" alt="Colo di Mama" className="h-11 opacity-80" />
          <img src="/logos/mentalks.svg" alt="Men Talks" className="h-11 opacity-80" style={{ filter: "brightness(0) invert(1)" }} />
        </div>
        <p className="mt-8 text-xs text-white/35">Educar com Amor e Consciência · Colo di Mama · Men Talks</p>
      </footer>
    </main>
  );
}
