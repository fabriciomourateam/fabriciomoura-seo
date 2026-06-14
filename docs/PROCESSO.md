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
| 3 | Análise do tráfego pago | ⏳ Pendente |
| 4 | SEO técnico & on-page | ⏳ Pendente |
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

**Próximas fases usarão:**
- `domain_adwords` / `domain_adwords_adwords` nos 3 concorrentes → Fase 3 (tráfego pago).
- `phrase_related` / `phrase_questions` para expandir clusters de conteúdo.

---

## Próximos passos

- [ ] **Fase 3** — Analisar palavras pagas dos concorrentes (CPC, anúncios) e cruzar com a conta atual.
- [ ] **Fase 4** — SEO técnico/on-page e páginas de serviço.
- [ ] **Fase 5** — Funil orgânico+pago e projeção de faturamento.
