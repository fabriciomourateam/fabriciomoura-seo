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
        canal_atual: "100% Google Ads — principal canal de aquisição (Instagram converte pouco)",
        publico: {
          instagram: "63% mulheres / 37% homens — audiência fraca em conversão",
          pacientes_ativos: "63% homens / 37% mulheres — maioria vem do Google",
          insight:
            "INVERSÃO IMPORTANTE: o público do Instagram é majoritariamente feminino, mas quem " +
            "EFETIVAMENTE vira paciente pagante é majoritariamente HOMEM e vem do Google. O Google é " +
            "o canal que funciona; o Instagram quase não converte. Logo: dobrar a aposta no Google " +
            "(SEO + Ads) é a decisão certa. Conteúdo e anúncios devem ter enquadramento masculino / " +
            "performance (esporte, hipertrofia, treino), o que casa com 'nutricionista esportivo' " +
            "(KDI 10) e com o ICP do próprio negócio (≈60% masculino, homens 28-45)."
        },
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
        { mes: 1, titulo: "6 alimentos ricos em fibras para emagrecer", funil: "Topo", kw: "alimentos ricos em fibras", vol: 0, prioridade: "Alta", status: "Publicado" },
        { mes: 1, titulo: "Creatina engorda ou emagrece?", funil: "Meio", kw: "creatina engorda ou emagrece", vol: 1900, prioridade: "Alta", status: "Planejado" },
        { mes: 1, titulo: "Como funciona o acompanhamento de nutricionista online", funil: "Fundo", kw: "nutricionista online", vol: 6600, prioridade: "Alta", status: "Planejado" },
        // MÊS 2 — Autoridade + transacional
        { mes: 2, titulo: "Gordura visceral: riscos e como reduzir", funil: "Topo", kw: "gordura visceral", vol: 22200, prioridade: "Média", status: "Publicado" },
        { mes: 2, titulo: "Nutricionista esportivo: o que faz e quando procurar", funil: "Fundo", kw: "nutricionista esportivo", vol: 5400, prioridade: "Alta", status: "Planejado" },
        { mes: 2, titulo: "Déficit calórico: a única forma real de emagrecer", funil: "Topo", kw: "déficit calórico", vol: 22200, prioridade: "Média", status: "Publicado" },
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
      ],

      // ---- Fase 3: Análise de tráfego pago (PPC) — dados reais Semrush (banco br) ----
      ppc: {
        leitura:
          "O concorrente orgânico nº 1 (raphaelnutri.com) NÃO veicula um único anúncio — máquina 100% orgânica. " +
          "O Fabrício é o espelho oposto: 100% pago. No Semrush, todo o footprint pago detectado do site é UM termo só — " +
          "'emagrecimento rapido' (pos. 4, CPC R$ 0,15, competição máxima 1,00). É um termo genérico, saturado e " +
          "desalinhado com o ticket premium (R$ 1.800–2.600/ano): atrai quem busca solução milagrosa, não quem fecha plano anual. " +
          "Pior: o concorrente que disputa o MESMO termo em #1 é um cirurgião bariátrico (joaohenriquefelicio.com.br). " +
          "Enquanto isso, os termos de ALTA intenção do nicho — 'nutricionista online' e 'nutricionista esportivo' — custam " +
          "baratíssimo (R$ 0,56–0,59) e o Fabrício não aparece comprando nenhum. Aí está a eficiência a destravar no pago.",

        // raphaelnutri não faz ads — achado central da fase
        concorrente_organico_sem_ads: {
          dominio: "raphaelnutri.com",
          ads: false,
          nota: "domain_adwords e domain_adwords_unique retornaram NOTHING FOUND. Ele cresce só com conteúdo orgânico."
        },

        // Footprint pago atual do Fabrício (o que o Semrush enxerga)
        footprint_atual: {
          keywords_detectadas: 1,
          detalhe: [
            { kw: "emagrecimento rapido", pos: 4, vol: 3600, cpc: 0.15, competicao: 1.00 }
          ],
          nota:
            "Investe ≈ R$ 22 mil/mês mas o Semrush detecta apenas 1 keyword paga. Ou a verba está concentrada num único " +
            "termo genérico, ou roda em formatos que o Semrush não rastreia (Performance Max / branded). De todo jeito, " +
            "não há captura dos termos de intenção de compra do nicho."
        },

        // Termos-alvo: CPC, volume, competição e se o Fabrício já anuncia (phrase_these)
        cpcs: [
          { kw: "nutricionista",                       vol: 49500, cpc: 0.47, comp: 0.39, fabricio_anuncia: false, nota: "Termo-mãe, CPC baixo. Caro só em volume de verba, não em clique." },
          { kw: "nutricionista online",                vol: 6600,  cpc: 0.56, comp: 0.87, fabricio_anuncia: false, nota: "Casa perfeito com plano anual à distância. PRIORIDADE de entrada no pago." },
          { kw: "nutricionista esportivo",             vol: 5400,  cpc: 0.59, comp: 0.68, fabricio_anuncia: false, nota: "Termo de dinheiro do nicho — alto encaixe, clique barato." },
          { kw: "nutricionista esportiva",             vol: 1600,  cpc: 0.59, comp: 0.68, fabricio_anuncia: false, nota: "Mesma intenção, variação de gênero." },
          { kw: "emagrecimento rapido",                vol: 3600,  cpc: 0.15, comp: 1.00, fabricio_anuncia: true,  nota: "ÚNICO termo que ele compra. Competição máxima e público desalinhado com o ticket." },
          { kw: "cardapio para quem toma mounjaro",    vol: 260,   cpc: 0.18, comp: 0.08, fabricio_anuncia: false, nota: "Competição quase zero — pago barato para capturar a onda do Mounjaro enquanto o orgânico não amadurece." }
        ],

        // Concorrentes de PAGO reais do site (domain_adwords_adwords)
        concorrentes_pagos: [
          { dominio: "novocare.com.br",            kw_pagas: 119, trafego_pago: 11141, relevancia: 0.00, nota: "Anunciante pesado. Modelo de funil pago: calculadoras grátis (IMC) a CPC R$ 0,01 como isca de topo → compra 'nutricionista online' em #1 (CPC R$ 0,60)." },
          { dominio: "joaohenriquefelicio.com.br", kw_pagas: 5,   trafego_pago: 216,   relevancia: 0.12, nota: "Cirurgião bariátrico. Disputa o MESMO 'emagrecimento rapido' (#1) que o Fabrício — sinal de que esse termo mistura públicos errados." },
          { dominio: "clinicaevolv.com.br",        kw_pagas: 1,   trafego_pago: 32,    relevancia: 1.00, nota: "Sobreposição direta, mas footprint mínimo." }
        ],

        // Quem compra os termos de dinheiro do nicho (phrase_adwords)
        quem_compra_termo: [
          { termo: "nutricionista online",    anunciantes: ["novocare.com.br (#1)", "drpandini.com.br", "drthiagocollares.com", "lpfnutrição.com.br", "nutriroberta.com.br", "dracamilahames.com.br"] },
          { termo: "nutricionista esportivo", anunciantes: ["drpandini.com.br", "ricardosantosnutricionista.com.br", "nutrirodrigosousa.com.br", "jaymecanetto.com.br", "clinicagabrielli.com.br", "carolinaragugnetti.com.br"] }
        ],

        // Top keywords pagas da novocare (modelo de funil pago a estudar)
        modelo_novocare: [
          { kw: "calculo imc",           vol: 60500, cpc: 0.01, pos: 1, trafego_pct: 25.51 },
          { kw: "como calcular o imc",   vol: 22200, cpc: 0.01, pos: 1, trafego_pct: 9.36 },
          { kw: "como emagrecer",        vol: 8100,  cpc: 0.13, pos: 1, trafego_pct: 3.41 },
          { kw: "nutricionista online",  vol: 5400,  cpc: 0.60, pos: 1, trafego_pct: 2.27 },
          { kw: "peso ideal por altura", vol: 9900,  cpc: 0.02, pos: 2, trafego_pct: 1.14 }
        ],

        oportunidades: [
          "Entrar no pago com os termos de intenção 'nutricionista online' e 'nutricionista esportivo/esportiva' (CPC R$ 0,56–0,59) — leads muito mais qualificados que 'emagrecimento rapido'.",
          "Copiar o modelo da novocare no pago: calculadora grátis (IMC / gasto calórico) como isca de topo a CPC ~R$ 0,01 para alimentar remarketing barato.",
          "Usar o pago como ponte enquanto o orgânico amadurece em termos de baixa competição (ex.: 'cardapio para quem toma mounjaro', competição 0,08).",
          "Mercado pago do nicho esportivo é pulverizado em nutricionistas individuais — dá pra ocupar #1 com verba modesta nos termos certos."
        ],

        desperdicio: [
          "'emagrecimento rapido' (competição 1,00, público milagreiro) é o único termo comprado e é o de menor encaixe com plano premium — concentrar verba nele tende a elevar o custo por lead qualificado.",
          "Competir nesse termo com cirurgião bariátrico mistura intenções (cirurgia × acompanhamento nutricional) e desperdiça cliques.",
          "Sem termos de intenção comprados, o pago não captura quem já procura 'nutricionista online' — demanda quente entregue de graça aos concorrentes.",
          "Recomendação: negativar termos de cirurgia/bariátrica e de 'solução milagrosa' para parar de pagar por curiosos."
        ]
      },

      // ---- Autoridade (backlinks) + dificuldade (KDI) + status do site novo — dados Semrush br ----
      autoridade: {
        leitura:
          "A boa notícia: a distância de autoridade para o concorrente nº 1 é vencível com CONTEÚDO, não com link building pesado. " +
          "fabriciomoura.com tem Authority Score 2 vs. 11 do raphaelnutri — mas em domínios referenciadores estão quase empatados " +
          "(97 vs. 117). Ou seja, o que separa os dois é volume/qualidade de links e, principalmente, conteúdo publicado. " +
          "Cruzando com a dificuldade (KDI), quase todos os termos-alvo são fáceis para um domínio novo (KDI 8–30), com destaque " +
          "para 'nutricionista esportivo' (KDI 10) — termo de dinheiro E fácil de ranquear ao mesmo tempo. É por aí que se começa.",

        backlinks: [
          { dominio: "fabriciomoura.com",  authority_score: 2,  total: 262,  ref_domains: 97,  follow: 118,  nofollow: 144, nota: "Site do Fabrício — autoridade baixa, mas base de domínios decente." },
          { dominio: "raphaelnutri.com",   authority_score: 11, total: 1340, ref_domains: 117, follow: 1000, nofollow: 341, nota: "Concorrente nº1 — vantagem é volume de links + conteúdo, não nº de domínios." }
        ],

        // KDI: 0-14 muito fácil · 15-29 fácil · 30-49 possível · 50-69 difícil · 70+ muito difícil
        kdi: [
          { kw: "cardapio para quem toma mounjaro", kdi: 8,  vol: 260,  faixa: "Muito fácil" },
          { kw: "nutricionista esportivo",          kdi: 10, vol: 5400, faixa: "Muito fácil" },
          { kw: "creatina engorda ou emagrece",     kdi: 15, vol: 1900, faixa: "Fácil" },
          { kw: "nutricionista esportiva",          kdi: 16, vol: 1600, faixa: "Fácil" },
          { kw: "gordura visceral",                 kdi: 22, vol: 0,    faixa: "Fácil" },
          { kw: "deficit calorico",                 kdi: 24, vol: 0,    faixa: "Fácil" },
          { kw: "emagrecimento rapido",             kdi: 27, vol: 3600, faixa: "Fácil" },
          { kw: "nutricionista online",             kdi: 28, vol: 6600, faixa: "Fácil" },
          { kw: "nutricionista",                    kdi: 28, vol: 49500,faixa: "Fácil" },
          { kw: "alimentos ricos em fibras",        kdi: 29, vol: 0,    faixa: "Fácil" },
          { kw: "arroz engorda",                    kdi: 30, vol: 6600, faixa: "Possível" },
          { kw: "quem toma mounjaro pode beber",    kdi: 37, vol: 2400, faixa: "Possível" }
        ],

        // Site novo do Fabrício (custom, feito no Claude) — rodando Ads há ~1 mês
        site_novo: {
          url: "time.fabriciomoura.com (redireciona p/ /acompanhamento-premium)",
          repo: "fabriciomourateam/instagram-fabricio (HTML estático na Vercel)",
          status: "Invisível no Semrush (0 keywords, 0 backlinks) — esperado com 1 mês",
          tipo: "Landing de CONVERSÃO de tráfego pago (Google Ads + Instagram), NÃO é página de SEO",
          icp: "≈60% masculino (homens 28-45 + mulheres fitness 25-38) — alinhado com o paciente real",
          tracking: "Google Tag Manager (GTM-MMTBW5SQ) instalado",
          nota: "Como é landing de pago, não vai ranquear orgânico (sem profundidade de conteúdo) — se 'não vai bem', o problema é CONVERSÃO/Ads, não SEO. Gaps notados pelo próprio projeto: landing 'genérica', sem lead magnet, Pixel Meta ausente. og:url aponta p/ fabriciomoura.com/time (inconsistente). Site custom = fácil plugar calculadora (feita em ferramentas/calculadora.html)."
        }
      }
    }
  ],

  // ---- Roadmap de fases (atualizado a cada etapa) ----
  fases: [
    { n: 0, nome: "Setup & diagnóstico", desc: "Conectar Semrush, diagnosticar o site, identificar nicho real.", status: "Concluída" },
    { n: 1, nome: "Concorrentes & palavras-chave", desc: "Top 3 concorrentes orgânicos + 5 transacionais + 5 meio/fundo.", status: "Concluída" },
    { n: 2, nome: "Calendário editorial 90 dias", desc: "Engenharia reversa das páginas campeãs do concorrente.", status: "Concluída" },
    { n: 3, nome: "Análise do tráfego pago", desc: "Palavras que os concorrentes compram, CPC, e onde vaza dinheiro na conta atual.", status: "Concluída" },
    { n: 4, nome: "SEO técnico & on-page", desc: "Páginas de serviço, calculadora e blog na identidade premium. Calculadora publicada e indexada; artigo e páginas prontos.", status: "Em andamento" },
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
    { passo: "Páginas que mais dão tráfego", report: "domain_organic_unique", params: "{ database:'br', domain:'raphaelnutri.com', display_sort:'tr_desc' }" },
    { passo: "Palavras PAGAS de um concorrente", report: "domain_adwords", params: "{ database:'br', domain:'raphaelnutri.com', display_sort:'tr_desc' }" },
    { passo: "Concorrentes de PAGO do site", report: "domain_adwords_adwords", params: "{ database:'br', domain:'fabriciomoura.com' }" },
    { passo: "Cópias de anúncio de um concorrente", report: "domain_adwords_unique", params: "{ database:'br', domain:'raphaelnutri.com' }" },
    { passo: "Quem compra um termo no Ads", report: "phrase_adwords", params: "{ database:'br', phrase:'nutricionista online' }" },
    { passo: "CPC/competição de termos-alvo", report: "phrase_these", params: "{ database:'br', phrase:'nutricionista online;nutricionista esportivo;...' }" }
  ],

  // ---- Entregáveis da Fase 4 (ativos de SEO produzidos) ----
  entregaveis: [
    { tipo: "Ferramenta", nome: "Calculadora de IMC e Gasto Calórico", url: "fabriciomoura.com/calculadora-de-imc-e-calorias", kw: "calculadora de imc", kdi: null, status: "Publicada + indexada", arquivo: "ferramentas/calculadora.html",
      nota: "IMC + gasto calórico (Mifflin-St Jeor), aviso músculo×gordura, meta de proteína, prova social, FAQ + schema, texto de apoio, CTA WhatsApp. Identidade premium preto+ouro. Score Rank Math 76/100." },
    { tipo: "Artigo", nome: "Cardápio para quem toma Mounjaro", url: "fabriciomoura.com/cardapio-para-quem-toma-mounjaro", kw: "cardápio para quem toma mounjaro", kdi: 8, status: "Pronto — a publicar", arquivo: "blog/cardapio-para-quem-toma-mounjaro.html",
      nota: "Artigo premium: cardápio exemplo, FAQ + schema, prova social, caixa de autor, links internos, capa. Aviso médico responsável." },
    { tipo: "Página de serviço", nome: "Nutricionista Esportivo", url: "fabriciomoura.com/nutricionista-esportivo", kw: "nutricionista esportivo", kdi: 10, status: "Guia pronto — a montar", arquivo: "paginas/nutricionista-esportivo-GUIA.md (+ versão premium de referência)",
      nota: "Quick win nº1 (KDI 10 + vol 5.400). Guia de→para pra clonar a página de vendas + estrutura técnica de SEO. Versão premium pronta como referência." },
    { tipo: "Página de serviço", nome: "Nutricionista Online", url: "fabriciomoura.com/nutricionista-online", kw: "nutricionista online", kdi: 28, status: "Guia pronto — a montar", arquivo: "paginas/nutricionista-online-GUIA.md",
      nota: "Casa com plano à distância (vol 6.600). Ângulo '100% online'. Guia de→para + estrutura técnica de SEO." },
    { tipo: "Artigo", nome: "Creatina engorda? O que acontece com o seu peso", url: "fabriciomoura.com/creatina-engorda", kw: "creatina engorda", kdi: 26, status: "Publicado", arquivo: "blog/creatina-engorda.html",
      nota: "Pilar meio de funil (vol 22.200). Cobre o cluster: engorda?, emagrece ou engorda, retém água/definição, como tomar, ciclo, mulher. FAQ+schema, links internos (déficit + nutricionista esportivo + calculadora). Substitui o rascunho creatina-engorda-ou-emagrece.html (mirava só vol 1.900)." },
    { tipo: "Artigo", nome: "6 alimentos ricos em fibras para emagrecer", url: "fabriciomoura.com/alimentos-ricos-em-fibras", kw: "alimentos ricos em fibras", kdi: 29, status: "Publicado", arquivo: "blog/alimentos-ricos-em-fibras.html",
      nota: "Topo de funil — copia a página nº1 de tráfego do concorrente (34%). Lista dos 6 alimentos, cardápio exemplo, FAQ+schema, links internos (calculadora). Publicado via ferramentas/publicar.mjs." },
    { tipo: "Artigo", nome: "Déficit calórico: como calcular e emagrecer de verdade", url: "fabriciomoura.com/deficit-calorico", kw: "déficit calórico", kdi: 24, status: "Publicado", arquivo: "blog/deficit-calorico.html",
      nota: "Topo de funil (vol 22.200). O que é, como calcular (passo a passo + exemplo), quanto pra perder 1 kg, como manter sem perder massa. FAQ+schema, links internos (calculadora + fibras). Keywords do snapshots/2026-06-17.json. Publicado via ferramentas/publicar.mjs." },
    { tipo: "Artigo", nome: "Gordura visceral: o que é, riscos e como reduzir", url: "fabriciomoura.com/gordura-visceral", kw: "gordura visceral", kdi: 22, status: "Publicado", arquivo: "blog/gordura-visceral.html",
      nota: "Pilar topo de funil (vol 22.200). Cobre o cluster: o que é, onde fica, riscos, como medir (cintura), valor ideal, gordura subcutânea x visceral, como reduzir/eliminar. FAQ+schema, links internos (déficit + fibras + calculadora). Keywords do snapshots/2026-06-19.json." },
    { tipo: "Estratégia", nome: "Roadmap orgânico (varredura final Semrush)", url: "docs/ROADMAP-ORGANICO.md", kw: "—", kdi: null, status: "Pronto", arquivo: "docs/ROADMAP-ORGANICO.md",
      nota: "Última análise antes de cancelar o Semrush (2026-06-19). Fila priorizada por volume×KDI, estratégia de pilar por intenção, banco de keywords dos próximos artigos e ações de GSC. Dados brutos em snapshots/2026-06-19.json." },
    { tipo: "SEO técnico", nome: "Disavow de backlinks tóxicos", url: "trafego/disavow.txt", kw: "—", kdi: null, status: "Pronto — subir no GSC", arquivo: "trafego/disavow.txt",
      nota: "Perfil de backlinks quase todo spam (~97 domínios: diretórios, link networks, encurtadores). Arquivo pronto pra upload no Google Search Console (Disavow Tool) — manda o Google ignorar todos." }
  ],

  // ---- Infraestrutura de SEO configurada (no WordPress / Google) ----
  infra: [
    { item: "Google Search Console", status: "Verificado (tag via Rank Math)", nota: "Propriedade verificada; coletando dados. Usar 'Inspeção de URL' para solicitar indexação de cada página nova." },
    { item: "Rank Math SEO", status: "Instalado e ativo", nota: "Title/meta/slug/schema por página. Não perseguir 100/100 — foco em título, descrição, palavra-chave, links internos." },
    { item: "Google Site Kit", status: "Plugado", nota: "Conecta Search Console + Analytics no painel do WordPress." },
    { item: "Sitemap", status: "Enviar sitemap_index.xml no Search Console", nota: "Rank Math gera automático; entregar ao Google uma vez." },
    { item: "Tema Astra", status: "Por página: Sidebar = Nenhuma + Desativar título", nota: "Necessário nas páginas com widget HTML full-bleed para não sobrar barra branca / título duplicado." }
  ],

  // ---- Conta real de Google Ads (export 15/05–13/06, CPA real) ----
  conta_real_ads: {
    periodo: "15/05–13/06/2026",
    investimento_mes: "≈ R$ 34,2 mil",
    cpa_medio: "R$ 19,31 por conversa (lead WhatsApp)",
    leitura: "Conta eficiente e bem gerida — desperdício mínimo (~1%). 'nutricionista online' = 60% da verba a CPA R$ 19. Cidades, convênios (reembolso) e termos de bodybuilder convertem bem. Maior alavanca de crescimento NÃO é cortar pago (já no teto), é construir o ORGÂNICO (hoje zero), onde o lead sai a ~R$ 0.",
    acao: "Único teste que vale: message match (apontar 'nutricionista online' e 'nutricionista esportivo' para as páginas dedicadas). Detalhe em trafego/brief-gestor-2026-06.md."
  }
};
