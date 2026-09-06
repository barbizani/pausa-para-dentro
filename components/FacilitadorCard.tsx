"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Facilitador } from "@/lib/content";

const T = {
  teal: "#234d57",
  sage: "#5d8a82",
  text: "#4a5a57",
};

export function FacilitadorCard({ pessoa, base = "" }: { pessoa: Facilitador; base?: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div
      className="flex h-full flex-col overflow-hidden rounded-[26px] transition-shadow"
      style={{
        background: "rgba(255,255,255,.55)",
        border: "1px solid rgba(35,77,87,.12)",
        boxShadow: open ? "0 18px 40px -22px rgba(22,52,59,.35)" : "none",
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full flex-1 cursor-pointer flex-col text-left"
      >
        <div
          className="relative aspect-[4/5] w-full shrink-0"
          style={{ background: "linear-gradient(180deg,#eef2ee,#e2ebe5)" }}
        >
          <Image
            src={base + pessoa.foto}
            alt={pessoa.nome}
            fill
            className="object-contain object-bottom"
            sizes="(max-width: 768px) 45vw, 260px"
          />
        </div>
        {/* min-h no papel + line-clamp na bio curta: todos os cards fechados
            ficam com a mesma altura, independentemente do texto de cada um */}
        <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
          <span
            style={{ fontFamily: "var(--font-roboto)", color: T.sage }}
            className="min-h-[2.4em] text-[10.5px] font-medium leading-snug tracking-[0.2em] uppercase"
          >
            {pessoa.papel}
          </span>
          <h3 style={{ fontFamily: "var(--font-cormorant)", color: T.teal }} className="mt-1 text-[22px]">
            {pessoa.nome}
          </h3>
          <p className="mt-2 line-clamp-3 text-[15px] leading-relaxed" style={{ color: T.text }}>
            {pessoa.bioCurta}
          </p>
          <span
            style={{ fontFamily: "var(--font-cormorant)", color: T.teal }}
            className="mt-auto inline-flex items-center gap-1.5 pt-3 text-[15px] italic"
          >
            {open ? "Fechar" : "Ler mais"}
            <motion.span animate={{ rotate: open ? 45 : 0 }} transition={{ duration: 0.3 }}>
              +
            </motion.span>
          </span>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div
              className="space-y-3 border-t px-5 pb-6 pt-4"
              style={{ borderColor: "rgba(35,77,87,.12)" }}
            >
              {pessoa.bioLonga.map((paragrafo) => (
                <p key={paragrafo} className="text-[15px] leading-relaxed" style={{ color: T.text }}>
                  {paragrafo}
                </p>
              ))}
              <div
                className="mt-4 flex items-center gap-3 border-t pt-4"
                style={{ borderColor: "rgba(35,77,87,.1)" }}
              >
                <div className="relative h-8 w-24 shrink-0">
                  <Image
                    src={base + pessoa.organizacao.logo}
                    alt={pessoa.organizacao.nome}
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <span className="text-[13px]" style={{ color: T.sage }}>
                  {pessoa.organizacao.nome}
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
