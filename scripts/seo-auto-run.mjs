#!/usr/bin/env node
/**
 * seo-auto-run.mjs — gera o próximo artigo planejado e publica no WordPress.
 *
 * Fluxo (roda 2x/semana pela GitHub Action):
 *   1. Lê o calendário editorial (data.js) e escolhe o próximo tópico "Planejado"
 *      que ainda não foi publicado (controle em scripts/seo-published.json).
 *   2. Gera o artigo HTML completo no MESMO template premium (usa um artigo
 *      existente como modelo de formato) via API da Anthropic.
 *   3. Salva em blog/<slug>.html e publica no WordPress (publish-to-wp.mjs).
 *   4. Marca o tópico como publicado. A Action faz commit dos arquivos alterados.
 *
 * Segredos (env): ANTHROPIC_API_KEY, WP_URL, WP_USER, WP_APP_PASSWORD
 * Opcionais: SEO_MODEL (default claude-sonnet-4-6), PUBLISH_STATUS (default publish)
 * Teste: GEN_DRY_RUN=1  → não chama IA nem WordPress; valida seleção/fila/escrita.
 */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const ROOT = new URL('..', import.meta.url).pathname;
const TEMPLATE_FILE = ROOT + 'blog/creatina-engorda.html';
const PUBLISHED_FILE = ROOT + 'scripts/seo-published.json';
const dryRun = process.env.GEN_DRY_RUN === '1' || process.env.GEN_DRY_RUN === 'true';

// ── 1. Escolher o próximo tópico ──────────────────────────────────────────────
function loadCalendario() {
  const src = readFileSync(ROOT + 'data.js', 'utf8');
  const win = {};
  // data.js faz `window.SEO_DATA = {...}` — executamos num sandbox simples.
  new Function('window', src)(win);
  const data = win.SEO_DATA || {};
  // o calendário editorial é um array de itens {mes,titulo,kw,status,...} aninhado
  // em algum lugar de SEO_DATA — varremos a estrutura atrás dele.
  const items = [];
  (function walk(v) {
    if (Array.isArray(v)) {
      if (v.length && v[0] && typeof v[0] === 'object' && 'kw' in v[0] && 'status' in v[0]) items.push(...v);
      else v.forEach(walk);
    } else if (v && typeof v === 'object') {
      Object.values(v).forEach(walk);
    }
  })(data);
  return items;
}

const PRIO = { Alta: 0, 'Média': 1, Media: 1, 'Baixa': 2 };
function pickTopic(items, doneKws) {
  const pending = items
    .filter(i => i.status === 'Planejado' && !doneKws.has(norm(i.kw)))
    // não sobrescreve artigo que já existe escrito à mão em blog/
    .filter(i => !existsSync(`${ROOT}blog/${slugify(i.kw)}.html`))
    .sort((a, b) =>
      (a.mes ?? 99) - (b.mes ?? 99) ||
      (PRIO[a.prioridade] ?? 9) - (PRIO[b.prioridade] ?? 9) ||
      (b.vol ?? 0) - (a.vol ?? 0)
    );
  return pending[0] || null;
}
const norm = (s) => (s || '').toString().trim().toLowerCase();
const slugify = (s) => norm(s)
  .normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

// ── 2. Gerar o artigo ─────────────────────────────────────────────────────────
async function generate(topic, template) {
  if (dryRun) {
    // Stub: reaproveita o template trocando só o essencial, pra validar o pipeline.
    const slug = slugify(topic.kw);
    return template
      .replace(/Título:.*/, `Título: ${topic.titulo}`)
      .replace(/Slug:.*/, `Slug: ${slug}`)
      .replace(/Palavra-chave foco:.*/, `Palavra-chave foco: ${topic.kw}`);
  }
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Falta ANTHROPIC_API_KEY.');
  const model = process.env.SEO_MODEL || 'claude-sonnet-4-6';

  const system = [
    'Você é redator SEO especialista em nutrição esportiva, escrevendo para o site do Fabricio Moura (nutricionista e treinador esportivo).',
    'Português do Brasil, tom direto, confiável e prático. PROIBIDO: travessões, o clichê "não é X, é Y", linguagem de IA genérica, encheção de linguiça.',
    'Você responde SOMENTE com o HTML completo do artigo, do <!DOCTYPE html> ao </html>, sem markdown e sem nenhum texto antes ou depois.',
  ].join('\n');

  const user = `Abaixo está um ARTIGO MODELO (gold standard) do site. Escreva um ARTIGO NOVO sobre outro tema, mantendo EXATAMENTE a mesma estrutura HTML/CSS.

REGRAS:
- Copie VERBATIM o bloco <style>, as classes (mj-hero, mj-quote, mj-author, mj-plan, mj-meal, mj-midcta, mj-yes, mj-avoid, kick gold, etc.), o bloco de autor, os CTAs e os links para fabriciomoura.com e o WhatsApp. Só muda o CONTEÚDO textual.
- Preencha o comentário de publicação no topo (Título, Slug, Título SEO, Meta, Palavra-chave foco) e mantenha os marcadores <!-- INÍCIO DO POST --> e <!-- FIM DO POST -->.
- Faça links internos para artigos existentes quando fizer sentido: /creatina-engorda, /deficit-calorico, /gordura-visceral, /calculadora-de-imc-e-calorias.
- 1200 a 1800 palavras, conteúdo REAL que responde a intenção de busca da palavra-chave. Sem inventar estudos ou números falsos.
- Respeite o enquadramento de saúde: nada de prometer cura, dose de medicamento, ou promessa milagrosa.

TEMA DO NOVO ARTIGO:
- Título sugerido: ${topic.titulo}
- Palavra-chave foco: ${topic.kw}
- Etapa do funil: ${topic.funil || 'Topo'}
- Slug sugerido: ${slugify(topic.kw)}

=== ARTIGO MODELO (copie o formato) ===
${template}`;

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'content-type': 'application/json',
    },
    body: JSON.stringify({ model, max_tokens: 8000, system, messages: [{ role: 'user', content: user }] }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  let html = (data.content?.[0]?.text || '').trim();
  // tira cercas de markdown se vierem
  html = html.replace(/^```html?\s*/i, '').replace(/```\s*$/, '').trim();
  return html;
}

function validate(html) {
  if (!/<title>[\s\S]*?<\/title>/i.test(html)) throw new Error('Artigo gerado sem <title> — abortando sem publicar.');
  // o corpo pode vir com os marcadores OU dentro de <body> (o publicador aceita os dois)
  const hasMarkers = /<!--\s*IN[IÍ]CIO DO POST\s*-->[\s\S]*?<!--\s*FIM DO POST\s*-->/i.test(html);
  const hasBody = /<body[^>]*>[\s\S]*?<\/body>/i.test(html);
  if (!hasMarkers && !hasBody) throw new Error('Artigo sem corpo (sem marcadores e sem <body>) — abortando sem publicar.');
}
const slugFromHtml = (html) => {
  const m = html.match(/Slug:\s*([a-z0-9-]+)/i);
  return m ? m[1].trim() : '';
};

// ── main ──────────────────────────────────────────────────────────────────────
const published = existsSync(PUBLISHED_FILE) ? JSON.parse(readFileSync(PUBLISHED_FILE, 'utf8')) : [];
const doneKws = new Set(published.map(p => norm(p.kw)));

const items = loadCalendario();
const topic = pickTopic(items, doneKws);
if (!topic) {
  console.log('🟢 Fila vazia — nenhum tópico "Planejado" pendente. Nada a fazer.');
  process.exit(0);
}
console.log('📝 Próximo tópico:', topic.titulo, `(kw: ${topic.kw}, mês ${topic.mes}, ${topic.prioridade})`);

const template = readFileSync(TEMPLATE_FILE, 'utf8');
const html = await generate(topic, template);
validate(html);
const slug = slugFromHtml(html) || slugify(topic.kw);
const outFile = `blog/${slug}.html`;
writeFileSync(ROOT + outFile, html, 'utf8');
console.log(`✅ Artigo escrito: ${outFile} (${html.length} caracteres)`);

if (dryRun) {
  console.log('🟡 GEN_DRY_RUN — não publiquei no WordPress nem atualizei a fila.');
  process.exit(0);
}

// 3. Publicar
const status = process.env.PUBLISH_STATUS || 'publish';
execFileSync('node', [ROOT + 'scripts/publish-to-wp.mjs', ROOT + outFile, status], { stdio: 'inherit' });

// 4. Marcar como publicado
published.push({ kw: topic.kw, slug, titulo: topic.titulo, file: outFile, date: new Date().toISOString().slice(0, 10) });
writeFileSync(PUBLISHED_FILE, JSON.stringify(published, null, 2) + '\n', 'utf8');
console.log('✅ Marcado como publicado na fila. Total publicados:', published.length);
