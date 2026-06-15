/**
 * Publicar artigo no WordPress via REST API
 * Uso: node ferramentas/publicar.mjs blog/<slug>.html
 *
 * Variáveis de ambiente necessárias:
 *   WP_URL          https://fabriciomoura.com
 *   WP_USER         usuário editor do WordPress
 *   WP_APP_PASSWORD senha de aplicativo (Settings > Application Passwords)
 */

import { readFileSync } from 'fs';

const [,, filePath] = process.argv;

if (!filePath) {
  console.error('Uso: node ferramentas/publicar.mjs blog/<slug>.html');
  process.exit(1);
}

const { WP_URL, WP_USER, WP_APP_PASSWORD } = process.env;

if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) {
  console.error('Erro: defina WP_URL, WP_USER e WP_APP_PASSWORD nas variáveis de ambiente.');
  process.exit(1);
}

const html = readFileSync(filePath, 'utf8');

// Extrai metadados do cabeçalho de comentário
const titleMatch     = html.match(/Título:\s*(.+)/);
const slugMatch      = html.match(/Slug:\s*(\S+)/);
const titleSeoMatch  = html.match(/Título SEO:\s*(.+)/);
const metaMatch      = html.match(/Meta:\s*([\s\S]+?)\n\s*Palavra-chave/);
const kwMatch        = html.match(/Palavra-chave foco:\s*(.+)/);

const wpTitle   = titleMatch?.[1]?.trim()    ?? 'Artigo sem título';
const slug      = slugMatch?.[1]?.trim()     ?? '';
const titleSeo  = titleSeoMatch?.[1]?.trim() ?? wpTitle;
const meta      = metaMatch?.[1]?.replace(/\s+/g, ' ').trim() ?? '';
const keyword   = kwMatch?.[1]?.trim()       ?? '';

// Extrai conteúdo entre os marcadores
const start = html.indexOf('<!-- INÍCIO DO POST -->');
const end   = html.indexOf('<!-- FIM DO POST -->');

if (start === -1 || end === -1) {
  console.error('Marcadores <!-- INÍCIO DO POST --> e <!-- FIM DO POST --> não encontrados.');
  process.exit(1);
}

const rawContent = html.slice(start + '<!-- INÍCIO DO POST -->'.length, end).trim();
// Wrap em bloco Gutenberg HTML para o WordPress não aplicar wpautop/wptexturize
const content = `<!-- wp:html -->\n${rawContent}\n<!-- /wp:html -->`;

console.log('\n== Publicando no WordPress ==');
console.log('Título :', wpTitle);
console.log('Slug   :', slug);
console.log('URL    :', WP_URL);

const credentials = Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');

const body = {
  title:   wpTitle,
  slug:    slug || undefined,
  status:  'publish',
  content,
  meta: {
    rank_math_title:            titleSeo,
    rank_math_description:      meta,
    rank_math_focus_keyword:    keyword,
  },
};

let response;
try {
  response = await fetch(`${WP_URL}/wp-json/wp/v2/posts`, {
    method: 'POST',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': `Basic ${credentials}`,
    },
    body: JSON.stringify(body),
  });
} catch (err) {
  console.error('Erro de rede ao conectar ao WordPress:', err.message);
  process.exit(1);
}

if (!response.ok) {
  const text = await response.text();
  console.error(`Erro HTTP ${response.status}:`, text);
  process.exit(1);
}

const post = await response.json();

console.log('\n✓ Publicado com sucesso!');
console.log('ID    :', post.id);
console.log('Link  :', post.link);
console.log('\nSlug            :', slug);
console.log('Título SEO      :', titleSeo);
console.log('Meta            :', meta);
console.log('Palavra-chave   :', keyword);
