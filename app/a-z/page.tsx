import Link from "next/link";
import type { Metadata } from "next";
import { getHomeData, type GeneCard } from "../../sanity/fetch";
import SiteNav from "../../components/SiteNav";
import SiteFooter from "../../components/SiteFooter";
import { ChevronRight, Info } from "../../components/Icons";

export const revalidate = 3600;

export async function generateMetadata(): Promise<Metadata> {
  try {
    const { content } = await getHomeData();
    return {
      title: content.indexTitle || "The A-to-Z gene index",
      description: content.indexIntro,
      keywords: [
        "gene index",
        "list of genes",
        "gene A to Z",
        "gene reference",
        "genetics India",
      ],
    };
  } catch {
    return { title: "The A-to-Z gene index" };
  }
}

export default async function AzPage() {
  const { content, genes } = await getHomeData();

  // group by first letter of the symbol
  const groups = new Map<string, GeneCard[]>();
  for (const g of genes) {
    const letter = (g.symbol[0] || "#").toUpperCase();
    if (!groups.has(letter)) groups.set(letter, []);
    groups.get(letter)!.push(g);
  }
  const letters = Array.from(groups.keys()).sort();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: genes.map((g) => ({
      "@type": "Question",
      name: `What is the ${g.symbol} gene?`,
      acceptedAnswer: { "@type": "Answer", text: g.indexLine },
    })),
  };

  return (
    <>
      <SiteNav content={content} />

      <main>
        <section className="page-head section">
          <div className="container page-head__inner">
            <nav className="breadcrumb">
              <Link href="/">Home</Link>
              <span className="breadcrumb__sep">/</span>
              <span>A–Z index</span>
            </nav>
            <h1 className="page-head__title">{content.indexTitle}</h1>
            {content.indexIntro ? (
              <p className="page-head__intro">{content.indexIntro}</p>
            ) : null}

            <div className="az-rail" style={{ marginTop: 22 }}>
              {letters.map((l) => (
                <a key={l} href={`#letter-${l}`} className="az-rail__item">
                  {l}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="block section">
          <div className="container">
            {letters.map((l) => (
              <div key={l} id={`letter-${l}`} className="az-group">
                <h2 className="az-group__letter">{l}</h2>
                <div className="az-table">
                  {groups.get(l)!.map((g) => (
                    <Link
                      key={g.slug}
                      href={`/gene/${g.slug}`}
                      className="az-row"
                    >
                      <span className="az-row__sym">{g.symbol}</span>
                      <span className="az-row__known">{g.nickname}</span>
                      <span className="az-row__line">{g.indexLine}</span>
                      <span className="az-row__arrow">
                        <ChevronRight size={16} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}

            {content.globalCaveat ? (
              <div
                className="gene-caveat"
                style={{ marginTop: 44, maxWidth: 820 }}
              >
                <Info size={20} />
                <p className="gene-caveat__text">
                  <b>One honest line, on every page. </b>
                  {content.globalCaveat}
                </p>
              </div>
            ) : null}
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
