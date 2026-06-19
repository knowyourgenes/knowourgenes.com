// Canonical site identity. Reused by sitemap, robots, and the llms.txt routes
// so the production URL/name live in exactly one place.
export const siteConfig = {
  siteUrl: "https://knowourgenes.com",
  siteName: "knowourgenes.com",
  description:
    "A clear, jargon-free encyclopedia page for every gene that shapes how you eat, " +
    "move, sleep, and feel. Each entry explains what the gene does, which variants matter, " +
    "what carrying one means, and why it is relevant for Indian bodies - plus a searchable " +
    "A-to-Z index and category guides.",
} as const;
