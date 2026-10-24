/**
 * Tira menções a Mounjaro/GLP-1 das PÁGINAS do WordPress (sobre, termos, links, calculadora).
 * Uso pela Action "Limpar páginas do WordPress". APLICAR=1 grava; sem isso só mostra o que faria.
 * Motivo (24/10/2026): o site novo repassa /wp-json para o WordPress, e o revisor do Google Ads
 * avalia o domínio inteiro ("Substâncias não aprovadas" / "medicamentos restritos").
 * O WordPress guarda revisão de página: dá para voltar pelo painel se precisar.
 */
import { termosProibidos } from './temas-proibidos.mjs';
const { WP_URL, WP_USER, WP_APP_PASSWORD, APLICAR } = process.env;
if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) { console.error('❌ Faltam segredos WP_URL/WP_USER/WP_APP_PASSWORD'); process.exit(1); }
const base = WP_URL.replace(/\/+$/, '');
const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
const aplicar = APLICAR === '1' || APLICAR === 'true';

// id da página → trocas (regex → texto novo)
const PAGINAS = {
  1100: { nome: 'termos-de-uso', trocas: [[/\s*\(como Mounjaro\/tirzepatida e outros an[aá]logos de GLP-1\)/gi, '']] },
  1072: { nome: 'sobre', trocas: [
    [/,\s*incluindo acompanhamento de pacientes em uso de an[aá]logos de GLP-1 como o Mounjaro \(tirzepatida\)/gi, ''],
    [/\s*<p>\s*Especialidade em acompanhamento nutricional de pacientes em uso de Mounjaro[^<]*<\/p>/gi, ''],
  ] },
  1049: { nome: 'links', trocas: [
    [/\{[^{}]*cardapio-para-quem-toma-mounjaro[^{}]*\}\s*,\s*/gi, ''],
    [/,\s*\{[^{}]*cardapio-para-quem-toma-mounjaro[^{}]*\}/gi, ''],
  ] },
  695: { nome: 'calculadora', trocas: [[/\s*E se voc[eê] usa medica[cç][aã]o para emagrecer,[^<]*<a[^>]*mounjaro[^>]*>[^<]*<\/a>\.?/gi, '']] },
};
// termos que só contam como problema nestas páginas (testosterona etc. não aparecem aqui)
const VIGIAR = (t) => termosProibidos(t).filter((x) => !['tpc', 'hcg', 'dnp', 'trt', 'sarm'].includes(x));

async function f(url, opts = {}, tries = 4) {
  for (let i = 1; ; i++) {
    try { return await fetch(url, { ...opts, headers: { Authorization: auth, 'Content-Type': 'application/json', ...(opts.headers || {}) } }); }
    catch (e) { if (i >= tries) throw e; await new Promise((r) => setTimeout(r, i * 2500)); }
  }
}
let erro = false;
for (const [id, cfg] of Object.entries(PAGINAS)) {
  const r = await f(`${base}/wp-json/wp/v2/pages/${id}?context=edit&_fields=id,slug,content`);
  if (!r.ok) { console.error(`❌ ${cfg.nome}: HTTP ${r.status}`); erro = true; continue; }
  const p = await r.json();
  const antes = p.content.raw;
  let depois = antes;
  for (const [re, novo] of cfg.trocas) depois = depois.replace(re, novo);
  const resta = VIGIAR(depois);
  console.log(`\n== ${cfg.nome} (id ${id}): ${antes.length} → ${depois.length} caracteres; antes: [${VIGIAR(antes).join(', ')}]; depois: [${resta.join(', ')}]`);
  if (resta.length) { console.error(`⛔ ${cfg.nome}: ainda sobra termo, NÃO gravei.`); erro = true; continue; }
  if (cfg.nome === 'links') {
    // o conteúdo tem um JSON embutido: confere que nada quebrou (mesma quantidade de { e })
    const conta = (s, c) => s.split(c).length;
    if (conta(depois, '{') - conta(depois, '}') !== conta(antes, '{') - conta(antes, '}')) { console.error('⛔ links: chaves desbalanceadas, NÃO gravei.'); erro = true; continue; }
  }
  if (antes === depois) { console.log('· nada a mudar'); continue; }
  if (!aplicar) { console.log('🟡 simulação: não gravei (rode com aplicar=true)'); continue; }
  const u = await f(`${base}/wp-json/wp/v2/pages/${id}`, { method: 'POST', body: JSON.stringify({ content: depois }) });
  if (u.ok) console.log('✅ gravado'); else { console.error(`❌ HTTP ${u.status} ${(await u.text()).slice(0, 300)}`); erro = true; }
}
// conferência pública
if (aplicar) {
  const s = await fetch(`${base}/wp-json/wp/v2/search?search=mounjaro&per_page=50`);
  const arr = s.ok ? await s.json() : [];
  console.log(`\n🔎 busca pública "mounjaro": ${arr.length} resultado(s) ${arr.map((x) => x.url).join(' ')}`);
  if (arr.length) erro = true;
}
process.exit(erro ? 1 : 0);
