# Incidente de segurança — invasão do WordPress (redirect adulto + spam de SEO)

**Data do relato:** 29/07/2026
**Site afetado:** `fabriciomoura.com` (WordPress em hospedagem Hostinger, LiteSpeed)
**Status:** contido. Falta fechar a porta de entrada (Elementor Pro pirata).

---

## Resumo do que aconteceu

O WordPress de `fabriciomoura.com` foi invadido por volta de **27/07/2026**. Foram
dois golpes simultâneos, típicos de infecção **automatizada por bot** (não foi ataque
pessoal — foi um robô que varre a internet atrás de sites vulneráveis, por dinheiro):

1. **Redirect malicioso (cloaking):** visitantes que chegavam pelo Instagram/Google,
   no celular, eram jogados para um site adulto. Não aparecia para quem estava logado
   ou digitava a URL direto — por isso o dono não via, mas os alunos viam.
2. **Injeção de spam de SEO ("parasita"):** ~980 páginas falsas em alemão (clone
   raspado da rede alemã *Rossmann* — produtos/farmácia), sob o prefixo `/de/` e
   algumas na raiz (`/Nome-Produto/123456`), usando a autoridade do domínio para
   ranquear no Google. Apareciam com € e estrelinhas (dados estruturados de produto).

**O código dos repositórios (`fabriciomoura-seo` e `vira-los`) está LIMPO** — foi
auditado inteiro. A invasão foi 100% na instalação WordPress / hospedagem.

## Causa raiz (a "porta de entrada")

**Elementor Pro pirata (nulled).** O plugin **`PRO Elements`** (de PROElements.org)
estava ativo desbloqueando o **Elementor Pro** sem licença (status "Missing"). Plugins
nulled costumam vir com **backdoor embutido** — esse é o vetor nº 1 desse tipo de
invasão. Como o pirata já existia antes do backup limpo, o backdoor **sobrevive à
restauração**: enquanto o `PRO Elements` estiver instalado, a porta segue destrancada.

## Linha do tempo (via mensagens do Search Console)
- **20/07** — site saudável (mensagens normais/positivas).
- **22/07 11:18** — backup limpo da Hostinger (usado na restauração).
- **27/07** — 1º sinal ("motivos impedem indexação").
- **28–29/07** — "Snippets do produto" e "Listagens do comerciante" = as páginas de
  spam de produto injetadas.

---

## O que já foi feito ✅
- Wordfence instalado; `wp-includes/load.php` (adulterado) **reparado** e o arquivo
  plantado `query-pagination-numbers-avatar.php` removido.
- Pasta `/fashion` (do invasor) apagada.
- **Restauração completa (arquivos + banco) para o backup de 22/07.**
- Senhas do **wp-admin** e da **Hostinger** trocadas.
- Search Console: removção do prefixo `/de/` solicitada (~6 meses) + reindexação dos
  artigos principais.
- Confirmado limpo: `wp-config.php`, `.htaccess`, `.private/` (Hostinger),
  `default.php` (página padrão Hostinger), `.htaccess.bk`, e o mu-plugin
  `rank-math-rest-meta.php` (**é nosso**, necessário para a automação — NÃO apagar).
- Confirmado: **sem ação manual / sem penalização** do Google.

## O que FALTA fazer (prioridade)
1. **Fechar a porta — Elementor Pro pirata:**
   - Comprar licença oficial em elementor.com (~US$59/ano);
   - **Excluir** `PRO Elements` e o `Elementor Pro` pirata;
   - Instalar o **Elementor Pro oficial** e ativar a licença. (Os designs ficam salvos
     no banco — não se perdem.)
2. **Novo scan de malware** depois de remover o pirata (Monarx da Hostinger ou
   Wordfence) → precisa dar limpo.
3. **Atualizar** os plugins legítimos pendentes (Rank Math, Jetpack, Site Kit,
   UpdraftPlus, Header Footer Code Manager, All-in-One WP Migration) — backup antes.
4. **Excluir** plugins inativos sem uso (PixelYourSite, Smush, WP Super Cache) e
   consolidar backup em uma ferramenta só. Revisar a "All-in-One WP Migration
   Unlimited Extension" (também costuma ser distribuída pirata).
5. **Ligar atualização automática** do core pelo **hPanel** (o plugin Hostinger Smart
   Auto Updates controla isso, não o wp-admin).
6. Reforço de credenciais: trocar senha do **banco** e do **FTP/SSH**.

## Detecção — como flagrar o redirect (ele se esconde do dono)
O malware poupa quem está logado / no IP de sempre / digitando a URL. Para reproduzir:
celular de outra pessoa, **aba anônima**, **4G (não o Wi-Fi de casa)**, e **clicando
pelo link da bio do Instagram** (o referrer é o gatilho). Ferramentas: `sitecheck.sucuri.net`,
`virustotal.com` (URL), e a busca `site:fabriciomoura.com` no Google.

> ⚠️ O "verde" do Sucuri (scanner externo) NÃO garante limpo — ele entra como
> desktop anônimo e o vírus é disfarçado. Quem vale para arquivos é o Wordfence/Monarx.

## Prevenção (para não repetir)
- **Nunca** usar plugin/tema pirata (nulled). Foi a causa aqui.
- Manter WordPress + plugins + tema **sempre atualizados** (auto-update ligado).
- Apagar plugin/tema que não usa (menos superfície de ataque).
- Senha forte + **2FA** (Wordfence Login Security).
- Manter Wordfence com **Firewall (WAF)** ativo.
- Backups automáticos (foi o backup da Hostinger que salvou agora).

## Ações concluídas (sessão de 29/07)
- Backup completo via UpdraftPlus (29/07 13:32).
- Malware removido/confirmado limpo pelo Wordfence e pelo Monarx (Hostinger):
  `wp-includes/load.php` (reparado) e arquivos plantados em `wp-includes/blocks/`
  (`post-featured-image-blocks.php`, `query-pagination-numbers-avatar.php`) removidos.
  Nenhum arquivo malicioso novo desde o restore.
- Restauração completa (arquivos + banco) para o backup de 22/07.
- Senhas trocadas: wp-admin + Hostinger.
- Plugins legítimos atualizados: Rank Math (1.0.275), Jetpack (16.0.1), Site Kit
  (1.184.0), UpdraftPlus (1.26.6), Header Footer Code Manager (1.1.46).
- Plugins pirata/redundantes removidos: All-in-One WP Migration (+ Unlimited
  Extension), Autoptimize.
- **Wordfence Firewall (WAF) ativo e "Enabled and Protecting"** — principal proteção
  contra novas tentativas de exploração.
- Search Console: remoção do prefixo `/de/` + reindexação dos artigos principais.

## Decisão sobre o Elementor Pro (em aberto → risco residual aceito)
O dono optou por **não** comprar a licença oficial por ora. Como o site depende
estruturalmente do Pro (widget "Post Content" renderiza o corpo de todas as páginas;
"Nav Menu" monta o menu), **não é seguro simplesmente remover** sem reconstruir essas
partes no Elementor free/Astra. Situação atual: **mantém o Elementor Pro pirata, com o
WAF do Wordfence mitigando.** Risco reduzido, não eliminado — se reinfectar, revisar
entre comprar o oficial (~US$59/ano) ou reconstruir. Não atualizar Elementor/Elementor
Pro pelo painel da Hostinger (quebra o "destrave" e derruba o site).

## Efeito colateral do restore: página `/renovacao`
A restauração ao dia 22/07 removeu páginas criadas depois dessa data (ex.:
`fabriciomoura.com/renovacao`). Recuperar via: Lixeira/Rascunhos do WordPress, ou
staging a partir de um backup de 27–29/07 (sem restaurar o backup infectado no site
ao vivo), ou recriar. Páginas feitas à mão no WP vivem só no banco — não estão no git.

## Monitoramento — próximas semanas
- Semanal: Search Console → "Segurança e ações manuais" (manter limpo).
- A cada 2–3 dias: busca `site:fabriciomoura.com` no Google (o total deve cair).
- Semanal: scan Wordfence/Monarx (0 resultados).
- Confirmar backups automáticos da Hostinger ativos.
- Pedir a um aluno testar o link da bio (celular, anônima, via Instagram) — sem redirect.

## Impacto na automação de blog
Nenhum. A publicação automática usa a **Application Password** (segredo
`WP_APP_PASSWORD` no GitHub) + o mu-plugin `rank-math-rest-meta.php`. Reparos, restore
e troca da senha de login **não afetam** isso. Se algum dia a automação falhar por
autenticação, basta gerar uma nova Application Password e atualizar o segredo no GitHub.
