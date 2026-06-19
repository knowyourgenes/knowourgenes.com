// Shared generators for /llms.txt and /llms-full.txt (see https://llmstxt.org).
//
// buildLlmsTxt()      -> concise markdown index of the whole site.
// buildLlmsFullTxt()  -> same structure but with full entry bodies inlined.
//
// Both build absolute URLs from siteConfig.siteUrl and pull content from the
// existing Sanity-backed fetch layer.

import { siteConfig } from "./siteConfig";
import {
  getHomeData,
  getAllGenes,
  getGeneBySlug,
  type GeneFull,
} from "../sanity/fetch";

// ---------- URL + text helpers ----------

/** Absolute URL from a site-root path. */
function abs(path: string): string {
  const base = siteConfig.siteUrl.replace(/\/$/, "");
  return path.startsWith("/") ? `${base}${path}` : `${base}/${path}`;
}

/** Strip a trailing " | Brand" / " - Brand" / " · Brand" suffix off meta titles. */
export function cleanTitle(title: string): string {
  return title.replace(/\s+[|·\-–—]\s+[^|·\-–—]*$/, "").trim() || title.trim();
}

// ---------- Portable Text -> markdown ----------
// Generic serializer for Sanity Portable Text. Handles headings, lists,
// blockquotes and paragraphs with bold/italic marks; images and embeds are
// skipped. `headingOffset` demotes body headings so they nest under the
// article title (pass 2 to push h1->h3, h2->h4, ...).

type PTSpan = { _type?: string; text?: string; marks?: string[] };
type PTBlock = {
  _type?: string;
  style?: string;
  listItem?: string;
  level?: number;
  children?: PTSpan[];
};

function serializeSpans(children: PTSpan[] | undefined): string {
  if (!Array.isArray(children)) return "";
  return children
    .map((span) => {
      let text = span?.text ?? "";
      if (!text) return "";
      const marks = span.marks ?? [];
      if (marks.includes("strong")) text = `**${text}**`;
      if (marks.includes("em")) text = `*${text}*`;
      return text;
    })
    .join("");
}

export function portableTextToMarkdown(blocks: unknown, headingOffset = 0): string {
  if (!Array.isArray(blocks)) return "";
  const out: string[] = [];

  for (const block of blocks as PTBlock[]) {
    if (!block || block._type !== "block") continue; // skip images/embeds/etc.
    const text = serializeSpans(block.children).trim();
    if (!text) continue;

    const style = block.style ?? "normal";

    if (/^h[1-6]$/.test(style)) {
      const level = Math.min(6, parseInt(style.slice(1), 10) + headingOffset);
      out.push(`${"#".repeat(level)} ${text}`);
    } else if (style === "blockquote") {
      out.push(`> ${text}`);
    } else if (block.listItem === "bullet") {
      out.push(`- ${text}`);
    } else if (block.listItem === "number") {
      out.push(`1. ${text}`);
    } else {
      out.push(text);
    }
  }

  return out.join("\n\n");
}

// ---------- shared helpers ----------

/** One-line definition for a gene, mirroring the gene page's `def`. */
function geneDef(gene: { oneLine?: string; indexLine: string }): string {
  return gene.oneLine?.trim() || gene.indexLine;
}

/** Display title for a gene, mirroring the gene page's metadata title. */
function geneTitle(gene: { symbol: string; nickname?: string }): string {
  return gene.nickname ? `${gene.symbol} - ${gene.nickname}` : `${gene.symbol} gene`;
}

// Derived FAQ for a full gene entry. Mirrors the FAQPage JSON-LD built on the
// gene page from the plain-text body fields.
function geneFaqs(gene: GeneFull): { q: string; a: string }[] {
  const def = geneDef(gene);
  const faqs: { q: string; a: string }[] = [];
  faqs.push({ q: `What does the ${gene.symbol} gene do?`, a: gene.whatItDoes || def });
  if (gene.variants)
    faqs.push({ q: `Which ${gene.symbol} variants matter?`, a: gene.variants });
  if (gene.ifYouCarry)
    faqs.push({
      q: `What does it mean if you carry the ${gene.symbol} variant?`,
      a: gene.ifYouCarry,
    });
  if (gene.indiaRelevance)
    faqs.push({ q: `Why does ${gene.symbol} matter in India?`, a: gene.indiaRelevance });
  return faqs;
}

// ---------- llms.txt (concise index) ----------

export async function buildLlmsTxt(): Promise<string> {
  const { content, categories, genes } = await getHomeData();

  const summary =
    content?.missionLine?.trim() || content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")}): Look up any gene and understand it in one read.`);
  lines.push(`- [A-Z Index](${abs("/a-z")}): The complete A-to-Z index of every gene entry.`);
  lines.push("");

  if (categories.length) {
    lines.push("## Categories");
    for (const c of categories) {
      const blurb = c.blurb?.trim();
      lines.push(
        `- [${c.title}](${abs(`/category/${c.slug}`)})${blurb ? `: ${blurb}` : ""}`,
      );
    }
    lines.push("");
  }

  if (genes.length) {
    lines.push("## Genes");
    for (const g of genes) {
      lines.push(`- [${geneTitle(g)}](${abs(`/gene/${g.slug}`)}): ${geneDef(g)}`);
    }
    lines.push("");
  }

  return lines.join("\n").trim() + "\n";
}

// ---------- llms-full.txt (full content inlined) ----------

export async function buildLlmsFullTxt(): Promise<string> {
  const { content, categories, genes } = await getHomeData();

  const summary =
    content?.missionLine?.trim() || content?.heroSubhead?.trim() || siteConfig.description;

  const lines: string[] = [];
  lines.push(`# ${siteConfig.siteName}`);
  lines.push("");
  lines.push(`> ${summary}`);
  lines.push("");

  lines.push("## Key Pages");
  lines.push(`- [Home](${abs("/")})`);
  lines.push(`- [A-Z Index](${abs("/a-z")})`);
  lines.push("");

  if (categories.length) {
    lines.push("## Categories");
    lines.push("");
    for (const c of categories) {
      lines.push(`### ${c.title}`);
      lines.push(`URL: ${abs(`/category/${c.slug}`)}`);
      if (c.blurb?.trim()) {
        lines.push("");
        lines.push(c.blurb.trim());
      }
      if (c.geneList?.trim()) {
        lines.push("");
        lines.push(`Genes: ${c.geneList.trim()}`);
      }
      lines.push("");
    }
  }

  // Full gene entries. Fetched in parallel and kept in index (A-Z) order.
  if (genes.length) {
    lines.push("## Genes");
    lines.push("");
    const full = await Promise.all(genes.map((g) => getGeneBySlug(g.slug)));
    for (const item of full) {
      if (!item) continue;
      lines.push(`### ${cleanTitle(geneTitle(item))}`);
      lines.push(`URL: ${abs(`/gene/${item.slug}`)}`);
      if (item.fullName) lines.push(`Full name: ${item.fullName}`);
      if (item.nickname) lines.push(`Known as: ${item.nickname}`);
      if (item.categoryTitle) lines.push(`Category: ${item.categoryTitle}`);
      lines.push("");
      lines.push(`**${item.symbol} in one line:** ${geneDef(item)}`);
      lines.push("");

      if (item.whatItDoes) {
        lines.push("#### What it does");
        lines.push(item.whatItDoes);
        lines.push("");
      }
      if (item.variants) {
        lines.push("#### The variants that matter");
        lines.push(item.variants);
        lines.push("");
      }
      if (item.ifYouCarry) {
        lines.push("#### If you carry the notable variant");
        lines.push(item.ifYouCarry);
        lines.push("");
      }
      if (item.indiaRelevance) {
        lines.push("#### Why it matters in India");
        lines.push(item.indiaRelevance);
        lines.push("");
      }
      if (item.honestCaveat) {
        lines.push("#### The honest caveat");
        lines.push(item.honestCaveat);
        lines.push("");
      }

      const faqs = geneFaqs(item);
      if (faqs.length) {
        lines.push("#### FAQ");
        for (const f of faqs) {
          lines.push(`**${f.q}**`);
          lines.push(f.a);
          lines.push("");
        }
      }
    }
  }

  return lines.join("\n").trim() + "\n";
}
