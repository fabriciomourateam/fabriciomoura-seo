import Image from "next/image";
import { notFound } from "next/navigation";
import TopNav from "../components/TopNav";
import BlogCard, { ScriptBlJs } from "../components/BlogCard";
import BlogFx from "../components/BlogFx";
import { getPost, listPosts, relacionados, postUrl, dataBR, canonicalUrl, SITE, FOTO, WA_LINK } from "@/lib/blog";
import { limparHtml } from "@/lib/blog-html";

export const dynamicParams = false;
export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

// Mesma pessoa dos dados estruturados do site principal
const AUTOR = { "@type": "Person", "@id": "https://fabriciomoura.com/#fabricio-moura", name: "Fabricio Moura", url: "https://fabriciomoura.com/sobre/" };

const Whats = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.866 9.866 0 001.51 5.26l-.999 3.648 3.978-1.607z" /></svg>
);

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const title = p.seoTitle || `${p.title} | Fabricio Moura`;
  const url = canonicalUrl(p);
  return {
    title: { absolute: title },
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      title, description: p.description, url, type: "article", locale: "pt_BR",
      publishedTime: p.date, modifiedTime: p.modified, ...(p.image ? { images: [p.image] } : {}),
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();

  const outros = relacionados(p, listPosts());
  const url = canonicalUrl(p);
  const ld = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description,
      ...(p.image ? { image: [p.image] } : {}), datePublished: p.date, dateModified: p.modified,
      mainEntityOfPage: url, url, inLanguage: "pt-BR",
      author: AUTOR, publisher: AUTOR,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Blog", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: p.title, item: url },
      ],
    },
  ];

  return (
    <div className="bl bl--post">
      <ScriptBlJs />
      <div className="bl-progress" aria-hidden="true" />
      <TopNav inicio variant="blog" />
      <main id="conteudo" className="blog-post">
        <div dangerouslySetInnerHTML={{ __html: limparHtml(p.content) }} />
        <p className="bl-pubdate">Publicado em {dataBR(p.date)} · por Fabricio Moura</p>
        <div className="bl-wrap-narrow">
          {p.medicamento && (
            <div className="bl-aviso" role="note">
              <strong>Conteúdo informativo, escrito por nutricionista.</strong> Não substitui avaliação médica. Medicamentos e hormônios só devem ser usados com prescrição e acompanhamento médico.
            </div>
          )}
          <aside className="bl-autor bl-autor--post" aria-label="Sobre o autor">
            <div className="bl-autor__core">
              <div className="bl-autor__foto">
                <Image src={FOTO} alt="Fabricio Moura, nutricionista e treinador" width={160} height={160} unoptimized />
              </div>
              <div>
                <p className="bl-autor__nome">Fabricio Moura</p>
                <p className="bl-autor__cargo">Nutricionista e treinador · 18 anos de experiência</p>
              </div>
              <a className="bl-btn" href={WA_LINK}>
                Falar com o Fabricio<span className="bl-ico"><Whats /></span>
              </a>
            </div>
          </aside>
        </div>
        {outros.length > 0 && (
          <section className="bl-wrap bl-rel" aria-labelledby="leia-tambem">
            <div className="bl-rel__head bl-reveal">
              <p className="bl-eyebrow">Continue lendo</p>
              <h2 id="leia-tambem">Leia <span className="bl-gold">também</span></h2>
            </div>
            <div className="bl-rel__grid">
              {outros.map((o, i) => <BlogCard key={o.slug} post={o} i={i} />)}
            </div>
            <p className="bl-rel__all bl-reveal">
              <a className="bl-btn bl-btn--ghost" href="/">Ver todos os artigos<span className="bl-ico">→</span></a>
            </p>
          </section>
        )}
      </main>
      <BlogFx />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </div>
  );
}
