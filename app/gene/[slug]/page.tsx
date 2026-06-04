import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getGeneBySlug,
  getGeneSlugs,
  getSiteContent,
} from "../../../sanity/fetch";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import GeneBody from "../../../components/GeneBody";
import { ArrowRight } from "../../../components/Icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getGeneSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const gene = await getGeneBySlug(slug);
  if (!gene) return { title: "Gene not found" };

  const def = gene.oneLine || gene.indexLine;
  const title = gene.nickname
    ? `${gene.symbol} — ${gene.nickname}`
    : `${gene.symbol} gene`;
  return {
    title,
    description: def,
    keywords: [
      gene.symbol,
      `${gene.symbol} gene`,
      `what does ${gene.symbol} do`,
      `${gene.symbol} meaning`,
      gene.nickname ?? "",
      gene.fullName ?? "",
      gene.categoryTitle ?? "",
      "genetics India",
    ].filter(Boolean),
    openGraph: { title, description: def, type: "article" },
  };
}

export default async function GenePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [gene, content] = await Promise.all([
    getGeneBySlug(slug),
    getSiteContent(),
  ]);
  if (!gene) notFound();

  const def = gene.oneLine || gene.indexLine;

  // Build FAQ + DefinedTerm structured data for answer engines.
  const faqs: { q: string; a: string }[] = [];
  faqs.push({
    q: `What does the ${gene.symbol} gene do?`,
    a: gene.whatItDoes || def,
  });
  if (gene.variants)
    faqs.push({ q: `Which ${gene.symbol} variants matter?`, a: gene.variants });
  if (gene.ifYouCarry)
    faqs.push({
      q: `What does it mean if you carry the ${gene.symbol} variant?`,
      a: gene.ifYouCarry,
    });
  if (gene.indiaRelevance)
    faqs.push({
      q: `Why does ${gene.symbol} matter in India?`,
      a: gene.indiaRelevance,
    });

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      name: gene.symbol,
      alternateName: gene.nickname,
      description: def,
      inDefinedTermSet: {
        "@type": "DefinedTermSet",
        name: "knowourgenes.com · the A-to-Z encyclopedia of your genes",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <SiteNav content={content} />

      <main>
        <section className="gene section">
          <div className="container gene__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <Link href="/a-z">A–Z</Link>
              {gene.categorySlug ? (
                <>
                  <span className="breadcrumb__sep">/</span>
                  <Link href={`/category/${gene.categorySlug}`}>
                    {gene.categoryTitle}
                  </Link>
                </>
              ) : null}
            </nav>

            <div className="gene__tags">
              {gene.categoryTitle ? (
                <Link
                  href={`/category/${gene.categorySlug}`}
                  className="tag tag--cat"
                >
                  {gene.categoryTitle}
                </Link>
              ) : null}
              {gene.nickname ? (
                <span className="tag tag--known">{gene.nickname}</span>
              ) : null}
            </div>

            <h1 className="gene__symbol">{gene.symbol}</h1>
            {gene.fullName ? (
              <p className="gene__fullname">{gene.fullName}</p>
            ) : null}

            <div className="gene__def">
              <span className="gene__def-label">{gene.symbol} in one line</span>
              {def}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <GeneBody gene={gene} globalCaveat={content.globalCaveat} />

            <Link
              href="/a-z"
              className="btn btn--primary"
              style={{ marginBottom: 56 }}
            >
              Browse all gene entries
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
