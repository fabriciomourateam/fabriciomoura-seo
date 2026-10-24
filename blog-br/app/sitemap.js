import { listPosts, SITE } from "@/lib/posts";
export default function sitemap() {
  const posts = listPosts();
  return [
    { url: SITE + "/", lastModified: posts[0] ? new Date(posts[0].modified || posts[0].date) : new Date() },
    ...posts.map((p) => ({ url: `${SITE}/${p.slug}/`, lastModified: new Date(p.modified || p.date) })),
  ];
}
