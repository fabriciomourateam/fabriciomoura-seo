# Ferramentas (iscas de topo de funil)

Ativos gratuitos para capturar tráfego de topo (alto volume, baixo custo) e funilar para o
WhatsApp comercial. Modelo validado na Fase 3 (a novocare.com.br faz exatamente isso: "calculo imc"
tem 60.500 buscas/mês a CPC R$ 0,01 e gera 25% do tráfego pago dela).

## `calculadora.html` — Calculadora de IMC + Gasto Calórico

- **Identidade visual** do Fabricio (preto `#080808` + amarelo `#F5C518`, fonte Inter).
- **Arquivo único**, sem build, sem dependências (só Google Fonts).
- **CTA** para o WhatsApp `+55 11 91484-9797` com mensagem contextual ao resultado.
- **SEO**: `<title>` e `<meta description>` mirando "calculadora de IMC" e "calculadora de gasto calórico".
- Fórmula: **Mifflin-St Jeor** (TMB) × fator de atividade (TDEE); déficit −500 e superávit +300.

### Como colocar no site principal (WordPress) — 3 formas

1. **Página dedicada via iframe (mais simples e recomendado p/ SEO):**
   - Suba o `calculadora.html` no servidor (ex.: `fabriciomoura.com/ferramentas/calculadora.html`)
     ou hospede na Vercel.
   - Crie uma página WordPress "Calculadora de IMC e Calorias" e num bloco **HTML personalizado** cole:
     ```html
     <iframe src="/ferramentas/calculadora.html" style="width:100%;border:0;height:900px" loading="lazy"></iframe>
     ```

2. **Colar direto (sem iframe):** copie do `calculadora.html` o trecho entre
   `<!-- INÍCIO DO WIDGET -->` e `<!-- FIM DO WIDGET -->` **mais** o bloco `<style>` e o `<script>`,
   e cole num bloco **HTML personalizado**. (O iframe é mais à prova de conflito com o tema.)

3. **Plugin de code snippet** (ex.: "Insert Headers and Footers" / "WPCode") para inserir o widget.

> Para o widget render como página própria (SEO), use a forma 1 ou hospede o arquivo direto.
> Para virar lead magnet de verdade, considere pedir nome/WhatsApp antes de revelar o resultado
> (captura) — versão futura.

### Trocar o número de WhatsApp
No `calculadora.html`, edite a linha `var FM_WPP = "+5511914849797";`.

---

## `publicar.mjs` — Publicação automática de artigos no WordPress

Script Node (sem dependências, usa `fetch` nativo do Node 18+) que publica um artigo de `blog/`
direto no WordPress via REST API. É o que o agente semanal roda para auto-publicar.

```bash
node ferramentas/publicar.mjs blog/<arquivo>.html            # publica (status publish)
node ferramentas/publicar.mjs blog/<arquivo>.html --rascunho # publica como rascunho (draft)
```

Lê as credenciais das **variáveis de ambiente** (NUNCA do repositório nem do chat):

| Variável | Exemplo |
|---|---|
| `WP_URL` | `https://fabriciomoura.com` |
| `WP_USER` | `agente-conteudo` (usuário editor dedicado) |
| `WP_APP_PASSWORD` | senha de aplicativo do WordPress |

O script extrai do próprio HTML o título, slug, título SEO, meta description e palavra-chave foco
(do cabeçalho de instruções) e o conteúdo entre `<!-- INÍCIO DO POST -->` e `<!-- FIM DO POST -->`,
publica o post e grava o SEO do Rank Math (best-effort). No fim imprime a URL publicada.

**Categoria:** todo post é marcado na categoria **"Conteúdo Semanal"** (o script procura pelo nome
e cria a categoria se ela não existir). Para usar outro nome, defina a variável de ambiente
opcional `WP_CATEGORY`. Como é publicado como **Post**, aparece automaticamente na listagem do
blog, no RSS e no sitemap — sem passo manual.

**Publica OU atualiza (idempotente):** o script procura um post com o mesmo `slug`. Se já existir,
ele **edita o post que está no ar** (não duplica); se não existir, cria. Por isso o mesmo comando
serve tanto para publicar pela primeira vez quanto para aplicar uma correção depois — basta editar
o HTML em `blog/<slug>.html` e rodar de novo.
