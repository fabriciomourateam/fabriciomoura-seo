#!/usr/bin/env node
/**
 * publish-to-wp.mjs — publica um artigo do blog/ direto no WordPress via REST API.
 *
 * Lê o arquivo HTML do artigo, extrai os campos do comentário de publicação que já
 * existe no topo (Título, Slug, Título SEO, Meta, Palavra-chave foco) e o corpo
 * entre <!-- INÍCIO DO POST --> e <!-- FIM DO POST -->, e cria/atualiza o Post.
 *
 * Uso:
 *   node scripts/publish-to-wp.mjs <arquivo.html> [draft|publish]
 *   INPUT_FILE=blog/creatina-engorda.html INPUT_STATUS=draft node scripts/publish-to-wp.mjs
 *   DRY_RUN=1 node scripts/publish-to-wp.mjs blog/creatina-engorda.html   # só mostra o que faria
 *
 * Variáveis de ambiente (segredos):
 *   WP_URL           ex.: https://fabriciomoura.com   (sem barra no fim)
 *   WP_USER          usuário do WordPress
 *   WP_APP_PASSWORD  Application Password (WP → Usuários → Perfil → Application Passwords)
 *
 * Zero dependências — usa fetch nativo (Node 18+).
 */

import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const file   = process.argv[2] || process.env.INPUT_FILE;
const status = (process.argv[3] || process.env.INPUT_STATUS || 'draft').trim();
const dryRun = process.env.DRY_RUN === '1' || process.env.DRY_RUN === 'true';

if (!file) {
  console.error('❌ Informe o arquivo. Ex.: node scripts/publish-to-wp.mjs blog/creatina-engorda.html');
  process.exit(1);
}
if (!['draft', 'publish'].includes(status)) {
  console.error(`❌ status inválido: "${status}". Use draft ou publish.`);
  process.exit(1);
}

const html = readFileSync(file, 'utf8');

// ── Extração ──────────────────────────────────────────────────────────────────
const pick = (re) => { const m = html.match(re); return m ? m[1].trim() : ''; };

// Título do post: linha "Título:" do comentário (não confundir com "Título SEO:")
let title = pick(/(?:^|\n)\s*\d*\.?\s*Título:\s*(.+)/);
if (!title) {
  // fallback: <title> sem o sufixo "| Fabricio Moura"
  title = pick(/<title>\s*([\s\S]*?)<\/title>/).replace(/\s*\|\s*Fabricio Moura\s*$/i, '').trim();
}

let slug = pick(/(?:^|\n)\s*Slug:\s*(.+)/);
if (!slug) slug = basename(file).replace(/\.html?$/i, '');

const seoTitle = pick(/Título SEO:\s*(.+)/);
// Meta pode quebrar em várias linhas até "Palavra-chave foco:"
const metaDesc = pick(/Meta:\s*([\s\S]*?)\n\s*Palavra-chave foco:/).replace(/\s+/g, ' ').trim()
             || pick(/<meta name="description" content="([^"]*)"/);
const focusKw  = pick(/Palavra-chave foco:\s*(.+)/);

// Corpo: tudo entre os marcadores
const bodyMatch = html.match(/<!--\s*INÍCIO DO POST\s*-->([\s\S]*?)<!--\s*FIM DO POST\s*-->/);
const content = bodyMatch ? bodyMatch[1].trim() : '';

if (!title)   { console.error('❌ Não achei o Título no artigo.'); process.exit(1); }
if (!content) { console.error('❌ Não achei o corpo (marcadores INÍCIO/FIM DO POST).'); process.exit(1); }

console.log('📄 Artigo:', file);
console.log('   Título :', title);
console.log('   Slug   :', slug);
console.log('   Status :', status);
console.log('   SEO    :', seoTitle || '(usa o título)');
console.log('   Meta   :', metaDesc ? metaDesc.slice(0, 80) + (metaDesc.length > 80 ? '…' : '') : '(nenhuma)');
console.log('   Foco   :', focusKw || '(nenhuma)');
console.log('   Corpo  :', content.length, 'caracteres');

if (dryRun) {
  console.log('\n🟡 DRY_RUN — nada foi enviado ao WordPress.');
  process.exit(0);
}

// ── Envio ─────────────────────────────────────────────────────────────────────
const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;
if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error('❌ Faltam segredos: defina WP_URL, WP_USER e WP_APP_PASSWORD.');
  process.exit(1);
}
const base = WP_URL.replace(/\/+$/, '');
const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

// Se já existe um post com o mesmo slug, atualiza em vez de duplicar.
async function findExisting() {
  const r = await fetch(`${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=any`, {
    headers: { Authorization: auth },
  });
  if (!r.ok) return null;
  const arr = await r.json();
  return Array.isArray(arr) && arr.length ? arr[0].id : null;
}

const payload = {
  title,
  slug,
  content,
  status,
  // RankMath/Yoast: enviado best-effort (só "cola" se o SEO plugin expõe esses meta no REST).
  meta: {
    rank_math_title: seoTitle || title,
    rank_math_description: metaDesc,
    rank_math_focus_keyword: focusKw,
  },
};

const existingId = await findExisting();
const url = existingId
  ? `${base}/wp-json/wp/v2/posts/${existingId}`
  : `${base}/wp-json/wp/v2/posts`;

const res = await fetch(url, {
  method: 'POST',
  headers: { Authorization: auth, 'Content-Type': 'application/json' },
  body: JSON.stringify(payload),
});

if (!res.ok) {
  const txt = await res.text();
  console.error(`\n❌ WordPress respondeu ${res.status}:`);
  console.error(txt.slice(0, 500));
  if (res.status === 401) console.error('\n→ 401 = usuário/Application Password errados, ou Basic Auth bloqueado por plugin de segurança.');
  process.exit(1);
}

const post = await res.json();
console.log(`\n✅ ${existingId ? 'Atualizado' : 'Criado'} como ${post.status}.`);
console.log('   Editar :', `${base}/wp-admin/post.php?post=${post.id}&action=edit`);
console.log('   Ver    :', post.link);
if (!seoTitle && !metaDesc) {
  console.log('\nℹ️  Sem campos SEO no artigo — preencha Título SEO/Meta no RankMath se quiser.');
} else {
  console.log('\nℹ️  Se o SEO (Título/Meta) não apareceu no RankMath, cole manualmente — alguns setups não aceitam meta via REST.');
}
