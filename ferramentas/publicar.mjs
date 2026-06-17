#!/usr/bin/env node
/**
 * publicar.mjs — publica OU atualiza um artigo do blog no WordPress (REST API).
 *
 * Sem dependências (usa fetch nativo do Node 18+). Procura o post pelo SLUG:
 *   - se já existe, EDITA o que está no ar (não duplica);
 *   - se não existe, CRIA.
 * Marca a categoria "Conteúdo Semanal" (cria se faltar), grava o SEO do
 * Rank Math (best-effort) e imprime a URL publicada.
 *
 * Uso:
 *   node ferramentas/publicar.mjs blog/<slug>.html              (publica/atualiza, status publish)
 *   node ferramentas/publicar.mjs blog/<slug>.html --rascunho   (como draft)
 *
 * Credenciais vêm SEMPRE do ambiente (NUNCA do chat nem do repositório):
 *   WP_URL            ex.: https://fabriciomoura.com
 *   WP_USER           usuário WordPress (ex.: agente-conteudo)
 *   WP_APP_PASSWORD   senha de aplicativo
 *   WP_CATEGORY       (opcional) nome da categoria. Padrão: "Conteúdo Semanal"
 */

import { readFile } from 'node:fs/promises';
import { basename } from 'node:path';

const CAT_NAME = process.env.WP_CATEGORY || 'Conteúdo Semanal';

// ---------- 1. Validar ambiente ----------
const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;
const faltando = ['WP_URL', 'WP_USER', 'WP_APP_PASSWORD'].filter((k) => !process.env[k]);
if (faltando.length) {
  console.error(`\n✗ variáveis ausentes: ${faltando.join(', ')}`);
  console.error('  Defina WP_URL, WP_USER e WP_APP_PASSWORD no ambiente e rode de novo.\n');
  process.exit(1);
}

const BASE = WP_URL.replace(/\/+$/, '');
const AUTH = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

// ---------- 2. Argumentos ----------
const args = process.argv.slice(2);
const rascunho = args.includes('--rascunho');
const arquivo = args.find((a) => !a.startsWith('--'));
if (!arquivo) {
  console.error('\nUso: node ferramentas/publicar.mjs blog/<slug>.html [--rascunho]\n');
  process.exit(1);
}
const status = rascunho ? 'draft' : 'publish';

// ---------- 3. Ler e extrair o artigo ----------
const raw = await readFile(arquivo, 'utf8');

function pegar(re) {
  const m = raw.match(re);
  return m ? m[1].trim() : '';
}

// Conteúdo entre os marcadores INÍCIO DO POST e FIM DO POST.
const corpo = raw.match(/<!--\s*IN[ÍI]CIO DO POST\s*-->([\s\S]*?)<!--\s*FIM DO POST\s*-->/i);
if (!corpo) {
  console.error(`\n✗ Não encontrei os marcadores <!-- INÍCIO DO POST --> / <!-- FIM DO POST --> em ${arquivo}\n`);
  process.exit(1);
}
const content = corpo[1].trim();

// Metadados: do cabeçalho em comentário e das tags <title>/<meta>.
const title = pegar(/T[íi]tulo:\s*(.+)/) || pegar(/<title>([\s\S]*?)<\/title>/i);
let slug = pegar(/Slug:\s*([a-z0-9-]+)/i);
if (!slug) slug = basename(arquivo).replace(/\.html?$/i, '');
const seoTitle = pegar(/<title>([\s\S]*?)<\/title>/i) || pegar(/T[íi]tulo SEO:\s*(.+)/);
const metaDesc = pegar(/<meta\s+name=["']description["']\s+content=["']([\s\S]*?)["']\s*\/?>/i);
const focusKw = pegar(/Palavra-chave foco:\s*(.+)/i);

if (!title) {
  console.error(`\n✗ Não consegui extrair o título de ${arquivo} (cabeçalho "Título:" nem <title>).\n`);
  process.exit(1);
}

// ---------- helper de rede ----------
async function wp(path, { method = 'GET', body } = {}) {
  const res = await fetch(`${BASE}/wp-json${path}`, {
    method,
    headers: {
      Authorization: AUTH,
      ...(body ? { 'Content-Type': 'application/json' } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const texto = await res.text();
  let dados;
  try { dados = texto ? JSON.parse(texto) : null; } catch { dados = texto; }
  if (!res.ok) {
    const msg = dados && dados.message ? dados.message : texto;
    const err = new Error(`HTTP ${res.status} em ${method} ${path}: ${msg}`);
    err.status = res.status;
    throw err;
  }
  return dados;
}

// ---------- 4. Resolver a categoria ----------
async function resolverCategoria() {
  const achadas = await wp(`/wp/v2/categories?search=${encodeURIComponent(CAT_NAME)}&per_page=100`);
  const exata = Array.isArray(achadas) ? achadas.find((c) => c.name === CAT_NAME) : null;
  if (exata) return exata.id;
  const criada = await wp('/wp/v2/categories', { method: 'POST', body: { name: CAT_NAME } });
  console.log(`  + categoria "${CAT_NAME}" criada (id ${criada.id})`);
  return criada.id;
}

// ---------- 5. Publicar ou atualizar ----------
(async () => {
  console.log(`\n→ ${arquivo}`);
  console.log(`  slug: ${slug} · status: ${status}`);

  const catId = await resolverCategoria();

  // Procura o post pelo slug (qualquer status; precisa de auth + context=edit).
  const existentes = await wp(
    `/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=any&context=edit&per_page=1`
  );
  const existente = Array.isArray(existentes) && existentes.length ? existentes[0] : null;

  const payload = { title, slug, status, content, categories: [catId] };

  let post;
  if (existente) {
    console.log(`  ↻ atualizando post existente (id ${existente.id})`);
    post = await wp(`/wp/v2/posts/${existente.id}`, { method: 'POST', body: payload });
  } else {
    console.log('  ＋ criando post novo');
    post = await wp('/wp/v2/posts', { method: 'POST', body: payload });
  }

  // Helper: grava um conjunto de meta de forma isolada (best-effort, não derruba o publish).
  async function aplicarMeta(rotulo, meta) {
    if (!Object.keys(meta).length) return;
    try {
      await wp(`/wp/v2/posts/${post.id}`, { method: 'POST', body: { meta } });
      console.log(`  ✓ ${rotulo} gravado`);
    } catch (e) {
      console.log(`  ⚠ ${rotulo} não gravado (best-effort): ${e.message}`);
    }
  }

  // ---------- 6a. SEO do Rank Math (best-effort) ----------
  const seo = {};
  if (seoTitle) seo.rank_math_title = seoTitle;
  if (metaDesc) seo.rank_math_description = metaDesc;
  if (focusKw) seo.rank_math_focus_keyword = focusKw;
  await aplicarMeta('SEO do Rank Math', seo);

  // ---------- 6b. Layout do Astra (best-effort) ----------
  // Garante que o post nasce no padrão dark sem ajuste manual:
  //   - sem o título branco do tema (cabeçalho)
  //   - sem sidebar
  //   - "Largura total / Esticada" (page-builder) → remove a caixa/rodapé branco do tema
  await aplicarMeta('Layout do Astra (sem título + sem sidebar + largura total)', {
    'site-post-title': 'disabled',
    'site-sidebar-layout': 'no-sidebar',
    'site-content-layout': 'page-builder',
  });

  // ---------- 6c. Remover cabeçalho e rodapé do site neste post (best-effort) ----------
  // Os artigos são dark/premium e o cabeçalho branco (logo + menu) e o rodapé do tema
  // destoam. Estas metas são do Astra "Disable Sections" e SÓ funcionam com Astra Pro/Addon
  // ativo (hoje NÃO está). Quando o site não tem o Addon, a remoção de fato é feita pelo CSS
  // dentro do próprio artigo (#masthead/.site-footer { display:none }). Deixamos as metas aqui
  // como bônus: se um dia ativarem o Astra Pro, o post já nasce sem cabeçalho/rodapé nativo.
  await aplicarMeta('Astra Disable Sections (efetivo só com Astra Pro; senão o CSS do post cuida)', {
    'ast-main-header-display': 'disabled',
    'ast-hfb-above-header-display': 'disabled',
    'ast-hfb-below-header-display': 'disabled',
    'footer-sml-layout': 'disabled',
    'footer-adv-display': 'disabled',
  });

  // ---------- 7. URL final ----------
  const url = post.link || `${BASE}/${slug}/`;
  console.log(`\n✓ ${existente ? 'Atualizado' : 'Publicado'} (${status}):`);
  console.log(`  ${url}\n`);
})().catch((e) => {
  console.error(`\n✗ Falhou: ${e.message}\n`);
  process.exit(1);
});
