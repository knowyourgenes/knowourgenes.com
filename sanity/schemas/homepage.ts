import { defineType, defineField, defineArrayMember } from "sanity";

const linkArray = defineField({
  name: "navLinks",
  title: "Links",
  type: "array",
  of: [
    defineArrayMember({
      type: "object",
      fields: [
        defineField({ name: "label", type: "string" }),
        defineField({ name: "href", type: "string" }),
      ],
      preview: { select: { title: "label", subtitle: "href" } },
    }),
  ],
});

export const homepage = defineType({
  name: "homepage",
  title: "Homepage & Site",
  type: "document",
  groups: [
    { name: "brand", title: "Brand & Nav" },
    { name: "hero", title: "Hero" },
    { name: "categories", title: "Categories block" },
    { name: "how", title: "How to read" },
    { name: "featured", title: "Featured block" },
    { name: "index", title: "Index block" },
    { name: "newsletter", title: "Newsletter" },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    defineField({
      name: "brandName",
      type: "string",
      group: "brand",
      initialValue: "knowourgenes",
    }),
    defineField({
      name: "brandTld",
      type: "string",
      group: "brand",
      initialValue: ".com",
    }),
    defineField({ name: "tagline", type: "string", group: "brand" }),
    { ...linkArray, group: "brand" },
    defineField({ name: "navCtaLabel", type: "string", group: "brand" }),
    defineField({ name: "navCtaHref", type: "string", group: "brand" }),

    defineField({ name: "heroEyebrow", type: "string", group: "hero" }),
    defineField({ name: "heroHeadline", type: "string", group: "hero" }),
    defineField({ name: "heroSubhead", type: "text", rows: 4, group: "hero" }),
    defineField({ name: "heroPrimaryCtaLabel", type: "string", group: "hero" }),
    defineField({ name: "heroPrimaryCtaHref", type: "string", group: "hero" }),
    defineField({ name: "heroSecondaryLabel", type: "string", group: "hero" }),
    defineField({ name: "searchPlaceholder", type: "string", group: "hero" }),

    defineField({
      name: "categoriesTitle",
      type: "string",
      group: "categories",
    }),
    defineField({
      name: "categoriesIntro",
      type: "text",
      rows: 3,
      group: "categories",
    }),

    defineField({ name: "howTitle", type: "string", group: "how" }),
    defineField({ name: "howBody", type: "text", rows: 5, group: "how" }),

    defineField({ name: "featuredTitle", type: "string", group: "featured" }),
    defineField({
      name: "featuredIntro",
      type: "text",
      rows: 2,
      group: "featured",
    }),

    defineField({ name: "indexTitle", type: "string", group: "index" }),
    defineField({ name: "indexIntro", type: "text", rows: 4, group: "index" }),
    defineField({
      name: "globalCaveat",
      title: "Global honest caveat (used on stub gene pages)",
      type: "text",
      rows: 4,
      group: "index",
    }),

    defineField({
      name: "newsletterTitle",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterBody",
      type: "text",
      rows: 3,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterPlaceholder",
      type: "string",
      group: "newsletter",
    }),
    defineField({ name: "newsletterCta", type: "string", group: "newsletter" }),

    defineField({
      name: "missionLine",
      type: "text",
      rows: 3,
      group: "footer",
    }),
    {
      ...linkArray,
      name: "footerLinks",
      title: "Footer links",
      group: "footer",
    },
    defineField({ name: "footerCopy", type: "string", group: "footer" }),
  ],
  preview: { prepare: () => ({ title: "Homepage & Site" }) },
});
