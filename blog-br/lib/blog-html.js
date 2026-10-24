import { listPosts } from "@/lib/blog";

// Ajustes no HTML dos artigos na hora de exibir (não altera o que está salvo).
export function limparHtml(html = "") {
  const slugs = new Set(listPosts().map((p) => p.slug));
  return html
    // restos do WordPress: marcadores do Autoptimize e o CSS que escondia o cabeçalho do tema
    .replace(/<p>\s*<!--\/?noptimize-->\s*<\/p>/g, "")
    .replace(/<!--\/?noptimize-->/g, "")
    .replace(/<style>\s*body\.single-post[\s\S]*?<\/style>/g, "")
    // fontes: usa as que o site já carrega (next/font) em vez de baixar de novo do Google
    .replace(/@import url\(['"](https:\/\/fonts\.googleapis\.com[^'"]*)['"]\);?/g, (m, url) => {
      const fam = [...url.matchAll(/family=([^:&]+)/g)].map((x) => decodeURIComponent(x[1]).replace(/\+/g, " "));
      return fam.length && fam.every((f) => f === "Anton" || f === "Montserrat") ? "" : m;
    })
    .replace(/'Montserrat',\s*sans-serif/g, "var(--f-body)")
    .replace(/'Anton',\s*sans-serif/g, "var(--f-display)")
    // links para artigos deste blog viram relativos; os demais fabriciomoura.com (e as imagens) ficam absolutos
    .replace(/https?:\/\/(?:www\.)?fabriciomoura\.com\/([a-z0-9-]+)\/?(?=["'#?\s>])/g, (m, s) => (slugs.has(s) ? `/${s}/` : m));
}
