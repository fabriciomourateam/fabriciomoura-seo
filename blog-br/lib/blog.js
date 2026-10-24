import "server-only";
import fs from "node:fs";
import path from "node:path";

export const SITE = process.env.NEXT_PUBLIC_SITE_URL || "https://fabriciomoura.blog.br";
export const SITE_NAME = "Fabricio Moura | Nutrição e Treinamento";
export const PRINCIPAL = "https://fabriciomoura.com";
export const FOTO = `${PRINCIPAL}/wp-content/uploads/2026/06/Screenshot_20260322_192920_Canva1-1024x1024.jpg`;
export const WA_NUMERO = "5511914849797";
export const WA_MSG = "Oi Fabricio!! Vim através do seu blog! Gostaria de saber como funciona seu acompanhamento.";
export const WA_LINK = `https://wa.me/${WA_NUMERO}?text=${encodeURIComponent(WA_MSG)}`;
export const CALCULADORA = `${PRINCIPAL}/calculadora-de-imc-e-calorias/`;

/*
  Posts deste blog: posts/<slug>.json (versionados no git).
  - medicamento: true  -> artigo sobre medicamento/hormônio (exclusivo deste domínio, aviso médico, no sitemap)
  - canonical          -> artigo geral que também existe no site principal; o canonical aponta pra lá e fica fora do sitemap
*/
const DIR = path.join(process.cwd(), "posts");
// Datas do WordPress vêm sem fuso (horário de São Paulo)
const brt = (d) => (d && !/[zZ]|[+-]\d\d:?\d\d$/.test(d) ? `${d}-03:00` : d);
let cache;

export function listPosts() {
  if (cache) return cache;
  cache = fs.readdirSync(DIR).filter((f) => f.endsWith(".json"))
    .map((f) => JSON.parse(fs.readFileSync(path.join(DIR, f), "utf8")))
    .filter((p) => p.status === "publish")
    .map((p) => ({ ...p, date: brt(p.date), modified: brt(p.modified || p.date) }))
    .sort((a, b) => new Date(b.date) - new Date(a.date));
  return cache;
}
export const getPost = (slug) => listPosts().find((p) => p.slug === slug);
export const canonicalUrl = (p) => p.canonical || SITE + postUrl(p.slug);

// "Leia também": posts com mais palavras em comum no endereço/título; completa com os mais recentes
const STOP = new Set(["de", "da", "do", "das", "dos", "e", "o", "a", "os", "as", "para", "com", "que", "em", "por", "um", "uma", "no", "na", "ou", "se", "quem", "como", "qual"]);
const words = (p) => new Set(`${p.slug} ${p.title}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").split(/[^a-z0-9]+/).filter((w) => w.length > 2 && !STOP.has(w)));
export function relacionados(post, todos = listPosts(), n = 3) {
  const base = words(post);
  return todos
    .filter((p) => p.slug !== post.slug)
    .map((p, i) => ({ p, score: [...words(p)].filter((w) => base.has(w)).length * 10 - i * 0.01 }))
    .sort((a, b) => b.score - a.score)
    .slice(0, n)
    .map((x) => x.p);
}

export const postUrl = (slug) => `/${slug}/`;
export const dataCurta = (d) =>
  d ? new Intl.DateTimeFormat("pt-BR", { day: "numeric", month: "short", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(d)).replace(/\./g, "").replace(/ de /g, " ") : "";
export const dataBR = (d) =>
  d ? new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "long", year: "numeric", timeZone: "America/Sao_Paulo" }).format(new Date(d)) : "";

// Categoria automática pelo endereço/título (vale para importados, painel e automação, sem campo extra)
const CATEGORIAS = [
  ["Canetas emagrecedoras", /mounjaro|ozempic|retatrutida|tirzepatida|semaglutida|wegovy/],
  ["Suplementos e hormônios", /whey|creatina|masteron|testosterona|suplement|hormon/],
  ["Hipertrofia", /hipertrofia|recomposicao|musculo|massa muscular|pos-treino|pos treino/],
  ["Acompanhamento", /^nutricionista|^quanto-custa|acompanhamento|consultoria/],
  ["Emagrecimento", /./],
];
export function categoria(p) {
  const t = `${p.slug} ${p.title}`.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  return CATEGORIAS.find(([, re]) => re.test(t))[0];
}
export const CATEGORIAS_ORDEM = CATEGORIAS.map(([c]) => c);

// Título quebrado em partes, marcando a palavra-chave (focusKw, ou as palavras do endereço).
// Ex.: "Whey protein engorda? Mitos e verdades" + "whey engorda" -> [["Whey protein engorda", true], ["? Mitos e verdades", false]]
const norm = (w) => w.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
export function tituloComDestaque(p) {
  const chave = (p.focusKw || p.slug.replace(/-/g, " ")).split(/\s+/).map(norm).filter((w) => w.length > 2 && !STOP.has(w));
  const partes = p.title.split(/(\s+)/);
  const bate = (w) => { const n = norm(w).replace(/[^a-z0-9]/g, ""); return n.length > 2 && chave.some((k) => n === k || n.startsWith(k) || k.startsWith(n) && n.length > 3); };
  const idx = partes.map((w, i) => (/\S/.test(w) && bate(w) ? i : -1)).filter((i) => i >= 0);
  if (!idx.length) return [[p.title, false]];
  // trecho contínuo do 1º ao último acerto, se não for longo demais; senão só as palavras que bateram
  const [ini, fim] = [idx[0], idx[idx.length - 1]];
  const palavrasNoTrecho = partes.slice(ini, fim + 1).filter((w) => /\S/.test(w)).length;
  let marcar;
  if (palavrasNoTrecho <= idx.length + 2) marcar = new Set(Array.from({ length: fim - ini + 1 }, (_, k) => ini + k));
  else {
    // só o primeiro trecho: acertos ligados por espaço ou palavras curtas (de, da, do...)
    marcar = new Set([ini]);
    let ult = ini;
    for (let i = ini + 1; i < partes.length; i++) {
      const w = partes[i];
      if (!/\S/.test(w)) continue;
      if (idx.includes(i)) { for (let k = ult + 1; k <= i; k++) marcar.add(k); ult = i; }
      else if (!STOP.has(norm(w))) break;
    }
  }
  const out = [];
  partes.forEach((w, i) => {
    // pontuação no fim da palavra marcada fica fora do destaque
    const m = marcar.has(i) ? w.match(/^(.*?)([?!.,:;)]*)$/) : null;
    const pedacos = m ? [[m[1], true], [m[2], false]] : [[w, false]];
    for (const [t, on] of pedacos) {
      if (!t) continue;
      const last = out[out.length - 1];
      if (last && (last[1] === on || (!/\S/.test(t) && marcar.has(i + 1) && marcar.has(i - 1)))) last[0] += t, last[1] = last[1] || on;
      else out.push([t, on]);
    }
  });
  return out;
}
