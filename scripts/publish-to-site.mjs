#!/usr/bin/env node
/**
 * publish-to-site.mjs: publica um artigo do blog/ direto no site novo (Next.js na Vercel).
 *
 * Substitui o publish-to-wp.mjs. Lê o MESMO formato de arquivo (comentário de publicação no topo com
 * Título, Slug, Título SEO, Meta, Palavra-chave foco + corpo entre <!-- INÍCIO DO POST --> e
 * <!-- FIM DO POST -->) e envia para POST <SITE_URL>/api/blog. O artigo aparece na hora em
 * fabriciomoura.com/<slug>/, no blog, no menu, no "Leia também" e no sitemap.
 *
 * Uso:
 *   node scripts/publish-to-site.mjs <arquivo.html> [draft|publish]
 *   DRY_RUN=1 node scripts/publish-to-site.mjs blog/creatina-engorda.html
 *
 * Segredos (env):
 *   SITE_URL        ex.: https://fabriciomoura.com (sem barra no fim)
 *   BLOG_API_TOKEN  o mesmo valor configurado na Vercel (projeto site-fabriciomoura)
 */
import { readFileSync } from 'node:fs';
import { travarSeProibido } from './temas-proibidos.mjs';
import { basename } from 'node:path';

const file   = process.argv[2] || process.env.INPUT_FILE;
const status = (process.argv[3] || process.env.INPUT_STATUS || 'draft').trim();
const dryRun = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';

if (!file) { console.error('❌ Informe o arquivo. Ex.: node scripts/publish-to-site.mjs blog/creatina-engorda.html'); process.exit(1); }
if (!['draft', 'publish'].includes(status)) { console.error(`❌ status inválido: "${status}". Use draft ou publish.`); process.exit(1); }

const html = readFileSync(file, 'utf8');
travarSeProibido(html, file);
const pick = (re) => { const m = html.match(re); return m ? m[1].trim() : ''; };

let title = pick(/(?:^|\n)\s*\d*\.?\s*Título:\s*(.+)/);
if (!title) title = pick(/<title>\s*([\s\S]*?)<\/title>/).replace(/\s*\|\s*Fabricio Moura\s*$/i, '').trim();
let slug = pick(/(?:^|\n)\s*Slug:\s*(.+)/);
if (!slug) slug = basename(file).replace(/\.html?$/i, '');
const seoTitle = pick(/Título SEO:\s*(.+)/);
const description = pick(/Meta:\s*([\s\S]*?)\n\s*Palavra-chave foco:/).replace(/\s+/g, ' ').trim()
                 || pick(/<meta name="description" content="([^"]*)"/);
const focusKw = pick(/Palavra-chave foco:\s*(.+)/);

let content = '';
const marker = html.match(/<!--\s*IN[IÍ]CIO DO POST\s*-->([\s\S]*?)<!--\s*FIM DO POST\s*-->/i);
if (marker) content = marker[1].trim();
else content = (html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] || '').trim();

// Imagem de compartilhamento: a foto do autor que todo artigo do modelo usa
const image = pick(/<img[^>]+src="(https:\/\/fabriciomoura\.com\/wp-content\/uploads\/[^"]+)"/);

if (!title)   { console.error('❌ Não achei o Título no artigo.'); process.exit(1); }
if (!content) { console.error('❌ Não achei o corpo (marcadores INÍCIO/FIM DO POST ou <body>).'); process.exit(1); }

console.log('📄 Artigo:', file);
console.log('   Título :', title);
console.log('   Slug   :', slug);
console.log('   Status :', status);
console.log('   SEO    :', seoTitle || '(usa o título)');
console.log('   Meta   :', description ? description.slice(0, 80) + (description.length > 80 ? '…' : '') : '(nenhuma)');
console.log('   Foco   :', focusKw || '(nenhuma)');
console.log('   Corpo  :', content.length, 'caracteres');

if (dryRun) { console.log('\n🟡 DRY_RUN: nada foi enviado ao site.'); process.exit(0); }

const { SITE_URL, BLOG_API_TOKEN } = process.env;
if (!SITE_URL || !BLOG_API_TOKEN) { console.error('❌ Faltam segredos: defina SITE_URL e BLOG_API_TOKEN.'); process.exit(1); }

const body = JSON.stringify({ slug, title, seoTitle, description, focusKw, image, content, status });
let res, txt = '';
for (let i = 1; i <= 4; i++) {
  try {
    res = await fetch(`${SITE_URL.replace(/\/+$/, '')}/api/blog`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${BLOG_API_TOKEN}`, 'Content-Type': 'application/json' },
      body,
    });
    txt = await res.text();
    if (res.status < 500) break;
  } catch (e) { txt = e.message; }
  console.warn(`   tentativa ${i} falhou (${res?.status || 'rede'}): ${txt.slice(0, 200)}`);
  await new Promise((r) => setTimeout(r, 2000 * 2 ** i));
}
let j = {};
try { j = JSON.parse(txt); } catch {}
if (!res?.ok || !j.ok) {
  console.error(`\n❌ O site respondeu ${res?.status}: ${(j.erro || txt).slice(0, 500)}`);
  if (res?.status === 401) console.error('   → BLOG_API_TOKEN diferente do configurado na Vercel.');
  process.exit(1);
}
console.log(`\n✅ ${j.atualizado ? 'Atualizado' : 'Publicado'} (${status}).`);
console.log('   Ver    :', j.url);
