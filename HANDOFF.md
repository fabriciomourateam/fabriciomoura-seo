# HANDOFF — Projeto SEO Nutrição Esportiva (Fabrício Moura)

> **Leia este arquivo primeiro.** Ele dá TODO o contexto para continuar o projeto sem
> depender de nenhuma conversa anterior. Detalha o que já foi feito (Fases 0–3), onde os
> dados estão, e exatamente o que fazer a seguir (Fase 4 em diante).

---

## ✅ Definition of Done — rodar ANTES de todo push (não pule)

Toda entrega de fase só está completa quando estes 5 passos foram feitos, **nesta ordem**:

1. [ ] **`data.js`** — números/achados no snapshot mais recente + campo `fases` atualizado.
2. [ ] **`snapshots/AAAA-MM-DD-*.json`** — dump bruto das queries do Semrush (append-only).
3. [ ] **`docs/PROCESSO.md`** — histórico da fase + tabelas + queries exatas (reprodutível).
4. [ ] **`HANDOFF.md`** — marcar fase concluída + apontar o próximo passo.
5. [ ] **`git commit && git push`** na `main` → Vercel republica.

> Regra de ouro dos dados: **nunca invente número** — tudo vem do Semrush (banco `br`). Snapshots
> são append-only (nunca apague os antigos; são o histórico de evolução).

---

## 0. Contexto do projeto

- **Cliente:** Fabrício Moura — site `fabriciomoura.com`
- **Nicho:** Emagrecimento / nutrição esportiva. Vende **planos anuais** (ticket R$ 1.800–2.600/ano).
- **Faturamento atual:** > R$ 150.000 (somando Google Ads + indicação + renovação).
- **Tráfego pago:** 100% Google Ads. ~R$ 22.000/mês (R$ 5.094 na semana reportada).
  - Relatório-base (25–31/05/2026): 332 cliques no WhatsApp, custo R$ 15,34/conversa,
    44.498 impressões, 2.307 cliques, CTR 5,18%, taxa de conversão 14,27%, topo geral 72,16%.
- **Objetivo macro:** **dobrar o faturamento** somando **tráfego orgânico** (hoje zero) ao pago.
- **Ferramenta de dados:** Semrush via conector MCP. **Banco sempre `br`** (Brasil).
  - ⚠️ O acesso MCP do Semrush exige plano específico. O diagnóstico inicial foi feito num
    **trial de 7 dias com MCP**. Se o trial expirou, reconectar/assinar antes de re-rodar queries.

---

## 1. Estrutura deste repositório

```
.
├── index.html              # Dashboard (lê ./data.js). Site estático, sem build.
├── data.js                 # FONTE ÚNICA DE DADOS — tudo que o dashboard mostra. Editar aqui.
├── HANDOFF.md              # (este arquivo)
├── README.md               # Como publicar/atualizar
├── docs/
│   └── PROCESSO.md          # Documentação viva, fase a fase + metodologia (queries)
└── snapshots/
    └── 2026-06-14.json      # Registro bruto do Semrush (histórico para comparação)
```

Publicação: Vercel → importar repo → Framework **Other** (estático) → Deploy. Cada push republica.

---

## 2. O que já foi feito (status: Fases 0, 1, 2 e 3 CONCLUÍDAS)

### Fase 0 — Diagnóstico
- `fabriciomoura.com` tem tráfego orgânico **≈ ZERO** (só 2 keywords de marca, pos. 40–50).
- No Google Ads aparece em **"emagrecimento rápido"** (vol 3.600, CPC R$ 0,15).
- **Conclusão:** orgânico é canal 100% intocado = maior alavanca de margem.

### Fase 1 — Concorrentes + palavras-chave
**Top 3 concorrentes orgânicos** (SERP de "nutricionista esportivo", sem diretórios):
1. 🥇 **raphaelnutri.com** — máquina de conteúdo; #2 em "nutricionista esportivo". MODELO A COPIAR.
2. 🥈 **nutrijoaoortiz.com.br** — forte em SEO local ("nutricionista porto alegre" #4).
3. 🥉 **nutricionistalucasalves.com.br** — fraco; só "nutricionista esportista".

**5 transacionais:** nutricionista (49.500 / R$0,47) · nutricionista online (6.600 / R$0,56) ·
nutricionista esportivo (5.400 / R$0,59) · nutricionista esportiva (1.600 / R$0,59) ·
nutricionista esportivo perto de mim (480 / R$0,52).

**5 meio/fundo:** cardápio/dieta para quem toma mounjaro (1.000+ 🔥) · arroz engorda (6.600) ·
quem toma mounjaro pode beber (2.400) · creatina engorda ou emagrece (1.900) ·
dieta da selva funciona (480).

### Fase 2 — Calendário editorial 90 dias
Engenharia reversa das páginas que mais geram tráfego do raphaelnutri (campeãs: "6 alimentos
ricos em fibras" 34%, "gordura visceral" 17%, "pode beber tomando Mounjaro" 12%, "arroz
engorda" 8%). Calendário de 18 posts em `data.js` (campo `calendario`).
**Padrão vencedor:** artigos informacionais (comida/suplemento/Mounjaro) que funilam para
"nutricionista online / agendar consulta".

> Todos os números, tabelas e o calendário completo estão em `data.js` e `docs/PROCESSO.md`.
> O snapshot bruto do Semrush está em `snapshots/2026-06-14.json`.

### Fase 3 — Análise do tráfego pago (PPC) ✅ CONCLUÍDA
- **Achado central:** o concorrente nº 1 (raphaelnutri.com) **não veicula um único anúncio** —
  máquina 100% orgânica. O Fabrício é o espelho oposto (100% pago).
- **Footprint pago do Fabrício no Semrush = 1 termo só:** "emagrecimento rapido" (CPC R$ 0,15,
  competição máxima 1,00), genérico e desalinhado com o ticket premium.
- **Termos de intenção (nutricionista online R$ 0,56, esportivo R$ 0,59) ele NÃO compra** —
  oportunidade barata e qualificada.
- **Concorrentes de PAGO** (≠ do orgânico): novocare.com.br (anunciante pesado, modelo de funil
  via calculadora de IMC a CPC R$ 0,01), joaohenriquefelicio (cirurgião comprando o mesmo
  "emagrecimento rapido"), clinicaevolv.
- Tudo na aba **💸 Tráfego Pago** do dashboard (`data.js` → snapshot `ppc`) e em
  `snapshots/2026-06-14-ppc.json`. Detalhes e tabelas em `docs/PROCESSO.md`.

---

## 3. ESTADO ATUAL — Fase 4 em execução (atualizado 2026-06-15)

**Identidade premium definida:** preto + ouro (gradiente), fontes **Anton** (títulos) + **Montserrat**
(texto). Acabamento premium, **sem travessões**. Padrão de publicação: bloco **HTML personalizado** no
WordPress + Astra **Sidebar Nenhuma** + **Desativar título**; widgets **full-bleed**.

**Já entregue (ver `data.js` → `entregaveis` e aba ✅ Entregáveis do dashboard):**
- ✅ **Calculadora** (`ferramentas/calculadora.html`) — PUBLICADA e indexada em `/calculadora-de-imc-e-calorias`.
- ✅ **Artigo Mounjaro** (`blog/cardapio-para-quem-toma-mounjaro.html`) — pronto, falta publicar como Post.
- ✅ **Guias completos** das 2 páginas de serviço (`paginas/*-GUIA.md`) — de→para + estrutura técnica de SEO.
- ✅ **Página premium de referência** (`paginas/nutricionista-esportivo-premium.html`).

**Infra:** Search Console **verificado** (tag via Rank Math), Rank Math + Site Kit instalados. Falta enviar
`sitemap_index.xml`. Conta real de Ads analisada (CPA R$ 19, eficiente) em `trafego/brief-gestor-2026-06.md`.

**A fazer agora (pelo cliente, no WordPress):** publicar o artigo do Mounjaro; montar as páginas
"nutricionista esportivo" e "nutricionista online" pelos guias (clonar a página de vendas no Elementor +
embutir SEO); enviar sitemap; colocar tudo no menu. Em alguns dias: puxar dados do Search Console para refino.

---

## 3b. Referência da Fase 4 — objetivo e queries

Objetivo: estruturar o site para capturar a demanda mapeada — criar páginas de serviço
("nutricionista online", "nutricionista esportivo") e clusters de conteúdo otimizados para
converter o tráfego (orgânico + pago) em consulta agendada.

**Queries Semrush úteis (banco `br`):**

| Passo | Relatório | Parâmetros |
|---|---|---|
| Expandir clusters de conteúdo | `phrase_related` | `{ database:'br', phrase:'nutricionista online' }` |
| Perguntas que o público faz | `phrase_questions` | `{ database:'br', phrase:'mounjaro' }` |
| Variações de um termo | `phrase_fullsearch` | `{ database:'br', phrase:'nutricionista esportivo' }` |
| Dificuldade de ranquear | `phrase_kdi` | `{ database:'br', phrase:'nutricionista online;...' }` |

**Como entregar a próxima fase (padrão deste projeto):**
1. Rodar as queries acima (banco `br`) e salvar o bruto em `snapshots/AAAA-MM-DD-*.json`.
2. Acrescentar os achados ao snapshot mais recente em `data.js` (ou novo snapshot) — nunca apagar.
3. Criar/atualizar a aba correspondente no dashboard (`index.html`, `TABS` + `VIEWS`).
4. Atualizar `docs/PROCESSO.md` e o campo `fases` de `data.js`.
5. `git commit && git push` → Vercel republica.

---

## 4. Fases seguintes (planejadas)

- **Fase 4 — SEO técnico & on-page:** estrutura do site, criar páginas de serviço
  ("nutricionista online", "nutricionista esportivo") e otimizar para conversão.
  Queries úteis: `phrase_related`, `phrase_questions` (expandir clusters de conteúdo).
- **Fase 5 — Funil & projeção:** amarrar orgânico+pago no funil e projetar o caminho até dobrar
  o faturamento (tráfego × conversão × ticket × recompra).
- **Fase 6 — Re-análise periódica:** re-rodar tudo, adicionar snapshot, comparar evolução.

---

## 5. Regras importantes ao continuar

- **Fuso horário:** sempre America/Sao_Paulo (BRT, UTC-3) para qualquer coisa de tempo.
- **Dados reais:** nunca invente números — tudo vem do Semrush. Se o MCP não estiver disponível,
  avise o cliente em vez de chutar.
- **Snapshots são append-only:** nunca apague snapshots antigos de `data.js`/`snapshots/` —
  eles são o histórico que mostra evolução ao longo do tempo.
- **Classificação de intenção:** a coluna automática do Semrush não retornou nos exports; a
  classificação de funil (topo/meio/fundo) foi feita manualmente pelos termos.

---

## 6. Prompt para colar no novo chat (kickoff)

```
Você está assumindo o projeto de SEO do fabriciomoura.com (nutrição esportiva / emagrecimento).
Leia HANDOFF.md, docs/PROCESSO.md e data.js neste repositório — eles contêm todo o contexto e os
dados já coletados (Fases 0, 1 e 2 concluídas: diagnóstico, concorrentes, palavras-chave e
calendário editorial). O dashboard é o index.html (estático, lê data.js) publicado na Vercel.

Continue da Fase 3 (análise de tráfego pago) usando o conector Semrush (banco 'br'), seguindo
exatamente a seção 3 do HANDOFF. Ao terminar: adicione um novo snapshot em data.js, crie a aba
"Tráfego Pago" no dashboard, atualize docs/PROCESSO.md, e faça commit + push.
```
