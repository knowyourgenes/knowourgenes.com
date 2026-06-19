import type { MetadataRoute } from "next";
import { siteConfig } from "../lib/siteConfig";
import { getAllGenes, getCategorySitemapItems } from "../sanity/fetch";

const BASE = siteConfig.siteUrl;

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE}/a-z`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
  ];

  // CMS-driven routes. Wrapped so the static routes still emit if Sanity is down.
  let categoryRoutes: MetadataRoute.Sitemap = [];
  let geneRoutes: MetadataRoute.Sitemap = [];
  try {
    const [categories, genes] = await Promise.all([
      getCategorySitemapItems(),
      getAllGenes(),
    ]);

    categoryRoutes = categories.map((c) => ({
      url: `${BASE}/category/${c.slug}`,
      lastModified: c.publishedAt ? new Date(c.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    geneRoutes = genes.map((g) => ({
      url: `${BASE}/gene/${g.slug}`,
      lastModified: g.publishedAt ? new Date(g.publishedAt) : now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch (err) {
    console.warn("[sitemap] CMS fetch failed, emitting static routes only:", err);
  }

  // Dedupe by URL.
  const seen = new Set<string>();
  return [...staticRoutes, ...categoryRoutes, ...geneRoutes].filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
