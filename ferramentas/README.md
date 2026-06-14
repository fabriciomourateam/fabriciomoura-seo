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
