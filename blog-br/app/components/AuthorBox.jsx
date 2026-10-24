import { INSTAGRAM, WHATS } from "@/lib/posts";

export default function AuthorBox({ className = "" }) {
  return (
    <aside className={`bl-autor ${className}`} aria-label="Sobre o autor">
      <div className="bl-autor__core">
        <div>
          <p className="bl-autor__nome">Fabricio Moura</p>
          <p className="bl-autor__cargo">Fabricio Moura, Nutricionista Esportivo (CRN3 95563/P) e Educador Físico (CREF 201974-G/SP)</p>
        </div>
        <div className="bl-autor__links" style={{ gridColumn: "1 / -1" }}>
          <a className="ig" href={INSTAGRAM} target="_blank" rel="noopener">Me acompanhe no Instagram @fabriciomourateam</a>
          <a className="bl-btn" href={WHATS} target="_blank" rel="noopener">Falar no WhatsApp<span className="bl-ico" aria-hidden="true">→</span></a>
        </div>
      </div>
    </aside>
  );
}
