export const metadata = { title: "Página não encontrada", robots: { index: false, follow: false } };
export default function NotFound() {
  return (
    <main className="bl-notfound">
      <h1>Página não encontrada</h1>
      <p>O endereço que você acessou não existe ou o artigo foi removido.</p>
      <a className="bl-btn" href="/">Ver todos os artigos<span className="bl-ico" aria-hidden="true">→</span></a>
    </main>
  );
}
