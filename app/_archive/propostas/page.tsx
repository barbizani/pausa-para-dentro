import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pausa para Dentro · 3 propostas de landing page",
};

const props = [
  {
    href: "/cuidado",
    tag: "01 · Calm Glass",
    name: "Cuidado",
    desc: "Sereno e luminoso. Luz natural, verdes profundos, vidro suave.",
    bg: "linear-gradient(135deg,#21484f,#3c6b66 55%,#9fb6a6)",
  },
  {
    href: "/abraco",
    tag: "6B · Bold Editorial",
    name: "Abraço",
    desc: "Forte e humano. Tipografia enorme, cor quente, contraste vivo.",
    bg: "linear-gradient(135deg,#11343b,#1e7e8c 55%,#e7a33c)",
  },
  {
    href: "/sorriso",
    tag: "6C · Quiet Lux",
    name: "Sorriso",
    desc: "Premium e minimal. Off-black, acento dourado, silêncio.",
    bg: "linear-gradient(135deg,#14140f,#2a2a23 60%,#b89b5e)",
  },
];

export default function Home() {
  return (
    <main
      style={{ background: "#0e0e0d", color: "#f4f1ea" }}
      className="min-h-screen px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-6xl">
        <p
          style={{ fontFamily: "var(--font-grotesk)" }}
          className="text-xs tracking-[0.34em] uppercase opacity-50"
        >
          Pausa para Dentro · Landing pages
        </p>
        <h1
          style={{ fontFamily: "var(--font-cormorant)" }}
          className="mt-4 text-4xl md:text-6xl italic"
        >
          Três caminhos para o mesmo encontro.
        </h1>
        <p className="mt-4 max-w-xl text-sm opacity-60">
          Uma landing page por proposta de marca. Cada uma com um look &amp; feel
          próprio — escolhe por onde entrar.
        </p>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {props.map((p) => (
            <Link
              key={p.href}
              href={p.href}
              className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1"
              style={{ background: p.bg }}
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "rgba(0,0,0,.18)" }} />
              <div className="relative">
                <span
                  style={{ fontFamily: "var(--font-grotesk)" }}
                  className="text-[10px] tracking-[0.22em] uppercase opacity-80"
                >
                  {p.tag}
                </span>
                <h2
                  style={{ fontFamily: "var(--font-cormorant)" }}
                  className="mt-2 text-3xl"
                >
                  {p.name}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed opacity-80">
                  {p.desc}
                </p>
                <span className="mt-4 inline-block text-sm opacity-90">
                  Ver página →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
