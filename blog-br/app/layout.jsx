import { Anton, Montserrat } from "next/font/google";
import "./globals.css";
import "./blog.css";
import { SITE, INSTAGRAM } from "@/lib/posts";

const anton = Anton({ weight: "400", subsets: ["latin"], display: "swap", variable: "--f-display" });
const montserrat = Montserrat({ subsets: ["latin"], display: "swap", variable: "--f-body", weight: ["400", "500", "600", "700", "800"] });

const DESC = "Artigos de nutrição esportiva sobre medicamentos para emagrecer, hormônios e saúde, escritos pelo nutricionista Fabricio Moura (CRN3 95563/P).";
export const metadata = {
  metadataBase: new URL(SITE),
  title: "Blog do Fabricio Moura",
  description: DESC,
  alternates: { canonical: "/" },
  openGraph: { title: "Blog do Fabricio Moura", description: DESC, locale: "pt_BR", type: "website", siteName: "Blog do Fabricio Moura" },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
};
export const viewport = { themeColor: "#000000", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${montserrat.variable}`}>
      <body>
        <div className="bl">
          <header className="site-head">
            <a className="site-logo" href="/"><b>Fabricio Moura</b><span>Blog</span></a>
          </header>
          {children}
          <footer className="site-foot">
            <p>Fabricio Moura · Nutricionista CRN3 95563/P · Educador Físico CREF 201974-G/SP</p>
            <p><a href={INSTAGRAM} target="_blank" rel="noopener">Instagram @fabriciomourateam</a></p>
          </footer>
        </div>
      </body>
    </html>
  );
}
