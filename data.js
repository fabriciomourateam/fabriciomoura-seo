/**
 * FONTE ÚNICA DE DADOS — Dashboard SEO Nutrição Esportiva (Fabrício Moura)
 * --------------------------------------------------------------------------
 * Tudo que o dashboard mostra vem deste arquivo. Para RE-ANALISAR no futuro:
 *   1. Re-rode as queries do Semrush documentadas em /seo-analysis/PROCESSO.md
 *   2. Adicione um novo objeto ao array `snapshots` (não apague os antigos —
 *      é o histórico que permite comparar evolução).
 *   3. Salve uma cópia bruta em snapshots/AAAA-MM-DD.json
 *   4. git commit + push -> a Vercel republica sozinha.
 * O dashboard sempre exibe o snapshot mais recente (último do array).
 */
window.SEO_DATA = {
  projeto: {
    nome: "SEO Nutrição Esportiva — Fabrício Moura",
    site: "fabriciomoura.com",
    nicho: "Emagrecimento / Nutrição esportiva — planos anuais",
    objetivo: "Dobrar o faturamento somando tráfego ORGÂNICO ao tráfego PAGO já existente",
    ferramenta: "Semrush (via conector MCP)",
    database: "br (Brasil / Google.com.br)",
    fuso: "America/Sao_Paulo (BRT)"
  },

  snapshots: [
    {
      data: "2026-06-14",
      rotulo: "Diagnóstico inicial",

      // ---- Negócio (informado pelo cliente) ----
      negocio: {
        ticket_medio: "R$ 1.800 a R$ 2.600 / ano (planos anuais)",
        investimento_ads_mes: "≈ R$ 22.000/mês (R$ 5.094/semana reportado)",
        faturamento_total: "> R$ 150.000 (ads + indicação + renovação)",
        canal_atual: "100% Google Ads",
        relatorio_ads: {
          periodo: "25/05/2026 a 31/05/2026",
          investimento: 5094.51,
          cliques_whatsapp: 332,
          custo_por_whatsapp: 15.34,
          impressoes: 44498,
          cliques: 2307,
          ctr: 5.18,
          taxa_conversao: 14.27,
          primeira_posicao: 24.26,
          topo_geral: 72.16
        }
      },

      // ---- Diagnóstico do site (dados Semrush) ----
      diagnostico: {
        trafego_organico: "Praticamente ZERO",
        keywords_organicas: 2,
        keywords_detalhe: [
          { kw: "ivy moura", pos: 50, vol: 90 },
          { kw: "moura academia", pos: 40, vol: 320 }
        ],
        ads_detectado: { kw: "emagrecimento rapido", pos: 4, vol: 3600, cpc: 0.15 },
        leitura:
          "O site não tem presença orgânica nenhuma. Todo o faturamento vem de pago + indicação + renovação. " +
          "O canal orgânico está 100% intocado — é a maior oportunidade de crescimento de margem, porque clique " +
          "orgânico não tem custo por lead como o Google Ads (hoje R$ 15,34 por conversa no WhatsApp)."
      },

      // ---- Concorrentes orgânicos (SERP de 'nutricionista esportivo', sem diretórios) ----
      concorrentes: [
        {
          rank: 1,
          dominio: "raphaelnutri.com",
          medalha: "🥇",
          forca: "A máquina de conteúdo. Rankeia #2 em 'nutricionista esportivo' e tem um motor de blog gigante.",
          modelo: "Capturar dúvidas (Mounjaro, mitos de comida) + funilar para 'nutricionista online / agendar consulta'."
        },
        {
          rank: 2,
          dominio: "nutrijoaoortiz.com.br",
          medalha: "🥈",
          forca: "Forte em SEO LOCAL ('nutricionista porto alegre' #4). Estratégia de dominar uma cidade.",
          modelo: "Páginas otimizadas por cidade/bairro para capturar intenção local."
        },
        {
          rank: 3,
          dominio: "nutricionistalucasalves.com.br",
          medalha: "🥉",
          forca: "Mais fraco. Rankeia bem só em 'nutricionista esportista'. Pouca profundidade de conteúdo.",
          modelo: "Marca pessoal com pouco volume — fácil de ultrapassar."
        }
      ],
      concorrentes_descartados: "Doctoralia, Instagram, Dietbox, Medprev (diretórios/agregadores — não são concorrentes diretos de uma marca pessoal).",

      // ---- 5 palavras TRANSACIONAIS (fundo de funil) ----
      kw_transacionais: [
        { kw: "nutricionista", vol: 49500, cpc: 0.47, nota: "Termo-mãe. Volume gigante, ótimo para autoridade de longo prazo." },
        { kw: "nutricionista online", vol: 6600, cpc: 0.56, nota: "Casa perfeito com o modelo de planos anuais à distância. PRIORIDADE." },
        { kw: "nutricionista esportivo", vol: 5400, cpc: 0.59, nota: "Termo de dinheiro do nicho. raphaelnutri está em #2." },
        { kw: "nutricionista esportiva", vol: 1600, cpc: 0.59, nota: "Variação de gênero, mesma intenção de compra." },
        { kw: "nutricionista esportivo perto de mim", vol: 480, cpc: 0.52, nota: "Intenção altíssima — 'perto de mim' = pronto para fechar." }
      ],

      // ---- 5 palavras MEIO/FUNDO (comercial + informacional que captura demanda) ----
      kw_meio_fundo: [
        { kw: "dieta / cardápio para quem toma mounjaro", vol: 1000, funil: "Comercial 🔥", nota: "Onda do Mounjaro/tirzepatida. Concorrência baixíssima, raphaelnutri está em #1. Ouro puro agora." },
        { kw: "arroz engorda", vol: 6600, funil: "Comercial", nota: "Sozinha gera 4,67% de todo o tráfego do raphaelnutri (posição #2)." },
        { kw: "quem toma mounjaro pode beber", vol: 2400, funil: "Informacional", nota: "Cluster inteiro de Mounjaro+álcool, dezenas de variações, concorrência ~zero." },
        { kw: "creatina engorda ou emagrece", vol: 1900, funil: "Comercial", nota: "Mito de suplemento — público fitness/emagrecimento, exatamente o do Fabrício." },
        { kw: "dieta da selva funciona", vol: 480, funil: "Comercial", nota: "Avaliação de dieta da moda → leva para 'faça com acompanhamento profissional'." }
      ],

      // ---- Páginas que mais dão tráfego no raphaelnutri (o que copiar) ----
      paginas_top_concorrente: [
        { titulo: "6 alimentos ricos em fibras", trafego_pct: 34.22, keywords: 78, visitas: 1450 },
        { titulo: "Gordura visceral: o que é, riscos e como reduzir", trafego_pct: 17.25, keywords: 18, visitas: 731 },
        { titulo: "Home (nutricionista esportivo)", trafego_pct: 14.18, keywords: 62, visitas: 601 },
        { titulo: "Pode beber tomando Mounjaro?", trafego_pct: 11.82, keywords: 78, visitas: 501 },
        { titulo: "Comer arroz engorda?", trafego_pct: 8.33, keywords: 65, visitas: 353 },
        { titulo: "Cardápio para quem toma Mounjaro", trafego_pct: 7.03, keywords: 29, visitas: 298 },
        { titulo: "Déficit calórico: a única forma de emagrecer", trafego_pct: 3.42, keywords: 30, visitas: 145 },
        { titulo: "Creatina engorda ou emagrece?", trafego_pct: 1.34, keywords: 51, visitas: 57 }
      ],

      // ---- Calendário editorial de 90 dias (Fase 1 entregue) ----
      calendario: [
        // MÊS 1 — Quick wins (copiar campeões do concorrente + onda Mounjaro)
        { mes: 1, titulo: "Pode beber álcool tomando Mounjaro? Nutricionista explica", funil: "Topo", kw: "quem toma mounjaro pode beber", vol: 2400, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "Cardápio para quem toma Mounjaro (com acompanhamento)", funil: "Meio", kw: "cardápio para quem toma mounjaro", vol: 1000, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "Arroz engorda? O que diz o nutricionista", funil: "Meio", kw: "arroz engorda", vol: 6600, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "6 alimentos ricos em fibras para emagrecer", funil: "Topo", kw: "alimentos ricos em fibras", vol: 0, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "Creatina engorda ou emagrece?", funil: "Meio", kw: "creatina engorda ou emagrece", vol: 1900, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "Como funciona o acompanhamento de nutricionista online", funil: "Fundo", kw: "nutricionista online", vol: 6600, prioridade: "Alta", status: "Planejado" },
        // MÊS 2 — Autoridade + transacional
        { mes: 2, titulo: "Gordura visceral: riscos e como reduzir", funil: "Topo", kw: "gordura visceral", vol: 0, prioridade: "Média", status: "Planejado" },
        { mes: 2, titulo: "Nutricionista esportivo: o que faz e quando procurar", funil: "Fundo", kw: "nutricionista esportivo", vol: 5400, prioridade: "Alta", status: "Planejado" },
        { mes: 2, titulo: "Déficit calórico: a única forma real de emagrecer", funil: "Topo", kw: "déficit calórico", vol: 0, prioridade: "Média", status: "Planejado" },
        { mes: 2, titulo: "O que comer tomando Mounjaro: guia completo", funil: "Meio", kw: "o que comer tomando mounjaro", vol: 390, prioridade: "Média", status: "Planejado" },
        { mes: 2, titulo: "Nutricionista pode receitar Mounjaro?", funil: "Topo", kw: "nutricionista pode receitar mounjaro", vol: 720, prioridade: "Média", status: "Planejado" },
        { mes: 2, titulo: "Dieta da selva funciona? Nutricionista avalia", funil: "Meio", kw: "dieta da selva funciona", vol: 480, prioridade: "Baixa", status: "Planejado" },
        // MÊS 3 — Escala + conversão
        { mes: 3, titulo: "Quanto custa um nutricionista esportivo? Vale a pena?", funil: "Fundo", kw: "quanto custa nutricionista esportivo", vol: 0, prioridade: "Alta", status: "Planejado" },
        { mes: 3, titulo: "Alimentação pós-treino para hipertrofia", funil: "Topo", kw: "alimentação pós-treino hipertrofia", vol: 0, prioridade: "Média", status: "Planejado" },
        { mes: 3, titulo: "Recomposição corporal: como perder gordura e ganhar músculo", funil: "Topo", kw: "recomposição corporal", vol: 0, prioridade: "Média", status: "Planejado" },
        { mes: 3, titulo: "Melhor horário para se pesar no emagrecimento", funil: "Topo", kw: "melhor horário para se pesar", vol: 0, prioridade: "Baixa", status: "Planejado" },
        { mes: 3, titulo: "Whey protein engorda? Mitos e verdades", funil: "Meio", kw: "whey engorda", vol: 0, prioridade: "Média", status: "Planejado" },
        { mes: 3, titulo: "Nutricionista online vs presencial: qual escolher", funil: "Fundo", kw: "nutricionista online ou presencial", vol: 0, prioridade: "Alta", status: "Planejado" }
      ]
    }
  ],

  // ---- Roadmap de fases (atualizado a cada etapa) ----
  fases: [
    { n: 0, nome: "Setup & diagnóstico", desc: "Conectar Semrush, diagnosticar o site, identificar nicho real.", status: "Concluída" },
    { n: 1, nome: "Concorrentes & palavras-chave", desc: "Top 3 concorrentes orgânicos + 5 transacionais + 5 meio/fundo.", status: "Concluída" },
    { n: 2, nome: "Calendário editorial 90 dias", desc: "Engenharia reversa das páginas campeãs do concorrente.", status: "Concluída" },
    { n: 3, nome: "Análise do tráfego pago", desc: "Palavras que os concorrentes compram, CPC, e onde vaza dinheiro na conta atual.", status: "Pendente" },
    { n: 4, nome: "SEO técnico & on-page", desc: "Estrutura do site, páginas de serviço/cidade, otimização para converter.", status: "Pendente" },
    { n: 5, nome: "Funil & projeção de faturamento", desc: "Amarrar orgânico+pago no funil e projetar o caminho para dobrar.", status: "Pendente" },
    { n: 6, nome: "Re-análise (revisão periódica)", desc: "Re-rodar Semrush, comparar com snapshot anterior, ajustar plano.", status: "Agendável" }
  ],

  // ---- Metodologia: queries exatas para reproduzir/atualizar ----
  metodologia: [
    { passo: "Concorrentes orgânicos do site", report: "domain_organic_organic", params: "{ database:'br', domain:'fabriciomoura.com' }" },
    { passo: "Palavras orgânicas do site", report: "domain_organic", params: "{ database:'br', domain:'fabriciomoura.com', display_sort:'tr_desc' }" },
    { passo: "Palavras pagas do site (Ads)", report: "domain_adwords", params: "{ database:'br', domain:'fabriciomoura.com' }" },
    { passo: "SERP / quem rankeia no termo", report: "phrase_organic", params: "{ database:'br', phrase:'nutricionista esportivo' }" },
    { passo: "Métricas das palavras (vol/CPC)", report: "phrase_these", params: "{ database:'br', phrase:'nutricionista esportivo;nutricionista;...' }" },
    { passo: "Palavras de um concorrente", report: "domain_organic", params: "{ database:'br', domain:'raphaelnutri.com', display_sort:'tr_desc' }" },
    { passo: "Páginas que mais dão tráfego", report: "domain_organic_unique", params: "{ database:'br', domain:'raphaelnutri.com', display_sort:'tr_desc' }" }
  ]
};
