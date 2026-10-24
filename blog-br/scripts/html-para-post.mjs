#!/usr/bin/env node
/**
 * html-para-post.mjs: converte um HTML do robo (formato de blog/*.html) em posts/<slug>.json deste blog.
 * Uso: node scripts/html-para-post.mjs <arquivo.html> [--canonical-principal]
 * --canonical-principal: artigo geral (nao-medicamento) que tambem existe no site principal: grava
 *   canonical https://fabriciomoura.com/<slug>/ e medicamento:false. Sem a flag: medicamento:true, sem canonical.
 * Mesma leitura do publish-to-site.mjs (Titulo, Slug, Titulo SEO, Meta, Palavra-chave foco,
 * corpo entre INICIO/FIM DO POST ou <body>). Grava com status "publish".
 */
import { readFileSync, writeFileSync, statSync, mkdirSync } from "node:fs";
import { basename, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const args = process.argv.slice(2);
const canonicalPrincipal = args.includes("--canonical-principal");
const file = args.find((a) => !a.startsWith("--"));
if (!file) { console.error("Informe o arquivo. Ex.: node scripts/html-para-post.mjs ../blog/masteron-efeitos-colaterais.html"); process.exit(1); }

const html = readFileSync(file, "utf8");
const pick = (re) => { const m = html.match(re); return m ? m[1].trim() : ""; };

let title = pick(/(?:^|\n)\s*\d*\.?\s*Título:\s*(.+)/);
if (!title) title = pick(/<title>\s*([\s\S]*?)<\/title>/).replace(/\s*\|\s*Fabricio Moura\s*$/i, "").trim();
let slug = pick(/(?:^|\n)\s*Slug:\s*(.+)/);
if (!slug) slug = basename(file).replace(/\.html?$/i, "");
const seoTitle = pick(/Título SEO:\s*(.+)/);
const description = pick(/Meta:\s*([\s\S]*?)\n\s*Palavra-chave foco:/).replace(/\s+/g, " ").trim()
  || pick(/<meta name="description" content="([^"]*)"/);
const focusKw = pick(/Palavra-chave foco:\s*(.+)/);

let content = "";
const marker = html.match(/<!--\s*IN[IÍ]CIO DO POST\s*-->([\s\S]*?)<!--\s*FIM DO POST\s*-->/i);
if (marker) content = marker[1].trim();
else content = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "").trim();

const image = pick(/<img[^>]+src="(https:\/\/fabriciomoura\.com\/wp-content\/uploads\/[^"]+)"/);

if (!title) { console.error("Nao achei o Titulo no artigo."); process.exit(1); }
if (!content) { console.error("Nao achei o corpo (marcadores INICIO/FIM DO POST ou <body>)."); process.exit(1); }

const agora = new Date().toISOString();
const date = statSync(file).mtime.toISOString();
const post = {
  slug, title, seoTitle: seoTitle || `${title} | Fabricio Moura`, description, image,
  date, modified: agora, focusKw, status: "publish",
  ...(canonicalPrincipal ? { canonical: `https://fabriciomoura.com/${slug}/`, medicamento: false } : { medicamento: true }),
  content,
};
const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "posts");
mkdirSync(dir, { recursive: true });
const out = join(dir, `${slug}.json`);
writeFileSync(out, JSON.stringify(post, null, 2) + "\n");
console.log("OK:", out, `(${content.length} caracteres)`);
