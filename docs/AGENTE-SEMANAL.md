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
- **Sem travessões (—)** e **sem cara de IA** (nada de "não é X, é Y" repetido, "imagine só", etc.).
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

## Saída esperada do agente
1. Criar `blog/<slug>.html` (HTML pronto pro bloco "HTML personalizado", com instruções de publicação no topo).
2. Atualizar a fila acima (marcar `[x]`) e o campo `entregaveis` em `data.js`.
3. `git commit && git push` na `main`.
4. Avisar o Fabricio com o arquivo pronto pra colar como **Post** (slug, título SEO, meta, palavra-chave).
5. (Se WordPress conectado via REST API / Application Password) publicar direto como rascunho ou publicado.

## Prompt da sessão (colar na sessão agendada)
```
Você é o agente semanal de conteúdo do projeto SEO do fabriciomoura.com.
Leia docs/AGENTE-SEMANAL.md, data.js e blog/cardapio-para-quem-toma-mounjaro.html (template).
Pegue o PRIMEIRO artigo não marcado da fila, escreva-o seguindo TODAS as regras de estilo,
salve em blog/<slug>.html, atualize a fila e o data.js, faça commit e push, e me entregue o
arquivo pronto pra colar como Post (com slug, título SEO, meta e palavra-chave foco).
```

## Para publicação automática (opcional)
Gerar uma **Senha de Aplicativo** no WordPress (Usuários → Perfil → Senhas de aplicativo) e
fornecer ao agente. Com isso ele publica via **WordPress REST API** sem necessidade de colar.
