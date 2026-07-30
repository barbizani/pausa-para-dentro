import type { NextConfig } from "next";

const base = process.env.BASE_PATH || "";

const nextConfig: NextConfig = {
  // Exportação estática (HTML/CSS/JS) — hospedável em qualquer servidor.
  // Ativar apenas para gerar o pacote de entrega: EXPORT_STATIC=1 npm run build
  ...(process.env.EXPORT_STATIC === "1"
    ? { output: "export" as const, trailingSlash: true }
    : {}),
  // Subpasta (ex.: BASE_PATH=/eventos/pausa-para-dentro)
  ...(base ? { basePath: base } : {}),
  images: {
    unoptimized: process.env.EXPORT_STATIC === "1",
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
