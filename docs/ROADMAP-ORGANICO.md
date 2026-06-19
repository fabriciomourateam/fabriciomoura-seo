# Roadmap Orgânico — fabriciomoura.com

> Consolidado da **última varredura do Semrush (2026-06-19)** antes do cancelamento da assinatura.
> Dados brutos em `snapshots/2026-06-19.json`. Banco de keywords por tema lá dentro.
> Objetivo: somar tráfego ORGÂNICO ao pago (hoje 100% Google Ads). Site novo, autoridade baixa (AS 2),
> mas o concorrente nº1 (raphaelnutri, AS 11) é **100% orgânico** — dá pra competir com conteúdo.

## 1. A jogada central (o que o concorrente prova)
O raphaelnutri rankeia **um único post-pilar por intenção** e ele captura **dezenas de variações**:
- 1 post de Mounjaro+álcool → rankeia para `quem toma mounjaro pode beber` + cerveja, vinho, whisky,
  energético, café, coca zero... (20+ termos numa URL só).
- 1 post de arroz → `arroz engorda` + arroz branco, integral, "arroz ou feijão", "arroz ou macarrão"...
- 1 post de creatina → `creatina engorda` (vol **22.200**), creatina emagrece/define...

**Regra de ouro:** escrever **1 artigo-pilar profundo por tema**, cobrindo TODAS as variações (incluir
as perguntas reais como H2/FAQ). Não fatiar em vários posts rasos. As variações estão no snapshot.

## 2. Fila priorizada (volume × facilidade)
Ordem recomendada = maior oportunidade primeiro (alto volume + KDI baixo). KDI: 0-14 muito fácil · 15-29 fácil · 30-49 possível.

| # | Artigo / Página | KW foco | Vol/mês | KDI | Status |
|---|---|---|---|---|---|
| ✅ | 6 alimentos ricos em fibras | alimentos ricos em fibras | **49.500** | 29 | Publicado |
| ✅ | Déficit calórico | déficit calórico | 22.200/2.900 | 24 | Publicado |
| ✅ | Cardápio p/ quem toma Mounjaro | cardápio mounjaro | 1.000 | 8 | Publicado |
| 1 | **Gordura visceral** | gordura visceral | **22.200** | 22 | Próximo (kw já bancadas) |
| 2 | **Creatina engorda** (ampliar o existente) | creatina engorda | **22.200** | 26 | Artigo existe mirando vol 1.900 → reescrever p/ o de 22.200 |
| 3 | **Whey protein engorda** | whey protein engorda | 8.100 | 23 | A escrever |
| 4 | **Arroz engorda** (pilar) | arroz engorda | 6.600 | 30 | A escrever |
| 5 | **Pode beber tomando Mounjaro** (pilar do cluster) | quem toma mounjaro pode beber | 2.400 (+cluster) | 37 | A escrever |
| 6 | Como emagrecer (pilar topo) | como emagrecer | 12.100 | 32 | Opcional, mais difícil |
| 7 | Recomposição corporal | recomposição corporal | 720 | **21** | Fácil, volume menor |
| S1 | **Página Nutricionista Esportivo** | nutricionista esportivo | 5.400 | **10** | Quick win nº1 (guia pronto) |
| S2 | Página Nutricionista Online | nutricionista online | 6.600 | 28 | Guia pronto |

> As páginas de serviço (S1/S2) são **fundo de funil** (convertem em cliente) — prioridade alta junto com o conteúdo.

## 3. Ações fora de conteúdo (rápidas e valiosas)
1. **Disavow de backlinks tóxicos** (Google Search Console → Disavow Tool). Apareceram âncoras de spam
   apontando pro site (lojas de venda de backlink). Lista no snapshot, campo `backlinks_toxicos_para_disavow`:
   - `seo-high-ranking.shop`
   - `seoflox.com`
   - âncora "premium backlinks"
2. **Indexar tudo no GSC** (Inspeção de URL → Solicitar indexação) para cada post/página novo, e reenviar
   o `sitemap_index.xml`. Sem isso o conteúdo demora a aparecer.
3. **Daqui a ~3-4 semanas:** conferir no GSC quais termos já trazem impressão/clique e dobrar a aposta neles.

## 4. Métricas de referência (congeladas em 2026-06-19)
- fabriciomoura.com: AS **2**, **97** domínios ref., **264** backlinks, **2** kw orgânicas (só marca), tráfego orgânico **0**.
- raphaelnutri.com: AS **11**, **118** domínios ref., ~1.356 backlinks. Mesmo nº de domínios, mas mais links follow e MUITO mais conteúdo.
- Conclusão: **a diferença é conteúdo**, não link building. Cada pilar publicado encurta o gap.

## 5. Como continuar sem o Semrush
- Todo o volume/KDI/variações dos próximos ~7 artigos **já está bancado** em `snapshots/2026-06-19.json`
  e `snapshots/2026-06-17.json`. Dá pra escrever a fila inteira sem reabrir o Semrush.
- Para temas novos no futuro: usar o **Google Search Console** (dados reais de quem já chega no site),
  o autocomplete do Google e o "As pessoas também perguntam" como fonte de variações.
- O agente semanal (`docs/AGENTE-SEMANAL.md`) segue a fila acima.
