# Dashboard SEO — Nutrição Esportiva (Fabrício Moura)

Projeto de inteligência de SEO para `fabriciomoura.com`, com o objetivo de **dobrar o
faturamento** somando tráfego **orgânico** ao tráfego **pago** já existente.

Site estático (sem build) — a Vercel publica direto. A página inicial **é** o dashboard.

## Estrutura

```
.
├── index.html              # O dashboard (lê ./data.js)
├── data.js                 # FONTE ÚNICA DE DADOS (Semrush) — edite aqui para atualizar
├── docs/
│   └── PROCESSO.md          # Documentação viva do processo, fase a fase
└── snapshots/
    └── AAAA-MM-DD.json      # Registros brutos do Semrush (histórico para comparar)
```

## Como publicar na Vercel (uma vez)

1. Vercel → **Add New… → Project** → importe este repositório.
2. Framework Preset: **Other** (é estático, sem build). Deixe os campos vazios.
3. **Deploy**. Pronto: a URL (`<projeto>.vercel.app`) já abre o dashboard.

A cada `git push` na branch principal, a Vercel republica sozinha.

## Como RE-ANALISAR no futuro (ex.: daqui a 4 meses)

1. Reconecte o Semrush (precisa de plano com acesso MCP).
2. Re-rode as queries documentadas em `docs/PROCESSO.md` (seção Metodologia), banco **br**.
3. Salve o bruto em `snapshots/AAAA-MM-DD.json`.
4. Adicione um novo objeto ao array `snapshots` em `data.js` (NÃO apague os antigos — é o
   histórico que permite comparar a evolução). O dashboard mostra sempre o mais recente.
5. Registre a nova fase em `docs/PROCESSO.md`.
6. `git commit && git push` → a Vercel republica.

## Origem

Migrado do repositório `controle-de-pacientes` (onde foi prototipado na branch
`claude/semrush-nutricionista-seo-analysis-x9snbe`). Todo o conteúdo é portátil e
autossuficiente.
