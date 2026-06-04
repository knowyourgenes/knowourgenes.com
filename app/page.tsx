import Link from "next/link";
import type { Metadata } from "next";
import { getHomeData } from "../sanity/fetch";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import SearchBox from "../components/SearchBox";
import Newsletter from "../components/Newsletter";
import { CategoryIcon, ArrowRight, ChevronRight } from "../components/Icons";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { content } = await getHomeData();
    return {
      title: `${content.brandName}${content.brandTld} · ${content.tagline}`,
      description: content.heroSubhead,
    };
  } catch {
    return { title: "the A-to-Z encyclopedia of your genes" };
  }
}

const FIELD_STEPS = [
  "A one-line plain definition",
  "What the gene does",
  "The variants that matter",
  "If you carry the notable variant",
  "Why it matters in India",
  "The honest caveat",
];

export default async function HomePage() {
  const { content, categories, featured, genes } = await getHomeData();

  return (
    <>
      <SiteNav content={content} />

      <main>
        {/* HERO */}
        <section className="hero section">
          <div className="container hero__inner">
            {content.heroEyebrow ? (
              <span className="eyebrow">{content.heroEyebrow}</span>
            ) : null}
            <h1 className="hero__title">{content.heroHeadline}</h1>
            <p className="hero__sub">{content.heroSubhead}</p>

            <SearchBox genes={genes} placeholder={content.searchPlaceholder} />

            <div className="hero__cta-row">
              <Link
                href={content.heroPrimaryCtaHref || "/a-z"}
                className="btn btn--primary"
              >
                {content.heroPrimaryCtaLabel || "Browse A to Z"}
                <ArrowRight />
              </Link>
              <Link href="/#categories" className="btn btn--ghost">
                Browse by category
              </Link>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section id="categories" className="block section">
          <div className="container">
            <span className="eyebrow">Find a gene by what it does</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              {content.categoriesTitle}
            </h2>
            <p className="section-intro">{content.categoriesIntro}</p>

            <div className="cats__grid">
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/category/${c.slug}`}
                  className="cat-card"
                >
                  <span className="cat-card__icon">
                    <CategoryIcon iconKey={c.iconKey} />
                  </span>
                  <h3 className="cat-card__title">{c.title}</h3>
                  {c.blurb ? (
                    <p className="cat-card__blurb">{c.blurb}</p>
                  ) : null}
                  <span className="cat-card__genes">
                    {c.geneList}
                    {c.count ? (
                      <>
                        {" · "}
                        <span className="cat-card__count">
                          {c.count} {c.count === 1 ? "entry" : "entries"}
                        </span>
                      </>
                    ) : null}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED */}
        <section
          id="featured"
          className="block section"
          style={{
            background: "var(--surface-2)",
            borderBlock: "1px solid var(--line)",
          }}
        >
          <div className="container">
            <span className="eyebrow">Most looked-up</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              {content.featuredTitle}
            </h2>
            <p className="section-intro">{content.featuredIntro}</p>

            <div className="feat__grid">
              {featured.map((g) => (
                <Link
                  key={g.slug}
                  href={`/gene/${g.slug}`}
                  className="feat-card"
                >
                  <div className="feat-card__top">
                    <span className="feat-card__sym">{g.symbol}</span>
                    {g.featuredLabel ? (
                      <span className="feat-card__label">
                        {g.featuredLabel}
                      </span>
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
          </div>
        </section>

        {/* HOW TO READ */}
        <section id="how" className="how block section">
          <div className="container how__inner">
            <div>
              <span className="eyebrow">Same shape every time</span>
              <h2 className="section-title" style={{ marginTop: 10 }}>
                {content.howTitle}
              </h2>
              <p className="how__body">{content.howBody}</p>
            </div>
            <div className="how__fields">
              {FIELD_STEPS.map((step, i) => (
                <div key={step} className="how__field">
                  <span className="how__field-n">{i + 1}</span>
                  <span className="how__field-t">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDEX CTA */}
        <section className="block section">
          <div className="container">
            <span className="eyebrow">The complete reference</span>
            <h2 className="section-title" style={{ marginTop: 10 }}>
              {content.indexTitle}
            </h2>
            <p className="section-intro">{content.indexIntro}</p>
            <Link
              href="/a-z"
              className="btn btn--primary"
              style={{ marginTop: 22 }}
            >
              Open the A–Z index
              <ChevronRight size={16} />
            </Link>
          </div>
        </section>

        <Newsletter content={content} />
      </main>

      <SiteFooter content={content} />
    </>
  );
}
