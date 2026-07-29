# Incidente: site redirecionando para conteúdo adulto

**Data do relato:** 29/07/2026
**Sintoma:** ao clicar no link do site (`fabriciomoura.com`), o visitante é levado
para um site adulto ("uma mulher tirando a roupa"). Uma aluna reportou e enviou vídeo.

---

## O que aconteceu (resumo direto)

O **site WordPress `fabriciomoura.com` foi invadido**. Alguém injetou um código de
redirecionamento malicioso na instalação do WordPress (arquivos, banco de dados,
tema, plugin ou `.htaccess`). Esse código manda parte dos visitantes para um site
adulto/spam.

**O código deste repositório está LIMPO.** Foi auditado inteiro:

- `index.html`, `pagina-links.html`, `blog/`, `paginas/` — **sem** `window.location`,
  `location.href`, `meta refresh`, `eval`, `atob`, `document.write` ou base64 ofuscado.
- Todos os botões da página de links apontam só para `fabriciomoura.com` e `wa.me`.
- Os únicos scripts externos são Google Fonts, Tailwind CDN e Chart.js — legítimos.

Ou seja: **o problema NÃO está no HTML que você cola no WordPress.** Está na
instalação/hospedagem do WordPress em si. Republicar a página de links **não resolve**.

## Por que VOCÊ pode não ver, mas a aluna viu

Esse tipo de malware quase sempre usa "cloaking" (disfarce). Ele **só redireciona
em algumas condições** para não ser descoberto:

- Só quem chega pelo **Google / Instagram / link** (checa o "referrer").
- Só no **celular**.
- Só na **primeira visita** (depois grava um cookie e para).
- **Não** redireciona quem está **logado no WordPress** (por isso o dono não vê).
- **Bloqueia robôs/ferramentas** (a tentativa de checagem automática deu 403).

Por isso você digita a URL e "está tudo normal", mas a aluna clicou no link da bio
no celular e caiu no site adulto.

---

## O que fazer AGORA (ordem de prioridade)

### 1. Trocar TODAS as senhas
- Senha do painel WordPress (todos os usuários admin).
- Senha do **cPanel/hospedagem** e do **FTP/SFTP**.
- Senha do **banco de dados** (e atualizar no `wp-config.php`).
- E-mail associado à conta.

### 2. Procurar e remover usuários admin falsos
Painel → Usuários. Apague qualquer administrador que você não reconheça.

### 3. Verificar os pontos onde o malware costuma se esconder
Peça para a hospedagem ou um técnico checar:
- `wp-config.php` e `.htaccess` (redirects e código estranho no topo).
- `wp_options` no banco: campos **`siteurl`** e **`home`** devem ser
  `https://fabriciomoura.com` (malware às vezes troca por outro domínio).
- Tabela `wp_options` → chaves com JavaScript injetado.
- `functions.php` do tema ativo.
- Arquivos `.php` recém-modificados em `wp-content/uploads/` (não deveria haver PHP lá).
- Plugins piratas/nulled — causa nº 1 desse tipo de invasão. Remover.

### 4. Rodar um scanner e limpar
- Instalar **Wordfence** (grátis) → Scan. Ou **Sucuri**.
- Ideal: pedir à hospedagem um **restore de backup anterior à invasão** e, em cima
  dele, atualizar WordPress + tema + plugins e trocar senhas.
- Se possível, contratar limpeza profissional (Sucuri/Wordfence oferecem).

### 5. Depois de limpo — prevenir
- Manter WordPress, tema e plugins **sempre atualizados**.
- **Nunca** usar plugin/tema pirata (nulled).
- Ativar **2FA** no login e limitar tentativas de login (Wordfence faz).
- Backup automático diário.
- Pedir ao Google Search Console uma **revisão de segurança** (se o Google marcou
  o site como "enganoso", isso remove o aviso depois da limpeza).

---

## Como confirmar que resolveu

Peça para alguém (de preferência a própria aluna) **abrir o link da bio no celular,
por uma aba anônima, vindo do Instagram**. Se não redirecionar mais, foi limpo.
Teste algumas vezes — o malware às vezes redireciona 1 a cada N visitas.

---

**Conclusão:** não é erro do código nem da página de links deste repositório — é uma
**invasão do WordPress**, que precisa ser limpa direto na hospedagem/instalação.
