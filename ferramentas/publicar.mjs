#!/usr/bin/env node
// Publica um artigo do blog/ direto no WordPress via REST API.
//
// Uso:
//   node ferramentas/publicar.mjs blog/<arquivo>.html
//   node ferramentas/publicar.mjs blog/<arquivo>.html --rascunho   (publica como draft)
//
// Lê as credenciais das variáveis de ambiente (NUNCA do repositório nem do chat):
//   WP_URL           ex.: https://fabriciomoura.com
//   WP_USER          usuário editor dedicado (ex.: agente-conteudo)
//   WP_APP_PASSWORD  senha de aplicativo do WordPress
//
// O que ele faz:
//   1. Lê o HTML, extrai os metadados do cabeçalho (Título/Slug/Título SEO/Meta/Palavra-chave)
//      e o conteúdo entre INÍCIO DO POST e FIM DO POST.
//   2. POST em {WP_URL}/wp-json/wp/v2/posts com Basic Auth -> publica.
//   3. Best-effort: grava o SEO do Rank Math (título/descrição/palavra-chave foco).
//   4. Imprime a URL publicada.

import { readFile } from 'node:fs/promises';

const args = process.argv.slice(2);
const file = args.find((a) => !a.startsWith('--'));
const status = args.includes('--rascunho') ? 'draft' : 'publish';

function fail(msg) {
  console.error(`\n❌ ${msg}\n`);
  process.exit(1);
}

if (!file) fail('Informe o arquivo. Ex.: node ferramentas/publicar.mjs blog/arroz-engorda.html');

const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;
const faltando = ['WP_URL', 'WP_USER', 'WP_APP_PASSWORD'].filter((k) => !process.env[k]);
if (faltando.length) {
  fail(
    `Variáveis de ambiente ausentes: ${faltando.join(', ')}.\n` +
      '   Configure-as no ambiente do Claude Code (Environment Variables), não no repositório.',
  );
}

const base = WP_URL.replace(/\/+$/, '');
const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

// --- Lê e analisa o arquivo ---------------------------------------------------
let html;
try {
  html = await readFile(file, 'utf8');
} catch {
  fail(`Não consegui ler o arquivo: ${file}`);
}

const corpo = html.match(/<!--\s*INÍCIO DO POST\s*-->([\s\S]*?)<!--\s*FIM DO POST\s*-->/);
if (!corpo) fail('Não encontrei os marcadores "INÍCIO DO POST" / "FIM DO POST" no arquivo.');
const content = corpo[1].trim();

// Metadados: primeiro tenta o cabeçalho de instruções; cai pra <title>/<meta> se faltar.
const header = (html.match(/<!--([\s\S]*?)-->/) || [, ''])[1];
const pega = (rotulo) => {
  const m = header.match(new RegExp(rotulo + '\\s*:\\s*(.+)', 'i'));
  return m ? m[1].trim() : '';
};
const title = pega('Título(?! SEO)') || (html.match(/<title>(.*?)<\/title>/i) || [, ''])[1].trim();
const slug = pega('Slug');
const seoTitle = pega('Título SEO');
const seoDesc =
  pega('Meta') || (html.match(/<meta name="description" content="(.*?)"/i) || [, ''])[1].trim();
const focusKw = pega('Palavra-chave foco');

if (!title) fail('Não consegui determinar o título do post.');

// --- Publica ------------------------------------------------------------------
const payload = { title, status, content };
if (slug) payload.slug = slug;

const url = `${base}/wp-json/wp/v2/posts`;
console.log(`\n→ Publicando "${title}" (${status}) em ${base} ...`);

let res, post;
try {
  res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: auth, 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  post = await res.json();
} catch (e) {
  fail(`Falha de rede ao chamar o WordPress: ${e.message}`);
}

if (!res.ok) {
  fail(
    `WordPress recusou (HTTP ${res.status}): ${post?.message || JSON.stringify(post)}\n` +
      '   Verifique WP_USER / WP_APP_PASSWORD e se a REST API está acessível.',
  );
}

// --- SEO do Rank Math (best-effort: nunca derruba a publicação) ---------------
if (seoTitle || seoDesc || focusKw) {
  const meta = {};
  if (seoTitle) meta.rank_math_title = seoTitle;
  if (seoDesc) meta.rank_math_description = seoDesc;
  if (focusKw) meta.rank_math_focus_keyword = focusKw;
  try {
    const r = await fetch(`${base}/wp-json/wp/v2/posts/${post.id}`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ meta }),
    });
    if (!r.ok) console.warn('⚠️  Post publicado, mas não consegui gravar o SEO do Rank Math (siga manual no painel).');
  } catch {
    console.warn('⚠️  Post publicado, mas a chamada de SEO do Rank Math falhou (siga manual no painel).');
  }
}

console.log(`\n✅ Publicado: ${post.link}`);
console.log(`   ID ${post.id} · status ${post.status} · slug ${post.slug}\n`);
