/**
 * Push seed-data.ts into the configured Sanity dataset.
 *
 * Required env (in .env.local or .env):
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, SANITY_API_WRITE_TOKEN (Editor)
 *
 * Run:  pnpm seed
 */

import { createClient } from "@sanity/client";
import { categories, genes, homepageContent } from "./seed-data";

function loadDotEnv() {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const fs = require("fs");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const path = require("path");
    for (const file of [".env.local", ".env"]) {
      const p = path.join(process.cwd(), file);
      if (!fs.existsSync(p)) continue;
      for (const raw of fs.readFileSync(p, "utf8").split(/\r?\n/)) {
        const line = raw.trim();
        if (!line || line.startsWith("#")) continue;
        const eq = line.indexOf("=");
        if (eq === -1) continue;
        const key = line.slice(0, eq).trim();
        let val = line.slice(eq + 1).trim();
        if (
          (val.startsWith('"') && val.endsWith('"')) ||
          (val.startsWith("'") && val.endsWith("'"))
        ) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) process.env[key] = val;
      }
    }
  } catch {
    // best-effort
  }
}

loadDotEnv();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token =
  process.env.SANITY_API_WRITE_TOKEN || process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !token) {
  console.error(
    "Missing env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN in .env",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-10-01",
  useCdn: false,
});

async function run() {
  console.log(`Seeding project=${projectId} dataset=${dataset}`);

  const oldIds = await client.fetch<string[]>(
    `*[_type in ["category", "gene"]]._id`,
  );
  if (oldIds.length > 0)
    console.log(`Deleting ${oldIds.length} existing content docs.`);

  const tx = client.transaction();
  for (const id of oldIds) tx.delete(id);

  tx.createOrReplace({
    _id: "homepage.singleton",
    _type: "homepage",
    ...homepageContent,
  });

  for (const c of categories) {
    tx.createOrReplace({
      _id: `category.${c.slug}`,
      _type: "category",
      title: c.title,
      slug: { _type: "slug", current: c.slug },
      blurb: c.blurb,
      geneList: c.geneList,
      iconKey: c.iconKey,
      order: c.order,
    });
  }

  for (const g of genes) {
    tx.createOrReplace({
      _id: `gene.${g.slug}`,
      _type: "gene",
      symbol: g.symbol,
      slug: { _type: "slug", current: g.slug },
      fullName: g.fullName,
      nickname: g.nickname,
      category: { _type: "reference", _ref: `category.${g.categorySlug}` },
      indexLine: g.indexLine,
      oneLine: g.oneLine,
      whatItDoes: g.whatItDoes,
      variants: g.variants,
      ifYouCarry: g.ifYouCarry,
      indiaRelevance: g.indiaRelevance,
      honestCaveat: g.honestCaveat,
      related: g.related,
      featured: g.featured ?? false,
      featuredLabel: g.featuredLabel,
      order: g.order ?? 100,
    });
  }

  const result = await tx.commit();
  console.log(`Seeded ${result.results.length} documents.`);
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
