import { listPosts } from "@/lib/posts";
import PostCard from "./components/Cards";
import AuthorBox from "./components/AuthorBox";

export default function Home() {
  const posts = listPosts();
  return (
    <main className="bl-home">
      <section className="bl-wrap bl-hero">
        <div>
          <p className="bl-eyebrow">Blog</p>
          <h1>Blog do <span className="bl-gold">Fabricio Moura</span></h1>
          <p className="bl-hero__sub">Artigos de nutrição esportiva sobre medicamentos para emagrecer, hormônios e saúde, escritos pelo nutricionista Fabricio Moura (CRN3 95563/P).</p>
        </div>
      </section>
      <section className="bl-wrap bl-home-grid" aria-label="Artigos">
        {posts.map((p) => <PostCard key={p.slug} post={p} />)}
      </section>
      <div className="bl-wrap"><AuthorBox /></div>
    </main>
  );
}
