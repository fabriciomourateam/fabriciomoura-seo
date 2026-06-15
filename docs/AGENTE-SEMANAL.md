# Agente semanal de conteúdo — playbook

> Objetivo: publicar **1 artigo de blog por semana** no fabriciomoura.com, no padrão premium,
> alimentando o canal orgânico de forma contínua. Este arquivo diz ao agente exatamente o que fazer.

## Como agendar (no Claude Code web)
Crie uma **sessão agendada** (semanal, ex.: segunda 09:00 BRT) apontando para o repositório
`fabriciomourateam/fabriciomoura-seo` com o prompt da seção "Prompt da sessão" abaixo.

## Fila de artigos (do calendário da Fase 2, priorizada por KDI = mais fácil primeiro)
Marcar `[x]` ao concluir. O agente pega o **primeiro item não marcado**.
- [x] Cardápio para quem toma Mounjaro (KDI 8) — publicado
- [x] Creatina engorda ou emagrece? (KDI 15) — pronto (`blog/creatina-engorda-ou-emagrece.html`)
- [ ] Nutricionista esportiva (variação) / "o que faz" (KDI 16)
- [ ] Gordura visceral: o que é e como reduzir (KDI 22)
- [ ] Déficit calórico: a única forma de emagrecer (KDI 24)
- [ ] Arroz engorda? (KDI 30, vol 6.600)
- [ ] Quem toma Mounjaro pode beber? (KDI 37, vol 2.400)
- [ ] 6 alimentos ricos em fibras para emagrecer
- [ ] Whey protein engorda? Mitos e verdades
- [ ] Recomposição corporal: perder gordura e ganhar músculo
> Fonte completa: campo `calendario` em `data.js`.

## Regras de estilo (OBRIGATÓRIAS)
- **Identidade:** preto + ouro (gradiente `#FFE9A8→#FCD404→#C9920A`), fontes **Anton** (títulos) +
  **Montserrat** (texto). Use `blog/cardapio-para-quem-toma-mounjaro.html` como TEMPLATE de referência.
- **Sem travessões (—)** e **sem cara de IA**.
- **FRASES PROIBIDAS** (clichê de IA, nunca usar em título, H1, H2 ou texto):
  "a verdade que ninguém te conta", "o que ninguém te conta", "o segredo que", "você não vai acreditar",
  "isso vai mudar sua vida/tudo", "prepare-se para", "descubra o segredo", "imagine só", "vamos mergulhar",
  "neste artigo você vai aprender", "não é X, é Y" (repetido). Escreva como um profissional humano falaria,
  direto e específico.
- Estrutura: hero com badge + H1 (palavra-chave, 1 termo em dourado) + subtítulo; **card de autor no topo**
  (foto + "Por Fabricio Moura · Leitura de X min" + "Nutricionista e Treinador" + bio + botão WhatsApp);
  corpo com H2 (Montserrat), pull-quote, cards; **FAQ + FAQPage JSON-LD**; CTA final com foto ao lado;
  **links internos** (calculadora `/calculadora-de-imc-e-calorias` + páginas de serviço); aviso responsável
  quando for tema de saúde/medicação.
- **WhatsApp:** `+5511914849797`. **@import** das fontes dentro do `<style>`.
- **NÃO** usar truque full-bleed (width:100vw). No WordPress a página usa Astra "Largura total esticada"
  + fundo do site preto. O widget é só `background` escuro.
- Imagens reais disponíveis: foto de rosto `…/2026/06/Screenshot_20260322_192920_Canva1-scaled.jpg`,
  transformações `…/2024/10/1-1.png … 9-1.png`, capa `…/2024/06/Design-sem-nome-15-e1781459644476.png`.

## Metadados de publicação (OBRIGATÓRIO em TODO artigo)
Todo `blog/<slug>.html` DEVE começar com um comentário de cabeçalho com as instruções e os
metadados prontos, no mesmo formato dos artigos Mounjaro e Creatina. Sem isso o artigo não está pronto.
```html
<!--
  PUBLICAR NO WORDPRESS (como POST):
  1. Publicações (Posts) > Adicionar novo.
  2. Título: <título do post>
  3. Bloco "HTML personalizado" > cole tudo entre INÍCIO DO POST e FIM DO POST.
  4. Astra: Sidebar = Nenhuma + Desativar título.
  5. Rank Math:
     Slug: <slug-em-minusculas-com-hifens>
     Título SEO: <título> | Fabricio Moura   (até ~60 caracteres)
     Meta: <descrição com a palavra-chave, até ~155 caracteres>
     Palavra-chave foco: <palavra-chave exata da fila>
  6. Defina imagem destacada (capa) e publique. Adicione no menu "Conteúdo Semanal".
  7. Search Console > Inspeção de URL > Solicitar indexação.
-->
```
Regras dos metadados: **slug** = palavra-chave em minúsculas com hífens (sem acento); **Título SEO**
termina em `| Fabricio Moura`; **Meta** contém a palavra-chave foco e tem até ~155 caracteres;
**Palavra-chave foco** = exatamente o termo da fila. O mesmo `<title>` e `<meta name="description">`
do `<head>` devem bater com o Título SEO e a Meta.

## Saída esperada do agente
1. Criar `blog/<slug>.html` (HTML pronto pro bloco "HTML personalizado") **começando pelo comentário
   de cabeçalho com os metadados de publicação acima** (slug, Título SEO, Meta, palavra-chave foco).
2. Atualizar a fila acima (marcar `[x]`) e o campo `entregaveis` em `data.js`.
3. `git commit && git push` na `main`.
4. Avisar o Fabricio com o arquivo pronto pra colar como **Post**, repetindo na mensagem os 4
   metadados (slug, Título SEO, Meta, palavra-chave foco) pra ele copiar direto no Rank Math.
5. (Se WordPress conectado via REST API / Application Password) publicar direto como rascunho ou publicado.

## Prompt da sessão (colar na sessão agendada)
```
Você é o agente semanal de conteúdo do projeto SEO do fabriciomoura.com.
Leia docs/AGENTE-SEMANAL.md, data.js e blog/cardapio-para-quem-toma-mounjaro.html (template).
Pegue o PRIMEIRO artigo não marcado da fila, escreva-o seguindo TODAS as regras de estilo.
OBRIGATÓRIO: o arquivo blog/<slug>.html DEVE começar pelo comentário de cabeçalho com os
metadados de publicação (slug, Título SEO terminando em "| Fabricio Moura", Meta de até ~155
caracteres com a palavra-chave, e palavra-chave foco exata da fila), conforme a seção
"Metadados de publicação" do playbook. Atualize a fila e o data.js, faça commit e push, e me
entregue o artigo pronto pra colar como Post REPETINDO os 4 metadados na mensagem.
```

## Para publicação automática (via WordPress REST API)
Pré-requisitos (uma vez):
- Usuário **Editor** dedicado + **Senha de Aplicativo** (já criado pelo Fabricio).
- **Variáveis de ambiente** no ambiente do Claude Code (NUNCA no repositório nem no chat):
  - `WP_URL=https://fabriciomoura.com`
  - `WP_USER=<usuario-editor>`
  - `WP_APP_PASSWORD=<senha de aplicativo>`
- **Astra (uma vez):** definir GLOBALMENTE para posts **Desativar título** + **Sem sidebar**
  (Personalizar → Blog → Post único / Single), e fundo do site preto (já feito). Assim todo post
  auto-publicado já nasce no padrão dark, sem ajuste manual.

Fluxo do agente ao publicar (status `publish`, conforme escolha do Fabricio):
1. Gerar o artigo em `blog/<slug>.html` (entre INÍCIO DO POST e FIM DO POST).
2. `POST {WP_URL}/wp-json/wp/v2/posts` com **Basic Auth** (`WP_USER`:`WP_APP_PASSWORD`), corpo:
   `{ "title": "<título>", "slug": "<slug>", "status": "publish", "content": "<html entre os marcadores>" }`
3. (Opcional) Definir imagem destacada via `featured_media` e SEO do Rank Math via meta, se disponível.
4. Confirmar a URL publicada, marcar a fila como concluída, commit/push, e avisar o Fabricio com o link.

