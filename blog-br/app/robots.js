import { SITE } from "@/lib/blog";
export default function robots() {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: `${SITE}/sitemap.xml` };
}
