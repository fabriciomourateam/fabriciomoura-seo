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

## Observações

- **SEO (RankMath/Yoast):** o script tenta preencher Título SEO, Meta e Palavra-chave,
  mas alguns setups não aceitam esses campos via REST. Se não aparecerem, cole
  manualmente (eles estão no comentário no topo do arquivo).
- **Imagem destacada:** ainda é definida no WordPress (o script não sobe imagem).
- **Status padrão `draft`** de propósito: você revisa no WP antes de publicar.
