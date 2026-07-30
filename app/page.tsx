import type { Metadata } from "next";
import Landing from "./cuidado-v2/page";

export const metadata: Metadata = {
  title: "Pausa para Dentro · Um encontro para quem cuida | 24 Out 2026, Lisboa",
  description:
    "Um dia presencial para quem educa, cuida e acompanha a vida de outros. Círculos de partilha, presença e regulação emocional. Fundação Maria Droste, Lisboa.",
  openGraph: {
    title: "Pausa para Dentro",
    description:
      "Porque cuidar dos outros começa por conseguir parar. 24 de outubro de 2026, Lisboa.",
    locale: "pt_PT",
    type: "website",
  },
};

export default function Home() {
  return <Landing />;
}
