import { getClient } from "./client";
import { isSanityConfigured } from "./env";
import {
  homepageQuery,
  categoriesQuery,
  genesIndexQuery,
  featuredGenesQuery,
  geneSlugsQuery,
  geneBySlugQuery,
  categorySlugsQuery,
  categoryBySlugQuery,
} from "./queries";

export type NavLink = { label: string; href: string };

export type GeneCard = {
  slug: string;
  symbol: string;
  fullName?: string;
  nickname?: string;
  indexLine: string;
  oneLine?: string;
  featured?: boolean;
  featuredLabel?: string;
  order?: number;
  categoryTitle?: string;
  categorySlug?: string;
};

export type RelatedGene = {
  slug: string;
  symbol: string;
  nickname?: string;
  indexLine?: string;
};

export type GeneFull = GeneCard & {
  whatItDoes?: string;
  variants?: string;
  ifYouCarry?: string;
  indiaRelevance?: string;
  honestCaveat?: string;
  related?: string[];
  relatedGenes?: RelatedGene[];
};

export type Category = {
  slug: string;
  title: string;
  blurb?: string;
  geneList?: string;
  iconKey?: string;
  order: number;
  count: number;
};

export type CategoryWithGenes = {
  slug: string;
  title: string;
  blurb?: string;
  geneList?: string;
  iconKey?: string;
  genes: GeneCard[];
};

export type HomepageContent = {
  brandName: string;
  brandTld: string;
  tagline: string;
  navLinks: NavLink[];
  navCtaLabel?: string;
  navCtaHref?: string;
  heroEyebrow: string;
  heroHeadline: string;
  heroSubhead: string;
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaHref: string;
  heroSecondaryLabel: string;
  searchPlaceholder: string;
  categoriesTitle: string;
  categoriesIntro: string;
  howTitle: string;
  howBody: string;
  featuredTitle: string;
  featuredIntro: string;
  indexTitle: string;
  indexIntro: string;
  globalCaveat: string;
  newsletterTitle: string;
  newsletterBody: string;
  newsletterPlaceholder: string;
  newsletterCta: string;
  missionLine: string;
  footerLinks: NavLink[];
  footerCopy: string;
};

export type HomeData = {
  content: HomepageContent;
  categories: Category[];
  featured: GeneCard[];
  genes: GeneCard[];
};

function ensureClient() {
  const client = getClient();
  if (!isSanityConfigured || !client) {
    throw new Error(
      "Sanity is not configured. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env, then run `pnpm seed`.",
    );
  }
  return client;
}

export async function getHomeData(): Promise<HomeData> {
  const client = ensureClient();
  const [content, categories, featured, genes] = await Promise.all([
    client.fetch<HomepageContent | null>(homepageQuery),
    client.fetch<Category[]>(categoriesQuery),
    client.fetch<GeneCard[]>(featuredGenesQuery),
    client.fetch<GeneCard[]>(genesIndexQuery),
  ]);
  if (!content)
    throw new Error("No homepage document found in Sanity. Run `pnpm seed`.");
  return {
    content,
    categories: categories ?? [],
    featured: featured ?? [],
    genes: genes ?? [],
  };
}

export async function getSiteContent(): Promise<HomepageContent> {
  const client = ensureClient();
  const content = await client.fetch<HomepageContent | null>(homepageQuery);
  if (!content) throw new Error("No homepage document found. Run `pnpm seed`.");
  return content;
}

export async function getAllGenes(): Promise<GeneCard[]> {
  const client = ensureClient();
  return (await client.fetch<GeneCard[]>(genesIndexQuery)) ?? [];
}

export async function getGeneSlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(geneSlugsQuery)) ?? [];
}

export async function getGeneBySlug(slug: string): Promise<GeneFull | null> {
  const client = ensureClient();
  return await client.fetch<GeneFull | null>(geneBySlugQuery, { slug });
}

export async function getCategorySlugs(): Promise<string[]> {
  const client = getClient();
  if (!isSanityConfigured || !client) return [];
  return (await client.fetch<string[]>(categorySlugsQuery)) ?? [];
}

export async function getCategoryBySlug(
  slug: string,
): Promise<CategoryWithGenes | null> {
  const client = ensureClient();
  return await client.fetch<CategoryWithGenes | null>(categoryBySlugQuery, {
    slug,
  });
}
