import { defineType, defineField, defineArrayMember } from "sanity";

export const gene = defineType({
  name: "gene",
  title: "Gene entry",
  type: "document",
  groups: [
    { name: "head", title: "Identity" },
    { name: "entry", title: "Entry fields" },
    { name: "meta", title: "Links & flags" },
  ],
  fields: [
    defineField({
      name: "symbol",
      title: "Gene symbol",
      type: "string",
      description: "e.g. FTO, CYP1A2, BRCA1 / BRCA2",
      group: "head",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "symbol" },
      group: "head",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "fullName",
      title: "Full name",
      type: "string",
      description: "e.g. Fat mass and obesity-associated gene",
      group: "head",
    }),
    defineField({
      name: "nickname",
      title: "Known as",
      type: "string",
      description: "e.g. The hunger gene",
      group: "head",
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      group: "head",
    }),

    defineField({
      name: "indexLine",
      title: "Index one-liner (terse, used in the A–Z table)",
      type: "string",
      group: "entry",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "oneLine",
      title: "Definition / 'in one line' (the AEO sentence)",
      type: "text",
      rows: 3,
      group: "entry",
    }),
    defineField({
      name: "whatItDoes",
      title: "What it does",
      type: "text",
      rows: 4,
      group: "entry",
    }),
    defineField({
      name: "variants",
      title: "The variants that matter",
      type: "text",
      rows: 4,
      group: "entry",
    }),
    defineField({
      name: "ifYouCarry",
      title: "If you carry the notable variant",
      type: "text",
      rows: 4,
      group: "entry",
    }),
    defineField({
      name: "indiaRelevance",
      title: "Why it matters in India",
      type: "text",
      rows: 4,
      group: "entry",
    }),
    defineField({
      name: "honestCaveat",
      title: "The honest caveat (load-bearing - keep it)",
      type: "text",
      rows: 4,
      group: "entry",
    }),

    defineField({
      name: "related",
      title: "Related entries (gene symbols)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" },
      group: "meta",
    }),
    defineField({
      name: "featured",
      title: "Featured on homepage",
      type: "boolean",
      initialValue: false,
      group: "meta",
    }),
    defineField({
      name: "featuredLabel",
      title: "Featured label",
      type: "string",
      description: "e.g. The caffeine gene",
      group: "meta",
    }),
    defineField({
      name: "order",
      title: "Featured order",
      type: "number",
      initialValue: 100,
      group: "meta",
    }),
  ],
  orderings: [
    {
      title: "Symbol A–Z",
      name: "symbol",
      by: [{ field: "symbol", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "symbol", subtitle: "nickname" },
  },
});
