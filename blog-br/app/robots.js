import { SITE } from "@/lib/posts";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE}/sitemap.xml` };
}
