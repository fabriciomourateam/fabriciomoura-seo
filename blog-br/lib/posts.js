import fs from "node:fs";
import path from "node:path";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fabriciomoura.blog.br";
export const INSTAGRAM = "https://www.instagram.com/fabriciomourateam/";
export const WHATS = "https://wa.me/5511914849797?text=Oi%20Fabricio!%20Li%20um%20artigo%20do%20seu%20blog%20e%20quero%20um%20acompanhamento%20individual.";

const DIR = path.join(process.cwd(), "posts");
let cache;

export function listPosts() {
  if (cache) return cache;
  cache = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p) => p.status === "publish")
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return cache;
}
export const getPost = (slug) => listPosts().find((p) => p.slug === slug);
export const postUrl = (slug) => `/${slug}/`;

const STOP = new Set(["de", "da", "do", "das", "dos", "e", "o", "a", "os", "as", "para", "com", "que", "em", "por", "um", "uma", "no", "na", "ou", "se", "quem", "como", "qual"]);
const words = (p) => new Set(`${p.slug} ${p.title}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
export function relacionados(post, n = 3) {
  const base = words(post);
  return listPosts().filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, score: [...words(p)].filter((w) => base.has(w)).length * 10 - i * 0.01 }))
    .sort((a, b) => b.score - a.score).slice(0, n).map((x) => x.p);
}

export const dataCurta = (d) =>
  d ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(d)).replace(/\./g, "").replace(/ de /g, " ") : "";
export const dataBR = (d) =>
  d ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(d)) : "";

// Ajustes no HTML dos artigos na hora de exibir (não altera o que está salvo).
export function limparHtml(html = "") {
  const slugs = new Set(listPosts().map((p) => p.slug));
  return html
    .replace(/<p>\s*<!--\/?noptimize-->\s*<\/p>/g, "")
    .replace(/<!--\/?noptimize-->/g, "")
    .replace(/<style>\s*body\.single-post[\s\S]*?<\/style>/g, "")
    .replace(/@import url\(['"](https:\/\/fonts\.googleapis\.com[^'"]*)['"]\);?/g, (m, url) => {
      const fam = [...url.matchAll(/family=([^:&]+)/g)].map((x) => decodeURIComponent(x[1]).replace(/\+/g, " "));
      return fam.length && fam.every((f) => f === "Anton" || f === "Montserrat") ? "" : m;
    })
    .replace(/'Montserrat',\s*sans-serif/g, "var(--f-body)")
    .replace(/'Anton',\s*sans-serif/g, "var(--f-display)")
    // links para artigos deste blog viram relativos; os demais fabriciomoura.com ficam absolutos
    .replace(/https?:\/\/(?:www\.)?fabriciomoura\.com\/([a-z0-9-]+)\/?(?=["'#?\s>])/g, (m, s) => (slugs.has(s) ? `/${s}/` : m));
}
