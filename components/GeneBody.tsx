import Link from "next/link";
import type { GeneFull } from "../sanity/fetch";
import { Info } from "./Icons";

/**
 * The standard gene-entry body: the fixed fields in the fixed order
 * (what it does → variants → if you carry → why it matters in India),
 * related entries, and the load-bearing honest caveat that appears on
 * every page. Stub entries (definition only) still render the caveat.
 */
export default function GeneBody({
  gene,
  globalCaveat,
}: {
  gene: GeneFull;
  globalCaveat?: string;
}) {
  const hasFull = Boolean(gene.whatItDoes);
  const caveat = gene.honestCaveat || globalCaveat;
  const relatedSet = new Map(
    (gene.relatedGenes ?? []).map((r) => [r.symbol, r]),
  );

  return (
    <div className="gene-body">
      {hasFull ? (
        <>
          {gene.whatItDoes ? (
            <section className="gene-field">
              <h2 className="gene-field__label">What it does</h2>
              <p className="gene-field__body">{gene.whatItDoes}</p>
            </section>
          ) : null}
          {gene.variants ? (
            <section className="gene-field">
              <h2 className="gene-field__label">The variants that matter</h2>
              <p className="gene-field__body">{gene.variants}</p>
            </section>
          ) : null}
          {gene.ifYouCarry ? (
            <section className="gene-field">
              <h2 className="gene-field__label">
                If you carry the notable variant
              </h2>
              <p className="gene-field__body">{gene.ifYouCarry}</p>
            </section>
          ) : null}
          {gene.indiaRelevance ? (
            <section className="gene-field gene-field--india">
              <h2 className="gene-field__label">Why it matters in India</h2>
              <p className="gene-field__body">{gene.indiaRelevance}</p>
            </section>
          ) : null}
        </>
      ) : (
        <p className="stub-note">
          A full entry for <strong>{gene.symbol}</strong> is on its way. For
          now, here is the one-line definition above and the genes it connects
          to below.
        </p>
      )}

      {(gene.related && gene.related.length > 0) ||
      (gene.relatedGenes && gene.relatedGenes.length) ? (
        <div className="related">
          <span className="related__label">Related entries</span>
          <div className="related__row">
            {(gene.related ?? []).map((sym) => {
              const linked = relatedSet.get(sym);
              return linked ? (
                <Link
                  key={sym}
                  href={`/gene/${linked.slug}`}
                  className="related__chip"
                >
                  {sym}
                </Link>
              ) : (
                <span key={sym} className="related__chip related__chip--static">
                  {sym}
                </span>
              );
            })}
          </div>
        </div>
      ) : null}

      {caveat ? (
        <div className="gene-caveat">
          <Info size={20} />
          <p className="gene-caveat__text">
            <b>The honest caveat. </b>
            {caveat}
          </p>
        </div>
      ) : null}
    </div>
  );
}
