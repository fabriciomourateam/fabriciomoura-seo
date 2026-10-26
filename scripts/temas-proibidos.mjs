/**
 * temas-proibidos.mjs: trava de temas que NÃO podem ser publicados no fabriciomoura.com.
 *
 * Por quê (24/10/2026): um artigo de Masteron no blog fez o Google Ads reprovar os anúncios do
 * domínio inteiro ("Substâncias não aprovadas") e o Google quase parou. Medicamentos de receita
 * (Mounjaro, Ozempic etc.) também limitam anúncios ("medicamentos restritos").
 * Regra do Fabricio: esses temas só podem ir para um DOMÍNIO SEPARADO, nunca para o principal.
 *
 * Usada em: seo-auto-run.mjs (pula o tópico e confere o texto gerado), publish-to-site.mjs e
 * publish-to-wp.mjs (última barreira antes de enviar). Para liberar um termo, edite a lista abaixo.
 * Desde 26/10 QUALQUER tema de hormônio (inclusive testosterona natural/andropausa) trava: vai só pro blog separado.
 */
const TERMOS = [
  // anabolizantes e afins
  'anabolizante', 'anabolizantes', 'esteroide', 'esteroides', 'esteróide', 'esteróides',
  'masteron', 'drostanolona', 'deca durabolin', 'deca-durabolin', 'nandrolona', 'durateston',
  'trt', 'reposição hormonal',
  // hormônios em geral (pedido do Fabricio 26/10: NADA de hormônio no site principal)
  'testosterona', 'andropausa', 'hormonio', 'hormonios', 'hormônio', 'hormônios', 'hormonal', 'hormonais',
  'estrogenio', 'estrogênio', 'progesterona', 'cortisol', 'oxandrolona', 'stanozolol', 'winstrol',
  'trembolona', 'boldenona', 'hemogenin', 'oximetolona', 'dianabol', 'metandrostenolona',
  'clembuterol', 'sarm', 'sarms', 'ostarina', 'ligandrol', 'somatropina', 'hormônio do crescimento',
  'pós-ciclo', 'pos-ciclo', 'pós ciclo', 'tpc', 'tamoxifeno', 'clomifeno', 'hcg',
  // medicamentos para emagrecer (receita / não aprovados)
  'mounjaro', 'ozempic', 'wegovy', 'saxenda', 'tirzepatida', 'semaglutida', 'liraglutida',
  'retatrutida', 'glp-1', 'glp1', 'caneta emagrecedora', 'canetas emagrecedoras',
  'sibutramina', 'efedrina', 'dnp',
];

const semAcento = (s) => (s || '').toString().normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const REGRAS = [...new Set(TERMOS.map(semAcento))].map((t) => ({
  termo: t,
  re: new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}($|[^a-z0-9])`),
}));

/** Lista os termos proibidos encontrados no texto (ignora acento e maiúsculas). */
export function termosProibidos(texto) {
  const t = semAcento(texto);
  return REGRAS.filter((r) => r.re.test(t)).map((r) => r.termo);
}

/** Encerra o processo (sem publicar) se o texto tiver termo proibido. */
export function travarSeProibido(texto, onde = 'artigo') {
  const achados = termosProibidos(texto);
  if (achados.length) {
    console.error(`⛔ ${onde} tem tema proibido no fabriciomoura.com: ${achados.join(', ')}.`);
    console.error('   Esses temas só podem ir para o domínio separado (risco de reprovar o Google Ads). Nada foi publicado.');
    process.exit(1);
  }
}
