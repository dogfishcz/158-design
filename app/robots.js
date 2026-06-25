import { SITE_URL } from "@/lib/seo";

// /robots.txt: povolit vše (včetně AI botů jako GPTBot, PerplexityBot, ClaudeBot),
// zakázat jen interní API. Odkaz na sitemapu.
export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
