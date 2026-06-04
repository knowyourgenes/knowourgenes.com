import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getSiteContent,
} from "../../../sanity/fetch";
import SiteNav from "../../../components/SiteNav";
import SiteFooter from "../../../components/SiteFooter";
import { ArrowRight } from "../../../components/Icons";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category not found" };
  return {
    title: category.title,
    description:
      category.blurb ||
      `Gene entries in ${category.title}: ${category.geneList ?? ""}`,
    keywords: [
      category.title,
      "genes",
      ...(category.genes ?? []).map((g) => g.symbol),
      "genetics India",
    ],
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [category, content] = await Promise.all([
    getCategoryBySlug(slug),
    getSiteContent(),
  ]);
  if (!category) notFound();

  const genes = category.genes ?? [];

  return (
    <>
      <SiteNav content={content} />

      <main>
        <section className="page-head section">
          <div className="container page-head__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <Link href="/#categories">Categories</Link>
              <span className="breadcrumb__sep">/</span>
              <span>{category.title}</span>
            </nav>
            <h1 className="page-head__title">{category.title}</h1>
            {category.blurb ? (
              <p className="page-head__intro">{category.blurb}</p>
            ) : null}
          </div>
        </section>

        <section className="block section">
          <div className="container">
            <span className="eyebrow">
              {genes.length} {genes.length === 1 ? "entry" : "entries"}
            </span>
            <div className="feat__grid" style={{ marginTop: 22 }}>
              {genes.map((g) => (
                <Link
                  key={g.slug}
                  href={`/gene/${g.slug}`}
                  className="feat-card"
                >
                  <div className="feat-card__top">
                    <span className="feat-card__sym">{g.symbol}</span>
                    {g.nickname ? (
                      <span className="feat-card__label">{g.nickname}</span>
                    ) : null}
                  </div>
                  <p className="feat-card__line">{g.indexLine}</p>
                  <span className="feat-card__more">
                    Read entry
                    <ArrowRight size={14} />
                  </span>
                </Link>
              ))}
            </div>

            <Link
              href="/a-z"
              className="btn btn--ghost"
              style={{ marginTop: 36 }}
            >
              See the full A–Z index
              <ArrowRight />
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter content={content} />
    </>
  );
}
