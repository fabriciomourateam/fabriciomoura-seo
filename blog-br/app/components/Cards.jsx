import { postUrl, dataCurta } from "@/lib/posts";

export default function PostCard({ post }) {
  return (
    <a href={postUrl(post.slug)} className="bl-card">
      <article className="bl-card__core">
        {post.image && <img className="bl-card__img" src={post.image} alt="" loading="lazy" />}
        <div className="bl-card__top"><time dateTime={post.date}>{dataCurta(post.date)}</time></div>
        <h3 className="bl-card__t">{post.title}</h3>
        {post.description && <p className="bl-card__d">{post.description}</p>}
        <span className="bl-card__go">Ler artigo<span className="bl-ico" aria-hidden="true">→</span></span>
      </article>
    </a>
  );
}
