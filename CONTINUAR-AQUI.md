# 🚀 CONTINUAR AQUI — Projeto SEO Fabricio Moura

> **Para retomar num chat novo:** abra um chat do Claude Code apontando para o repositório
> `fabriciomourateam/fabriciomoura-seo` e cole o prompt abaixo. Ele dá todo o contexto.

## Prompt para colar no novo chat
```
Você está assumindo o projeto de SEO do fabriciomoura.com (nutrição esportiva / emagrecimento).
Leia, neste repositório: CONTINUAR-AQUI.md, HANDOFF.md, docs/PROCESSO.md, docs/AGENTE-SEMANAL.md e data.js.
Eles têm TODO o contexto, o que já foi feito e o que falta. O dashboard é o index.html (estático, lê data.js).
Regras inegociáveis: identidade preto + ouro (Anton + Montserrat), nada de travessões nem clichês de IA
(ver lista no AGENTE-SEMANAL.md), e tudo que envolver tempo é fuso de São Paulo (BRT).
Me diga o estado atual e os próximos passos, e siga de onde paramos.
```

---

## Resumo do projeto (1 parágrafo)
Cliente: Fabricio Moura (fabriciomoura.com), nutricionista esportivo, planos anuais (ticket ~R$ 2.000).
Faturamento vem 100% de Google Ads (conta eficiente, CPA ~R$ 19). Objetivo: **dobrar o faturamento somando
tráfego ORGÂNICO** (hoje zero) ao pago. Ferramenta de dados: Semrush (banco `br`). Site em WordPress + Elementor,
tema Astra, Rank Math (SEO), fundo do site preto.

## O que JÁ está feito
- **Fases 0–3 (Semrush):** diagnóstico, concorrentes, palavras-chave, calendário 90 dias, análise de tráfego pago.
  Achado-chave: concorrente nº1 (raphaelnutri) é 100% orgânico; "nutricionista esportivo" é KDI 10 (quick win).
- **Calculadora de IMC + Gasto Calórico:** PUBLICADA e indexada em `/calculadora-de-imc-e-calorias` (premium, dark/ouro).
- **Artigo "Cardápio para quem toma Mounjaro":** publicado como Post (`/cardapio-para-quem-toma-mounjaro`).
- **Artigo "Creatina engorda ou emagrece?":** pronto em `blog/creatina-engorda-ou-emagrece.html` (a publicar / via agente).
- **Páginas de serviço (guias prontos):** `paginas/nutricionista-esportivo-GUIA.md` e `nutricionista-online-GUIA.md`
  (clonar a página de vendas no Elementor + embutir SEO). Versão premium de referência: `paginas/nutricionista-esportivo-premium.html`.
- **Infra:** Google Search Console verificado (tag via Rank Math), Rank Math + Site Kit instalados, fundo do site preto,
  menu com **Calculadora** + **Conteúdo Semanal** (dropdown). Páginas dark usam Astra "Largura total esticada" + "Desativar título" + "Sem sidebar".
- **Agente semanal de conteúdo:** playbook em `docs/AGENTE-SEMANAL.md` (fila de artigos, regras, prompt, publicação via WP REST API).

## O que FALTA / próximos passos
1. **Publicar as 2 páginas de serviço** (nutricionista esportivo + online) pelos guias.
2. **Indexar** cada página/post nova no Search Console (Inspeção de URL → Solicitar indexação) + enviar `sitemap_index.xml`.
3. **Ativar o agente semanal automático:** criar a sessão agendada no Claude Code + variáveis de ambiente
   `WP_URL`, `WP_USER`, `WP_APP_PASSWORD` (usuário Editor dedicado já criado). Detalhes no AGENTE-SEMANAL.md.
4. **Astra (uma vez):** Personalizar → Blog → Post único → Desativar título + Sem sidebar (pro auto-post nascer dark).
5. **Daqui a alguns dias:** puxar dados reais do Search Console (palavras que trazem clique) e refinar a estratégia.
6. **Pago (com o gestor):** testar message match (apontar "nutricionista online/esportivo" pras páginas dedicadas). Ver `trafego/brief-gestor-2026-06.md`.

## ⏰ Como deixar o conteúdo AUTOMÁTICO (agendar o agente semanal)
A esteira já está pronta; falta só criar a sessão agendada (isso é feito no painel do Claude Code na web — o assistente não agenda sozinho).

**Passo a passo (uma vez):**
1. No **Claude Code (web)**, com este repositório aberto (`fabriciomourateam/fabriciomoura-seo`), crie uma
   **sessão agendada / recorrente** (ex.: toda segunda 09:00 BRT). É o recurso de *scheduled sessions / triggers*
   do Claude Code on the web — ver https://code.claude.com/docs/en/claude-code-on-the-web.
2. **Prompt da sessão** (cole isto):
   > Você é o agente semanal de conteúdo do fabriciomoura.com. Leia `docs/AGENTE-SEMANAL.md`, `data.js` e
   > `blog/gordura-visceral.html` (template). Pegue o PRIMEIRO artigo não marcado da fila, escreva seguindo
   > TODAS as regras de estilo, salve em `blog/<slug>.html`, publique via `node ferramentas/publicar.mjs blog/<slug>.html`,
   > atualize a fila (`docs/AGENTE-SEMANAL.md`) e o `data.js`, e faça commit/push na `main`. Me entregue o link publicado.
3. **Variáveis de ambiente** já configuradas neste ambiente (a publicação funciona): `WP_URL`, `WP_USER`, `WP_APP_PASSWORD`.
   Se criar um ambiente novo, defina-as de novo (nunca no repositório nem no chat).
4. Cada execução publica **1 artigo** da fila e marca como concluído. Fila atual (prioridade) em `docs/AGENTE-SEMANAL.md`:
   whey protein engorda → arroz engorda (pilar) → pode beber tomando Mounjaro (pilar) → como emagrecer → recomposição corporal.
5. Keywords dos próximos já bancadas em `snapshots/2026-06-19.json` (não precisa de Semrush para escrever).

> Observação: a publicação no WordPress é via REST API (`ferramentas/publicar.mjs`) e o dashboard na Vercel
> republica sozinho a cada push na `main`. Então, uma vez agendado, roda ponta a ponta sem intervenção.

## Regras inegociáveis (estilo e técnica)
- **Identidade:** preto + ouro (gradiente `#FFE9A8→#FCD404→#C9920A`), fontes **Anton** (títulos) + **Montserrat** (texto).
- **Sem travessões (—)** e **sem clichês de IA** (lista de frases proibidas no AGENTE-SEMANAL.md).
- **Padrão WordPress:** bloco "HTML personalizado", `@import` das fontes no `<style>`, fundo do site preto,
  Astra "Largura total esticada" + "Desativar título". **Não** usar truque full-bleed (width:100vw) por causa da barra de rolagem.
- **JS resiliente ao Autoptimize:** sem `onclick` inline; usar `addEventListener` dentro de `DOMContentLoaded`.
- **WhatsApp:** `+5511914849797`. **Fuso:** America/Sao_Paulo (BRT).
- **Dados:** tudo do Semrush (banco `br`); nunca inventar número. Snapshots são append-only.

## Mapa do repositório
- `index.html` + `data.js` → dashboard (aba "Entregáveis" mostra o status).
- `HANDOFF.md`, `docs/PROCESSO.md` → contexto e histórico fase a fase.
- `docs/AGENTE-SEMANAL.md` → playbook do agente de conteúdo.
- `ferramentas/calculadora.html` → calculadora.
- `blog/*.html` → artigos.
- `paginas/*` → páginas de serviço (guias + premium + elementor json).
- `trafego/brief-gestor-2026-06.md` → análise da conta de Ads.
- `snapshots/*.json` → dados brutos do Semrush.
