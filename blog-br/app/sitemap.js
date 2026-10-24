import { listPosts, SITE } from "@/lib/blog";
// Só os artigos exclusivos deste domínio (sem canonical para o site principal) + a home
export default function sitemap() {
  const posts = listPosts().filter((p) => !p.canonical);
  return [
    { url: SITE + "/", lastModified: new Date(listPosts()[0]?.modified || Date.now()) },
    ...posts.map((p) => ({ url: `${SITE}/${p.slug}/`, lastModified: new Date(p.modified || p.date) })),
  ];
}
