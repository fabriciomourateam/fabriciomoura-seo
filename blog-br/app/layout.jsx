import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import "./blog.css";
import { SITE, SITE_NAME } from "@/lib/blog";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--f-display" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--f-body", weight: ["400", "500", "600", "700", "800"] });

const DESC = "Artigos do nutricionista esportivo Fabricio Moura sobre emagrecimento, dieta, suplementos e ganho de massa muscular. Conteúdo novo toda semana.";
export const metadata = {
  metadataBase: new URL(SITE),
  title: SITE_NAME,
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: SITE_NAME, description: DESC, locale: "pt_BR", type: "website", siteName: SITE_NAME },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};
export const viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
