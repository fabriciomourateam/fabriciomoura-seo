/**
 * Volta posts do WordPress para RASCUNHO (não apaga). Uso pela Action "Despublicar posts no WordPress".
 * Motivo (24/10/2026): o site novo (Next) repassa /wp-json, /feed e os sitemaps .xml para o WordPress;
 * posts de Masteron/Retatrutida publicados lá fizeram o Google Ads reprovar os anúncios
 * ("Substâncias não aprovadas", destino Masteron).
 */
const { WP_URL, WP_USER, WP_APP_PASSWORD, SLUGS } = process.env;
if (!WP_URL || !WP_USER || !WP_APP_PASSWORD) { console.error('❌ Faltam segredos WP_URL/WP_USER/WP_APP_PASSWORD'); process.exit(1); }
const base = WP_URL.replace(/\/+$/, '');
const auth = 'Basic ' + Buffer.from(`${WP_USER}:${WP_APP_PASSWORD}`).toString('base64');
const slugs = (SLUGS || '').split(/[\s,]+/).filter(Boolean);
async function f(url, opts = {}, tries = 4) {
  for (let i = 1; ; i++) {
    try { return await fetch(url, { ...opts, headers: { Authorization: auth, 'Content-Type': 'application/json', ...(opts.headers || {}) } }); }
    catch (e) { if (i >= tries) throw e; await new Promise((r) => setTimeout(r, i * 2500)); }
  }
}
let erro = false;
for (const slug of slugs) {
  const r = await f(`${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&status=any&_fields=id,slug,status`);
  if (!r.ok) { console.error(`❌ ${slug}: busca HTTP ${r.status} ${await r.text()}`); erro = true; continue; }
  const arr = await r.json();
  if (!arr.length) { console.log(`· ${slug}: não existe no WordPress`); continue; }
  for (const p of arr) {
    if (p.status !== 'publish') { console.log(`· ${slug} (id ${p.id}): já está ${p.status}`); continue; }
    const u = await f(`${base}/wp-json/wp/v2/posts/${p.id}`, { method: 'POST', body: JSON.stringify({ status: 'draft' }) });
    const j = await u.json().catch(() => ({}));
    if (u.ok && j.status === 'draft') console.log(`✅ ${slug} (id ${p.id}): publish → draft`);
    else { console.error(`❌ ${slug} (id ${p.id}): HTTP ${u.status} ${JSON.stringify(j).slice(0, 300)}`); erro = true; }
  }
}
// conferência pública: nada disso pode aparecer na API pública
for (const slug of slugs) {
  const r = await fetch(`${base}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}&_fields=slug,status`);
  const arr = r.ok ? await r.json() : [];
  console.log(`🔎 público ${slug}: ${arr.length ? 'AINDA PUBLICADO' : 'fora'}`);
  if (arr.length) erro = true;
}
process.exit(erro ? 1 : 0);
