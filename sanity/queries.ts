import { groq } from "next-sanity";

const geneCard = `{
  "slug": slug.current,
  symbol,
  fullName,
  nickname,
  indexLine,
  oneLine,
  featured,
  featuredLabel,
  order,
  "categoryTitle": category->title,
  "categorySlug": category->slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt)
}`;

export const homepageQuery = groq`*[_type == "homepage"] | order(_updatedAt desc)[0] {
  brandName, brandTld, tagline,
  navLinks[]{ label, href },
  navCtaLabel, navCtaHref,
  heroEyebrow, heroHeadline, heroSubhead,
  heroPrimaryCtaLabel, heroPrimaryCtaHref, heroSecondaryLabel, searchPlaceholder,
  categoriesTitle, categoriesIntro,
  howTitle, howBody,
  featuredTitle, featuredIntro,
  indexTitle, indexIntro, globalCaveat,
  newsletterTitle, newsletterBody, newsletterPlaceholder, newsletterCta,
  missionLine,
  footerLinks[]{ label, href },
  footerCopy
}`;

export const categoriesQuery = groq`*[_type == "category"] | order(order asc) {
  "slug": slug.current,
  title, blurb, geneList, iconKey, order,
  "count": count(*[_type == "gene" && references(^._id)])
}`;

export const genesIndexQuery = groq`*[_type == "gene"] | order(symbol asc) ${geneCard}`;

export const featuredGenesQuery = groq`*[_type == "gene" && featured == true] | order(order asc) ${geneCard}`;

export const geneSlugsQuery = groq`*[_type == "gene" && defined(slug.current)][].slug.current`;

export const geneBySlugQuery = groq`*[_type == "gene" && slug.current == $slug][0] {
  "slug": slug.current,
  symbol, fullName, nickname, indexLine, oneLine,
  whatItDoes, variants, ifYouCarry, indiaRelevance, honestCaveat,
  featured, featuredLabel,
  "categoryTitle": category->title,
  "categorySlug": category->slug.current,
  related,
  "relatedGenes": *[_type == "gene" && symbol in ^.related] | order(symbol asc) {
    "slug": slug.current, symbol, nickname, indexLine
  }
}`;

export const categorySlugsQuery = groq`*[_type == "category" && defined(slug.current)][].slug.current`;

export const categorySitemapQuery = groq`*[_type == "category" && defined(slug.current)]{
  "slug": slug.current,
  "publishedAt": coalesce(publishedAt, _updatedAt)
}`;

export const categoryBySlugQuery = groq`*[_type == "category" && slug.current == $slug][0] {
  "slug": slug.current,
  title, blurb, geneList, iconKey,
  "genes": *[_type == "gene" && references(^._id)] | order(symbol asc) ${geneCard}
}`;
