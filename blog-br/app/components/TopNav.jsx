import { listPosts, postUrl, CALCULADORA } from "@/lib/blog";

// Menu do topo em pílula flutuante (variant="blog"). A lista de artigos é automática: os 8 mais recentes deste blog.
// "Conteúdo Semanal" leva para o índice (home do blog.br). A calculadora fica no site principal.
export default function TopNav({ inicio = false, variant, artigos = true }) {
  const posts = artigos ? listPosts().slice(0, 8) : [];
  return (
    <header className={variant === "blog" ? "topnav topnav--float" : "topnav"}>
      <nav className="topnav__desktop" aria-label="Menu principal">
        {inicio && <><a className="topnav__item" href="/">Início</a><span className="topnav__sep" aria-hidden="true">|</span></>}
        <div className="topnav__item topnav__item--menu">
          <a href="/">Conteúdo Semanal</a>
          {artigos && (
          <ul className="topnav__dropdown">
            {posts.map((p) => <li key={p.slug}><a href={postUrl(p.slug)}>{p.title}</a></li>)}
            <li><a href="/"><b>Ver todos os artigos</b></a></li>
          </ul>
          )}
        </div>
        <span className="topnav__sep" aria-hidden="true">|</span>
        <a className="topnav__item" href={CALCULADORA}>Calculadora de IMC e Calorias</a>
      </nav>
      <details className="topnav__mobile">
        <summary aria-label="Abrir menu"><span /><span /><span /></summary>
        <ul>
          {inicio && <li><a href="/">Início</a></li>}
          <li><a href="/">Conteúdo Semanal</a></li>
          {posts.map((p) => <li key={p.slug} className="sub"><a href={postUrl(p.slug)}>{p.title}</a></li>)}
          {artigos && <li className="sub"><a href="/"><b>Ver todos os artigos</b></a></li>}
          <li><a href={CALCULADORA}>Calculadora de IMC e Calorias</a></li>
        </ul>
      </details>
    </header>
  );
}
