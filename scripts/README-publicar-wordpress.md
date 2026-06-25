# Publicar artigos no WordPress (automático)

Em vez de copiar e colar o HTML no WordPress, você publica o artigo com um clique.
O script lê o próprio comentário de publicação que já existe em cada arquivo do `blog/`
(Título, Slug, Título SEO, Meta, Palavra-chave) e o corpo entre
`<!-- INÍCIO DO POST -->` e `<!-- FIM DO POST -->`.

## Passo 1 — gerar a senha de aplicativo no WordPress (uma vez)

1. Entre no WordPress como administrador.
2. **Usuários → Perfil** (seu perfil).
3. Role até **Application Passwords** (Senhas de Aplicativo).
4. Em "New Application Password Name" escreva `publicador` e clique **Add New**.
5. O WordPress mostra uma senha tipo `abcd EFGH ijkl 1234` — **copie agora** (só aparece uma vez).

> Se essa seção não aparecer, o site precisa estar em **HTTPS** e com Application
> Passwords ativo (padrão no WordPress 5.6+). Alguns plugins de segurança (Wordfence,
> iThemes) bloqueiam — pode ser preciso liberar "Basic Auth" / REST API.

## Passo 2 — guardar os 3 segredos no GitHub (uma vez)

No GitHub: **Settings → Secrets and variables → Actions → New repository secret**.
Crie os três:

| Nome | Valor |
|---|---|
| `WP_URL` | endereço do site, ex.: `https://fabriciomoura.com` (sem barra no fim) |
| `WP_USER` | seu usuário do WordPress |
| `WP_APP_PASSWORD` | a senha de aplicativo do passo 1 (com ou sem espaços) |

## Passo 3 — publicar (toda vez)

1. Aba **Actions** → **Publicar artigo no WordPress** → **Run workflow**.
2. **file:** caminho do artigo, ex.: `blog/cardapio-para-quem-toma-mounjaro.html`
3. **status:** `draft` (rascunho, recomendado pra revisar) ou `publish` (vai pro ar).
4. **Run workflow**. Em ~30s o log mostra o link de editar/ver o post.

O script é idempotente: se já existe um post com o mesmo **slug**, ele **atualiza**
em vez de criar duplicado. Então pra corrigir um artigo, é só rodar de novo.

## Rodar local (opcional, pra testar)

```bash
# só conferir o que seria enviado (não toca no site):
DRY_RUN=1 node scripts/publish-to-wp.mjs blog/creatina-engorda.html

# publicar de verdade:
WP_URL=https://fabriciomoura.com WP_USER=seu_user WP_APP_PASSWORD='abcd EFGH ijkl 1234' \
  node scripts/publish-to-wp.mjs blog/creatina-engorda.html draft
```

---

# Geração automática 2x por semana

Além do publicador manual acima, há uma rotina que **escreve e publica sozinha**
um artigo novo **terça e sexta às 10h (BRT)**.

**Como funciona:** o script `scripts/seo-auto-run.mjs` pega o próximo tópico
**"Planejado"** do calendário editorial (`data.js`), de maior prioridade/volume e
que ainda não tem artigo, gera o HTML no mesmo template premium (via IA), salva em
`blog/`, publica no WordPress e marca como feito em `scripts/seo-published.json`.
Não regera artigos que já existem escritos à mão.

**Secret a mais (além dos 3 do WordPress):**

| Nome | Valor |
|---|---|
| `ANTHROPIC_API_KEY` | sua chave da API da Anthropic (console.anthropic.com) |

**Primeira vez — rode vigiado:** vá em **Actions → "SEO — gerar e publicar artigo" →
Run workflow**, escolha `draft` pra revisar o primeiro artigo no WordPress antes de
confiar no automático. Se ficou bom, deixa o cron seguir publicando direto.

**Pausar:** Actions → o workflow → **⋯ → Disable workflow**.
**Reverter um artigo ruim:** `git revert` do commit + apague o post no WordPress.

> ⚠️ Publicação direta sem revisão tem risco de SEO se algum artigo sair fraco
> (o Google penaliza conteúdo raso em massa). Por isso o run manual permite `draft`.

## Observações

- **SEO (RankMath/Yoast):** o script tenta preencher Título SEO, Meta e Palavra-chave,
  mas alguns setups não aceitam esses campos via REST. Se não aparecerem, cole
  manualmente (eles estão no comentário no topo do arquivo).
- **Imagem destacada:** ainda é definida no WordPress (o script não sobe imagem).
- **Status padrão `draft`** de propósito: você revisa no WP antes de publicar.
