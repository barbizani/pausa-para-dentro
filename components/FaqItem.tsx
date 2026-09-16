"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const T = {
  teal: "#234d57",
  text: "#4a5a57",
};

export function FaqItem({ pergunta, resposta }: { pergunta: string; resposta: string }) {
  const [open, setOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="border-b" style={{ borderColor: "rgba(35,77,87,.15)" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
      >
        <span style={{ fontFamily: "var(--font-cormorant)", color: T.teal }} className="text-xl md:text-2xl">
          {pergunta}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-none text-2xl"
          style={{ color: T.teal }}
          aria-hidden
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-[16px] leading-relaxed" style={{ color: T.text }}>
              {resposta}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
