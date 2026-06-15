# Projeto SEO — Nutrição Esportiva (Fabrício Moura)

> **Documento vivo.** É atualizado a cada fase. Registra TODO o processo, os dados
> brutos e as queries exatas do Semrush, para que a análise possa ser **reproduzida
> e atualizada no futuro** (ex.: re-análise daqui a 4 meses).

- **Site:** fabriciomoura.com
- **Nicho:** Emagrecimento / nutrição esportiva — planos anuais (ticket R$ 1.800–2.600/ano)
- **Objetivo:** Dobrar o faturamento somando **tráfego orgânico** ao **tráfego pago** já existente
- **Ferramenta:** Semrush (conector MCP) · banco **br** (Brasil)
- **Fuso:** America/Sao_Paulo (BRT)
- **Dashboard:** a raiz do site → publicado na Vercel (preview da branch)
- **Dados:** `data.js` (fonte do dashboard) + `snapshots/*.json` (histórico bruto)

---

## Como atualizar / re-analisar no futuro

1. Reconectar o Semrush (precisa de plano com acesso MCP — o trial de 7 dias serviu para o diagnóstico inicial).
2. Re-rodar as **queries** da seção [Metodologia](#metodologia). Use sempre `database: "br"`.
3. Criar um novo arquivo `seo-analysis/snapshots/AAAA-MM-DD.json` com o resultado bruto.
4. Adicionar um novo objeto ao array `snapshots` em `public/seo-nutri/data.js` (o dashboard
   mostra sempre o último; manter os antigos permite comparar a evolução).
5. Registrar a nova fase aqui embaixo no [Histórico](#histórico-de-fases).
6. `git commit && git push` → a Vercel republica o dashboard automaticamente.

---

## Fases

| Fase | Nome | Status |
|---|---|---|
| 0 | Setup & diagnóstico | ✅ Concluída |
| 1 | Concorrentes & palavras-chave | ✅ Concluída |
| 2 | Calendário editorial 90 dias | ✅ Concluída |
| 3 | Análise do tráfego pago | ✅ Concluída |
| 4 | SEO técnico & on-page | 🔄 Em andamento |
| 5 | Funil & projeção de faturamento | ⏳ Pendente |
| 6 | Re-análise periódica | 🔁 Agendável |

---

## Histórico de fases

### Fase 0 — Setup & diagnóstico (2026-06-14)

- Conector Semrush ativado (trial 7 dias com MCP).
- **Diagnóstico do site:** `fabriciomoura.com` tem tráfego orgânico **≈ zero** — rankeia em apenas
  2 palavras de marca ("ivy moura" pos 50; "moura academia" pos 40). Nenhuma palavra comercial.
- No Google Ads o Semrush detecta atividade em **"emagrecimento rápido"** (vol 3.600, CPC R$ 0,15).
- **Leitura:** 100% do faturamento vem de pago + indicação + renovação. O canal orgânico é a
  maior oportunidade de margem (clique orgânico ≠ custo por lead; hoje o WhatsApp custa R$ 15,34).

### Fase 1 — Concorrentes & palavras-chave (2026-06-14)

**Top 3 concorrentes orgânicos** (SERP de "nutricionista esportivo", descartando diretórios
como Doctoralia/Instagram/Dietbox):

1. 🥇 **raphaelnutri.com** — a máquina de conteúdo; #2 em "nutricionista esportivo".
2. 🥈 **nutrijoaoortiz.com.br** — forte em SEO local ("nutricionista porto alegre" #4).
3. 🥉 **nutricionistalucasalves.com.br** — mais fraco, só "nutricionista esportista".

**5 palavras transacionais (fundo de funil):**

| Palavra | Volume/mês | CPC |
|---|---|---|
| nutricionista | 49.500 | R$ 0,47 |
| nutricionista online | 6.600 | R$ 0,56 |
| nutricionista esportivo | 5.400 | R$ 0,59 |
| nutricionista esportiva | 1.600 | R$ 0,59 |
| nutricionista esportivo perto de mim | 480 | R$ 0,52 |

**5 palavras de meio/fundo (comercial + informacional):**

| Palavra | Volume/mês | Funil |
|---|---|---|
| dieta / cardápio para quem toma mounjaro | 1.000+ | Comercial 🔥 |
| arroz engorda | 6.600 | Comercial |
| quem toma mounjaro pode beber | 2.400 | Informacional |
| creatina engorda ou emagrece | 1.900 | Comercial |
| dieta da selva funciona | 480 | Comercial |

> Nota: a coluna de intenção automática do Semrush não retornou neste export; a classificação
> de funil foi feita manualmente pelos termos (mais confiável em português).

### Fase 2 — Calendário editorial 90 dias (2026-06-14)

Engenharia reversa das páginas que mais geram tráfego no raphaelnutri:

| Página | % do tráfego | Keywords |
|---|---|---|
| 6 alimentos ricos em fibras | 34,22% | 78 |
| Gordura visceral | 17,25% | 18 |
| Home | 14,18% | 62 |
| Pode beber tomando Mounjaro | 11,82% | 78 |
| Comer arroz engorda | 8,33% | 65 |
| Cardápio para quem toma Mounjaro | 7,03% | 29 |
| Déficit calórico | 3,42% | 30 |
| Creatina engorda ou emagrece | 1,34% | 51 |

**Padrão vencedor:** artigos informacionais sobre comida/suplemento/Mounjaro, todos
funilando para "nutricionista online / agendar consulta". O calendário de 18 posts em
3 meses está em `data.js` (campo `calendario`) e renderizado no dashboard.

### Fase 3 — Análise do tráfego pago / PPC (2026-06-14)

Dados brutos em `snapshots/2026-06-14-ppc.json`; renderizados na aba **💸 Tráfego Pago** do dashboard.

**Achado central — o concorrente nº 1 não faz pago.** `domain_adwords` e `domain_adwords_unique`
para `raphaelnutri.com` retornaram **NOTHING FOUND**: ele cresce 100% no orgânico. O Fabrício é o
espelho oposto (100% pago). Cada um domina um canal — daí a tese de juntar os dois para dobrar.

**Footprint pago do Fabrício (`domain_adwords` em fabriciomoura.com):** o Semrush detecta **1 única
keyword paga**:

| Termo | Posição | Volume | CPC | Competição |
|---|---|---|---|---|
| emagrecimento rapido | 4 | 3.600 | R$ 0,15 | 1,00 (máxima) |

Ele investe ≈ R$ 22 mil/mês, mas o footprint rastreável é esse termo genérico, saturado e
desalinhado com o ticket premium. (Provável que o resto rode em Performance Max/branded, fora do
rastreio do Semrush — ainda assim, **não há captura dos termos de intenção do nicho**.)

**Termos-alvo (`phrase_these`) — o que custa e se ele compra:**

| Termo | Volume | CPC | Competição | Fabrício anuncia? |
|---|---|---|---|---|
| nutricionista | 49.500 | R$ 0,47 | 0,39 | ❌ |
| nutricionista online | 6.600 | R$ 0,56 | 0,87 | ❌ |
| nutricionista esportivo | 5.400 | R$ 0,59 | 0,68 | ❌ |
| nutricionista esportiva | 1.600 | R$ 0,59 | 0,68 | ❌ |
| emagrecimento rapido | 3.600 | R$ 0,15 | 1,00 | ✅ (único) |
| cardapio para quem toma mounjaro | 260 | R$ 0,18 | 0,08 | ❌ |

**Concorrentes de PAGO (`domain_adwords_adwords` em fabriciomoura.com)** — note que **não são** os
mesmos concorrentes do orgânico:

| Domínio | KW pagas | Tráfego pago | Observação |
|---|---|---|---|
| novocare.com.br | 119 | 11.141 | Anunciante pesado. Funil pago via calculadoras grátis (IMC, CPC R$ 0,01) → compra "nutricionista online" #1 (CPC R$ 0,60). |
| joaohenriquefelicio.com.br | 5 | 216 | Cirurgião bariátrico; disputa o MESMO "emagrecimento rapido" #1 do Fabrício. |
| clinicaevolv.com.br | 1 | 32 | Sobreposição direta, footprint mínimo. |

**Quem compra os termos de dinheiro (`phrase_adwords`):**
- *nutricionista online:* novocare (#1), drpandini, drthiagocollares, lpfnutrição, nutriroberta, dracamilahames.
- *nutricionista esportivo:* drpandini, ricardosantosnutricionista, nutrirodrigosousa, jaymecanetto, clinicagabrielli, carolinaragugnetti.

**Modelo de funil pago da novocare (`domain_adwords`)** — referência a copiar:

| Termo | Volume | CPC | Posição |
|---|---|---|---|
| calculo imc | 60.500 | R$ 0,01 | #1 |
| como calcular o imc | 22.200 | R$ 0,01 | #1 |
| como emagrecer | 8.100 | R$ 0,13 | #1 |
| nutricionista online | 5.400 | R$ 0,60 | #1 |
| peso ideal por altura | 9.900 | R$ 0,02 | #2 |

**Conclusões e recomendações:**
- **Oportunidade:** entrar no pago com termos de intenção (nutricionista online/esportivo, CPC
  R$ 0,56–0,59) — muito mais qualificados que "emagrecimento rapido".
- **Oportunidade:** copiar o modelo novocare (calculadora grátis como isca de topo a CPC ~R$ 0,01
  para alimentar remarketing barato).
- **Vazamento:** concentrar verba em "emagrecimento rapido" (competição 1,00, público milagreiro,
  competindo com cirurgia bariátrica) eleva o custo por lead qualificado. Negativar termos de
  cirurgia/bariátrica e de "solução milagrosa".

### Enriquecimento pré-Fase 4 — autoridade, KDI e site novo (2026-06-14)

Bruto em `snapshots/2026-06-14-autoridade-kdi.json`. Dados em `data.js` → snapshot `autoridade`.

**Autoridade / backlinks (`backlinks_overview`):**

| Domínio | Authority Score | Backlinks | Domínios ref. | Follow / Nofollow |
|---|---|---|---|---|
| fabriciomoura.com | 2 | 262 | 97 | 118 / 144 |
| raphaelnutri.com | 11 | 1.340 | 117 | 1.000 / 341 |

> Insight: a diferença **não** é de número de domínios referenciadores (97 ≈ 117). É volume/qualidade
> de links + conteúdo. **Conclusão: dá para competir com CONTEÚDO, sem campanha pesada de link building.**

**Dificuldade dos termos-alvo (`phrase_kdi`)** — escala 0-14 muito fácil · 15-29 fácil · 30-49 possível:

| Termo | KDI | Volume | Leitura |
|---|---|---|---|
| cardapio para quem toma mounjaro | 8 | 260 | Quick win |
| **nutricionista esportivo** | **10** | **5.400** | **Termo de dinheiro E fácil — começar por aqui** |
| creatina engorda ou emagrece | 15 | 1.900 | Quick win |
| nutricionista esportiva | 16 | 1.600 | Quick win |
| gordura visceral | 22 | — | Fácil |
| déficit calórico | 24 | — | Fácil |
| emagrecimento rapido | 27 | 3.600 | Fácil |
| nutricionista online | 28 | 6.600 | Fácil (prioridade comercial) |
| nutricionista | 28 | 49.500 | Fácil de KDI, mas SERP de marcas — longo prazo |
| arroz engorda | 30 | 6.600 | Possível |
| quem toma mounjaro pode beber | 37 | 2.400 | Possível (mais difícil do lote) |

**Site novo `time.fabriciomoura.com` (custom, rodando Ads há ~1 mês):** invisível no Semrush —
0 keywords orgânicas próprias e 0 backlinks (esperado com 1 mês). A página retornou HTTP 403 ao
crawler, então a auditoria on-page depende de acesso direto / analytics / Semrush Site Audit.
Repositório identificado: **`fabriciomourateam/meu-acompanhamento`** (TypeScript) — auditável por
código se adicionado ao escopo da sessão.

**Contexto de público (informado pelo cliente, 2026-06-14) — estratégico para a Fase 4:**
- Instagram: **63% mulheres / 37% homens**, mas converte muito pouco.
- Pacientes ativos (pagantes): **63% homens / 37% mulheres**, maioria vinda do **Google**.
- Conclusão: o Google é o canal que funciona; dobrar a aposta nele (SEO + Ads) é a decisão correta.
  Conteúdo/anúncios devem ter enquadramento **masculino / performance** (esporte, hipertrofia),
  o que reforça começar por **"nutricionista esportivo"** (KDI 10). O site novo foi desenhado para
  a audiência do Instagram (feminina) → possível descasamento com o comprador real (masculino/Google).

---

### Fase 4 — SEO técnico & on-page (em andamento, 2026-06-14)

Decisão do cliente: páginas de SEO ficam no **WordPress (fabriciomoura.com)** — concentra
autoridade no domínio que já fatura. Entregas em **HTML pronto pro Gutenberg** (bloco HTML
personalizado). Preço sempre escondido → CTA pro WhatsApp (+55 11 91484-9797). Identidade
preto `#080808` + amarelo `#F5C518`, fonte Inter (não foi possível ler o site direto: HTTP 403).

Calendário **reordenado por KDI** (quick wins primeiro):
1. ✅ `paginas/nutricionista-esportivo.html` — versão HTML standalone (referência/fallback).
   ✅ `paginas/nutricionista-esportivo.elementor.json` — **versão recomendada**: o próprio
   template Elementor do cliente com os textos reescritos para "nutricionista esportivo"
   (design, imagens, fontes e botões 100% preservados; FAQ adaptado). Importável direto no
   Elementor. Cliente usa Elementor para editar — esse é o fluxo definitivo das próximas páginas.
2. ✅ `ferramentas/calculadora.html` — isca de topo (IMC + gasto calórico), modelo novocare.
3. ⏳ Página "nutricionista online" (KDI 28, vol 6.600).
4. ⏳ Artigos quick win: "cardápio p/ quem toma Mounjaro" (KDI 8), "creatina engorda ou emagrece" (KDI 15).
5. ⏳ Site Audit técnico do WordPress (cliente já tem projeto no Semrush; Google Site Kit já plugado, sem dados ainda).

> Search Console: a propriedade estava **não verificada** (0 cliques/impressões no print). Cliente
> instalou o Google Site Kit em 2026-06-14 — dados reais devem aparecer em alguns dias.

### Fase 4 — execução premium + publicação (2026-06-15)

**Decisão de identidade:** após ver os prints reais do site, a identidade correta é **preto + ouro
(gradiente), fontes Anton (títulos) + Montserrat (texto)**, não Inter. Acabamento **premium** pedido
pelo cliente (efeito "uau"), **sem travessões** e sem padrões de IA no texto.

**Ativos produzidos (na identidade premium, full-bleed, FAQ schema, CTA WhatsApp):**
- ✅ `ferramentas/calculadora.html` — **PUBLICADA e indexada** em `/calculadora-de-imc-e-calorias`.
  IMC + gasto calórico (Mifflin-St Jeor), aviso músculo×gordura, meta de proteína, foto/credibilidade,
  texto de apoio + FAQ (Rank Math 76/100).
- ✅ `blog/cardapio-para-quem-toma-mounjaro.html` — artigo premium (KDI 8). Pronto para publicar como Post.
- ✅ `paginas/nutricionista-esportivo-GUIA.md` e `nutricionista-online-GUIA.md` — guias completos
  (de→para + campos de SEO + **estrutura técnica**: H1, FAQ schema, alt text, links internos).
- ✅ `paginas/nutricionista-esportivo-premium.html` — página de venda premium completa (referência).

**Decisão estratégica (página de serviço):** a página do cliente JÁ converte (CPA R$ 19). Em vez de
trocar, o caminho é **clonar a página de vendas no Elementor e embutir a estrutura de SEO** (H1 com
palavra-chave, H2, FAQ schema, alt, links internos) — mantém design/conversão/Elementor e os plugins.
A versão premium em HTML fica como referência (no bloco HTML não dá pra editar via Elementor).

**Infra configurada no WordPress/Google:**
- Search Console **verificado** (tag colada via Rank Math) → coletando dados.
- **Rank Math** instalado (title/meta/slug/schema). Site Kit plugado.
- Padrão de publicação: bloco **HTML personalizado** + Astra **Sidebar Nenhuma** + **Desativar título**;
  widget **full-bleed** (`width:100vw; margin-left:calc(50% - 50vw)`) para não sobrar barra branca.
- A fazer: enviar `sitemap_index.xml` no Search Console.

**Conta real de Google Ads (export do cliente, 15/05–13/06):** ver `trafego/brief-gestor-2026-06.md`.
CPA médio **R$ 19,31**, conta **eficiente** (desperdício ~1%). "nutricionista online" = 60% da verba a
R$ 19. Conclusão: o pago já está no teto da eficiência; a alavanca de crescimento é o **orgânico**.

> Estado dos entregáveis também versionado em `data.js` (campos `entregaveis`, `infra`, `conta_real_ads`)
> e visível na aba **✅ Entregáveis** do dashboard.

---

## Metodologia

Queries exatas executadas (reproduzir com `database: "br"`):

| Passo | Relatório Semrush | Parâmetros |
|---|---|---|
| Concorrentes orgânicos do site | `domain_organic_organic` | `{ domain: "fabriciomoura.com" }` |
| Palavras orgânicas do site | `domain_organic` | `{ domain: "fabriciomoura.com", display_sort: "tr_desc" }` |
| Palavras pagas (Ads) do site | `domain_adwords` | `{ domain: "fabriciomoura.com" }` |
| Quem rankeia no termo (SERP) | `phrase_organic` | `{ phrase: "nutricionista esportivo" }` |
| Métricas das palavras | `phrase_these` | `{ phrase: "nutricionista esportivo;nutricionista;..." }` |
| Palavras de um concorrente | `domain_organic` | `{ domain: "raphaelnutri.com", display_sort: "tr_desc" }` |
| Páginas que mais dão tráfego | `domain_organic_unique` | `{ domain: "raphaelnutri.com", display_sort: "tr_desc" }` |
| Palavras pagas de um concorrente | `domain_adwords` | `{ domain: "raphaelnutri.com", display_sort: "tr_desc" }` (Fase 3) |
| Concorrentes de pago do site | `domain_adwords_adwords` | `{ domain: "fabriciomoura.com" }` (Fase 3) |
| Cópias de anúncio | `domain_adwords_unique` | `{ domain: "raphaelnutri.com" }` (Fase 3) |
| Quem compra um termo no Ads | `phrase_adwords` | `{ phrase: "nutricionista online" }` (Fase 3) |
| CPC/competição de termos-alvo | `phrase_these` | `{ phrase: "nutricionista online;nutricionista esportivo;..." }` (Fase 3) |

**Próximas fases usarão:**
- `phrase_related` / `phrase_questions` para expandir clusters de conteúdo → Fase 4.

---

## Próximos passos

- [x] **Fase 3** — Palavras pagas dos concorrentes (CPC, anúncios) cruzadas com a conta atual. ✅
- [ ] **Fase 4** — SEO técnico/on-page e páginas de serviço.
- [ ] **Fase 5** — Funil orgânico+pago e projeção de faturamento.
