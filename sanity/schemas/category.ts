import { defineType, defineField } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "blurb", title: "Short blurb", type: "text", rows: 2 }),
    defineField({
      name: "geneList",
      title: "Genes you'll find here (display text)",
      type: "string",
      description:
        "Verbatim list shown on the homepage card, e.g. 'FTO, TCF7L2, AMY1, LCT, APOE'",
    }),
    defineField({
      name: "iconKey",
      type: "string",
      options: {
        list: [
          "nutrition",
          "caffeine",
          "vitamins",
          "fitness",
          "sleep",
          "stress",
          "connective",
          "risk",
        ],
      },
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "publishedAt",
      title: "Published at",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "order",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: { select: { title: "title", subtitle: "geneList" } },
});
