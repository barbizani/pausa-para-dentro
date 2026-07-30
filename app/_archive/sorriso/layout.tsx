import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Pausa para Dentro · Um dia para voltar a ti | Lisboa, 24 Out 2026",
  description:
    "Encontro presencial para quem educa, cuida e acompanha a vida de outros. Círculos de partilha, presença e regulação emocional. Fundação Maria Droste, Lisboa.",
  openGraph: {
    title: "Pausa para Dentro · Um dia para voltar a ti",
    description: "Porque cuidar dos outros começa por conseguir parar. 24 de outubro de 2026, Lisboa.",
    locale: "pt_PT",
    type: "website",
  },
};
export default function Layout({ children }: { children: React.ReactNode }) { return children; }
