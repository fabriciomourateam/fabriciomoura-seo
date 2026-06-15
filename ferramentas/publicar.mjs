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

// --- Categoria (agrupa os artigos no blog) ------------------------------------
// Resolve o nome para o ID que a API exige; cria a categoria se ainda não existir.
// Nome padrão "Conteúdo Semanal" (sobrescreva com a variável de ambiente WP_CATEGORY).
const catNome = (process.env.WP_CATEGORY || 'Conteúdo Semanal').trim();
async function resolverCategoria(nome) {
  try {
    const busca = await fetch(
      `${base}/wp-json/wp/v2/categories?search=${encodeURIComponent(nome)}`,
      { headers: { Authorization: auth } },
    );
    if (busca.ok) {
      const lista = await busca.json();
      const exato = lista.find((c) => c.name.toLowerCase() === nome.toLowerCase());
      if (exato) return exato.id;
    }
    const criar = await fetch(`${base}/wp-json/wp/v2/categories`, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: nome }),
    });
    if (criar.ok) return (await criar.json()).id;
  } catch {
    /* best-effort: cai pro padrão "Sem categoria" se algo falhar */
  }
  return null;
}
const catId = catNome ? await resolverCategoria(catNome) : null;
if (catNome && !catId) {
  console.warn(`⚠️  Não consegui resolver a categoria "${catNome}"; o post vai sair sem categoria.`);
}

// --- Publica ou atualiza ------------------------------------------------------
const payload = { title, status, content };
if (slug) payload.slug = slug;
if (catId) payload.categories = [catId];

// Procura um post com o mesmo slug: se existir, ATUALIZA (não duplica); senão, cria.
let existingId = null;
if (slug) {
  try {
    const q = await fetch(
      `${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=any`,
      { headers: { Authorization: auth } },
    );
    if (q.ok) {
      const arr = await q.json();
      if (Array.isArray(arr) && arr.length) existingId = arr[0].id;
    }
  } catch {
    /* sem conexão de busca: segue como criação */
  }
}

const url = existingId
  ? `${base}/wp-json/wp/v2/posts/${existingId}`
  : `${base}/wp-json/wp/v2/posts`;
console.log(
  `\n→ ${existingId ? 'Atualizando' : 'Publicando'} "${title}" (${status}) em ${base} ...`,
);

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

console.log(`\n✅ ${existingId ? 'Atualizado' : 'Publicado'}: ${post.link}`);
console.log(`   ID ${post.id} · status ${post.status} · slug ${post.slug}\n`);
