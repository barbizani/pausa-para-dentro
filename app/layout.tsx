import type { Metadata } from "next";
import {
  Inter,
  Cormorant_Garamond,
  Space_Grotesk,
  Bricolage_Grotesque,
  Roboto,
} from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});
const spaceGrotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Pausa para Dentro · Um encontro para quem cuida",
  description:
    "3.ª edição do Educar com Amor e Consciência, em co-criação com Colo di Mama e Men Talks. 24 de outubro de 2026, Lisboa.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="pt"
      className={`${inter.variable} ${cormorant.variable} ${spaceGrotesk.variable} ${bricolage.variable} ${roboto.variable} antialiased`}
    >
      <body>{children}</body>
    </html>
  );
}
