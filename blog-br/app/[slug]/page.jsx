import { notFound } from "next/navigation";
import { listPosts, getPost, relacionados, limparHtml, dataBR, postUrl, SITE } from "@/lib/posts";
import PostCard from "../components/Cards";
import AuthorBox from "../components/AuthorBox";

export const dynamicParams = false;
export function generateStaticParams() {
  return listPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return {};
  const title = p.seoTitle || `${p.title} | Fabricio Moura`;
  const url = SITE + postUrl(p.slug);
  return {
    title: { absolute: title },
    description: p.description,
    alternates: { canonical: url },
    openGraph: {
      title, description: p.description, url, type: "article", locale: "pt_BR",
      publishedTime: p.date, modifiedTime: p.modified || p.date, ...(p.image ? { images: [p.image] } : {}),
    },
    robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) notFound();
  const outros = relacionados(p);
  const url = SITE + postUrl(p.slug);
  const autor = { "@type": "Person", name: "Fabricio Moura", jobTitle: "Nutricionista Esportivo", identifier: "CRN3 95563/P", sameAs: ["https://www.instagram.com/fabriciomourateam/"] };
  const ld = [
    {
      "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description,
      ...(p.image ? { image: [p.image] } : {}), datePublished: p.date, dateModified: p.modified || p.date,
      mainEntityOfPage: url, url, inLanguage: "pt-BR", author: autor, publisher: autor,
    },
    {
      "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE + "/" },
        { "@type": "ListItem", position: 2, name: p.title, item: url },
      ],
    },
  ];
  return (
    <div className="bl--post">
      <div className="bl-progress" aria-hidden="true" />
      <main id="conteudo" className="blog-post">
        <div dangerouslySetInnerHTML={{ __html: limparHtml(p.content) }} />
        <p className="bl-pubdate">Publicado em {dataBR(p.date)} · por Fabricio Moura</p>
        <div className="bl-wrap-narrow">
          <div className="bl-aviso" role="note">
            <strong>Conteúdo informativo, escrito por nutricionista.</strong> Não substitui avaliação médica. Medicamentos e hormônios só devem ser usados com prescrição e acompanhamento médico.
          </div>
          <AuthorBox className="bl-autor--post" />
        </div>
        {outros.length > 0 && (
          <section className="bl-wrap bl-rel" aria-labelledby="leia-tambem">
            <div className="bl-rel__head">
              <p className="bl-eyebrow">Continue lendo</p>
              <h2 id="leia-tambem">Leia <span className="bl-gold">também</span></h2>
            </div>
            <div className="bl-rel__grid">
              {outros.map((o) => <PostCard key={o.slug} post={o} />)}
            </div>
            <p className="bl-rel__all"><a className="bl-btn bl-btn--ghost" href="/">Ver todos os artigos<span className="bl-ico" aria-hidden="true">→</span></a></p>
          </section>
        )}
      </main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld).replace(/</g, "\\u003c") }} />
    </div>
  );
}
