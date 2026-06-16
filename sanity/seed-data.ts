/**
 * Single source of truth for knowourgenes.com (the "Gene Encyclopedia").
 * Pushed into Sanity by `pnpm seed`; the site renders entirely from Sanity.
 * Content transcribed from content.docx (Batch 05).
 */

export const homepageContent = {
  brandName: "knowourgenes",
  brandTld: ".com",
  tagline: "the A-to-Z encyclopedia of your genes",
  navLinks: [
    { label: "Browse A–Z", href: "/a-z" },
    { label: "Categories", href: "/#categories" },
    { label: "Featured", href: "/#featured" },
    { label: "How to read", href: "/#how" },
  ],
  navCtaLabel: "Browse A to Z",
  navCtaHref: "/a-z",

  heroEyebrow: "The plain-language encyclopedia of your genes.",
  heroHeadline: "Look up any gene. Understand it in one read.",
  heroSubhead:
    "A clear, jargon-free page for every gene that shapes how you eat, move, sleep, and feel. What it does, which variants matter, what carrying one means, and why it is relevant for Indian bodies. The reference you reach for when a gene name shows up and you want to actually understand it.",
  heroPrimaryCtaLabel: "Browse A to Z",
  heroPrimaryCtaHref: "/a-z",
  heroSecondaryLabel: "Search a gene",
  searchPlaceholder:
    "Search a gene or a trait: 'MTHFR' · 'caffeine gene' · 'ACTN3' · 'what controls lactose tolerance'",

  categoriesTitle: "Browse by category",
  categoriesIntro:
    "Genes are grouped by the part of life they affect, so a reader who does not know a gene's name can still find it by what it does.",

  howTitle: "How to read a gene page",
  howBody:
    "Every gene page follows the same shape: a one-line plain definition, what the gene does, the variants that matter, what it means if you carry the notable one, why it is relevant in India, and an honest caveat. Read the first line for the quick answer, or the whole page for the full picture. Nothing here is a diagnosis, and there is nothing to buy.",

  featuredTitle: "Featured entries",
  featuredIntro: "The genes people look up most.",

  indexTitle: "The A-to-Z gene index",
  indexIntro:
    "The full index a reader scans to find a gene, and the page search engines read as a complete gene reference. Each row is a one-line definition written to be lifted directly. This is the launch set, expanded gene by gene over time.",
  globalCaveat:
    "Each entry describes a research-backed tendency, not a diagnosis. Carrying a variant tells you how your body is likely to lean, it does not label you, and nothing here is a substitute for a doctor where a medical question is involved.",

  newsletterTitle: "One gene, clearly explained, in your inbox every week.",
  newsletterBody:
    "Five minutes, no jargon, and you will recognise the next one you hear about.",
  newsletterPlaceholder: "your@email.com",
  newsletterCta: "Subscribe",

  missionLine:
    "A plain-language encyclopedia of the genes that shape everyday life, one clear page per gene, India-aware, free for everyone.",
  footerLinks: [
    { label: "Browse A–Z", href: "/a-z" },
    { label: "Categories", href: "/#categories" },
    { label: "How to read", href: "/#how" },
    { label: "Newsletter", href: "/#newsletter" },
  ],
  footerCopy: "knowourgenes.com · the A-to-Z encyclopedia of your genes",
};

export const categories = [
  {
    slug: "nutrition-and-metabolism",
    title: "Nutrition & metabolism",
    blurb: "How your body handles carbs, fat, dairy, and appetite.",
    geneList: "FTO, TCF7L2, AMY1, LCT, APOE",
    iconKey: "nutrition",
    order: 1,
  },
  {
    slug: "caffeine-and-stimulants",
    title: "Caffeine & stimulants",
    blurb: "How fast you clear caffeine and how strongly you feel it.",
    geneList: "CYP1A2, ADORA2A",
    iconKey: "caffeine",
    order: 2,
  },
  {
    slug: "vitamins-and-absorption",
    title: "Vitamins & absorption",
    blurb: "How well you activate folate, B12, and vitamin D.",
    geneList: "MTHFR, VDR, FUT2",
    iconKey: "vitamins",
    order: 3,
  },
  {
    slug: "fitness-and-muscle",
    title: "Fitness & muscle",
    blurb: "Whether your muscles lean toward power or endurance.",
    geneList: "ACTN3, ACE, PPARGC1A",
    iconKey: "fitness",
    order: 4,
  },
  {
    slug: "sleep-and-body-clock",
    title: "Sleep & body clock",
    blurb: "Why you run early, late, or never quite rested.",
    geneList: "PER3, CLOCK, CRY1",
    iconKey: "sleep",
    order: 5,
  },
  {
    slug: "stress-and-mood",
    title: "Stress & mood",
    blurb: "How quickly your brain clears the chemistry of pressure.",
    geneList: "COMT, FKBP5",
    iconKey: "stress",
    order: 6,
  },
  {
    slug: "connective-tissue",
    title: "Connective tissue",
    blurb: "The resilience of your tendons, ligaments, and bone.",
    geneList: "COL1A1, COL5A1",
    iconKey: "connective",
    order: 7,
  },
  {
    slug: "inherited-risk",
    title: "Inherited risk",
    blurb: "Variants worth knowing about for you and your family.",
    geneList: "BRCA1, BRCA2, HBB",
    iconKey: "risk",
    order: 8,
  },
];

export type SeedGene = {
  slug: string;
  symbol: string;
  fullName: string;
  nickname: string;
  categorySlug: string;
  indexLine: string;
  oneLine?: string;
  whatItDoes?: string;
  variants?: string;
  ifYouCarry?: string;
  indiaRelevance?: string;
  honestCaveat?: string;
  related?: string[];
  featured?: boolean;
  featuredLabel?: string;
  order?: number;
};

export const genes: SeedGene[] = [
  // ===== Generic explainer (mapped into the gene model) =====
  {
    slug: "what-is-dna-testing",
    symbol: "DNA Testing",
    fullName: "What Is DNA Testing and How Does It Actually Work?",
    nickname: "DNA testing explained",
    categorySlug: "inherited-risk",
    indexLine:
      "How a saliva or swab sample becomes a personalised genetic report",
    oneLine:
      "DNA testing analyses your unique genetic code to reveal information about your ancestry, health risks, traits, and how your body responds to food, medication, and exercise. A small saliva or cheek-swab sample is processed in a lab, where specific genetic markers are read and compared against scientific databases to generate a personalised report.",
    whatItDoes:
      "DNA testing has moved from research labs into everyday life. Today you can understand your genetic makeup from a simple sample collected at home, so it helps to know what is really happening between the swab and the report. DNA, or deoxyribonucleic acid, is the molecule that carries the instructions for building and running your body. It is organised into roughly 20,000 genes, and small variations in these genes make every person unique. These variations influence everything from eye colour to how efficiently you metabolise caffeine or your inherited risk for certain conditions. Reading these variations is what makes personalised genetic insight possible.",
    variants:
      "The journey from sample to report follows four clear stages. Sample collection: you provide saliva in a tube or rub a swab inside your cheek; these cells contain your complete DNA. Extraction: in the lab, DNA is separated from the rest of the cell so it can be analysed cleanly. Analysis: the lab examines specific points in your genome called SNPs (single nucleotide polymorphisms), the spots where human DNA most commonly varies. Interpretation: your raw genetic data is compared against peer-reviewed research and reference databases to produce an easy-to-read report. The whole process typically takes two to four weeks depending on the test type.",
    ifYouCarry:
      "Modern DNA tests cover a wide range of insights. Ancestry and heritage: where your ancestors came from and your ethnic composition. Health predispositions: inherited risk for conditions influenced by genetics. Nutrition and fitness: how your body processes carbohydrates, fats, vitamins, and how it responds to different types of exercise. Traits: lactose tolerance, caffeine sensitivity, sleep patterns, and more. Carrier status: whether you carry genes that could be passed to children. DNA testing can benefit almost anyone curious about their body, but it is especially useful if you want a proactive view of inherited health risks, are planning a family and want to understand carrier status, want personalised nutrition or fitness guidance, or are curious about your ancestry and roots.",
    indiaRelevance:
      "Reputable DNA tests are processed in accredited laboratories using validated methods. The reliability of your results depends on the quality of the lab, the depth of the genetic markers analysed, and the strength of the scientific references behind the report. Always choose a provider that works with certified labs and cites credible research. Data privacy is one of the most common concerns, and a fair one. Trustworthy providers protect your information through encryption, give you control over how your data is used, and never share identifiable genetic information without explicit consent. Before testing, read the privacy policy and confirm you can request deletion of your data.",
    honestCaveat:
      "It is important to understand that genetics shows predisposition, not destiny. Your lifestyle, environment, and choices still play a major role in how your genes express themselves. Frequently asked questions. How long does a DNA test take? Most results are ready within two to four weeks after the lab receives your sample. Does a DNA test hurt? No. Sample collection is painless and uses either saliva or a gentle cheek swab. Can a DNA test diagnose a disease? No. It reveals genetic predisposition and risk, not a clinical diagnosis. Always consult a doctor for medical decisions. Do I need to fast or prepare before a DNA test? For most saliva tests, you should avoid eating, drinking, or smoking for about 30 minutes before collecting your sample. Is one DNA sample enough for life? Your DNA does not change, so a single high-quality sample can be reanalysed as science advances.",
    related: ["MTHFR", "BRCA1 / BRCA2", "FTO"],
    featured: true,
    featuredLabel: "DNA testing explained",
    order: 0,
  },

  // ===== Full model entries =====
  {
    slug: "fto",
    symbol: "FTO",
    fullName: "Fat mass and obesity-associated gene",
    nickname: "The hunger gene",
    categorySlug: "nutrition-and-metabolism",
    indexLine: "Influences appetite and weight gain on carb-heavy diets",
    oneLine:
      "FTO is the gene most strongly linked to appetite and body weight, influencing how hungry you feel and how easily you gain weight on carb-heavy diets.",
    whatItDoes:
      "FTO helps regulate appetite signalling, how full or hungry your brain feels after eating. Certain variants are associated with a stronger drive to eat and a higher tendency to store fat, especially on diets high in refined carbohydrates.",
    variants:
      "The common at-risk variant in the FTO gene is one of the most-studied obesity-related variants in the world. Carrying one or two copies is associated with modestly higher average body weight and stronger hunger cues.",
    ifYouCarry:
      "It does not mean you will be overweight, it means your appetite signalling may run louder, so protein, fibre, and meal structure matter more for you than for someone without the variant. Lifestyle still dominates the outcome.",
    indiaRelevance:
      "The FTO variant is common across South Asian populations, and combined with carb-heavy traditional diets it is one reason the region sees high rates of weight-related metabolic issues at lower body weights than Western averages.",
    honestCaveat:
      "FTO is a tendency, not a verdict. Its effect on any one person is modest and is strongly modifiable by diet, activity, and sleep. A single gene does not determine your weight.",
    related: ["TCF7L2", "MC4R", "AMY1"],
    featured: true,
    featuredLabel: "The hunger gene",
    order: 4,
  },
  {
    slug: "lct",
    symbol: "LCT",
    fullName: "Lactase gene",
    nickname: "The milk gene",
    categorySlug: "nutrition-and-metabolism",
    indexLine: "Decides whether you digest milk into adulthood",
    oneLine:
      "LCT is the gene that decides whether you keep digesting milk into adulthood, and most adults of South Asian descent carry the version that switches lactase off after childhood.",
    whatItDoes:
      "The LCT gene produces lactase, the enzyme that breaks down lactose, the sugar in milk. In most mammals and most humans, this enzyme switches off after weaning. A regulatory variant nearby (in the MCM6 gene) keeps it switched on for life in some populations.",
    variants:
      "The 'lactase persistence' variant keeps lactase production going into adulthood. It is common in populations with a long history of dairy farming and uncommon across much of South and East Asia.",
    ifYouCarry:
      "If you lack the persistence variant, which most Indian adults do, digesting fresh milk in quantity causes bloating, gas, or discomfort. It is not an allergy, it is the default human state, and fermented dairy is much easier to handle.",
    indiaRelevance:
      "Only a minority of Indian adults carry lifelong lactose tolerance, which is why dahi, chaas, and paneer, where fermentation or processing has already broken down much of the lactose, sit so much better than a glass of milk.",
    honestCaveat:
      "Lactose intolerance is a spectrum, not a switch. Many people without the persistence variant still tolerate small amounts of dairy comfortably. Test your own threshold rather than cutting dairy entirely.",
    related: ["MCM6", "FUT2", "AMY1"],
    featured: true,
    featuredLabel: "The milk gene",
    order: 5,
  },
  {
    slug: "cyp1a2",
    symbol: "CYP1A2",
    fullName: "Cytochrome P450 1A2",
    nickname: "The caffeine gene",
    categorySlug: "caffeine-and-stimulants",
    indexLine: "Controls how fast your body clears caffeine",
    oneLine:
      "CYP1A2 is the gene that controls how fast your body clears caffeine, dividing people into fast metabolisers and slow metabolisers who feel coffee for far longer.",
    whatItDoes:
      "CYP1A2 produces a liver enzyme responsible for breaking down the majority of the caffeine you consume. How active your version of this enzyme is determines how long caffeine stays active in your body.",
    variants:
      "A common variant separates fast metabolisers, who clear caffeine quickly, from slow metabolisers, in whom caffeine can remain active for up to ten hours instead of around four. Roughly half of adults fall on the slow side.",
    ifYouCarry:
      "If you are a slow metaboliser, an afternoon coffee can still be in your system at bedtime, disrupting sleep, and some research links slow metabolism plus heavy intake to other effects. Fast metabolisers clear it before it troubles their sleep.",
    indiaRelevance:
      "Caffeine metabolism varies widely across Indian populations, and with chai and coffee both deeply embedded in daily life, knowing whether you clear caffeine slowly is one of the simplest useful things to learn about your body.",
    honestCaveat:
      "This gene affects clearance speed, not sensitivity. A separate gene, ADORA2A, governs how strongly you feel caffeine, so a fast metaboliser can still be jittery and a slow one relatively unbothered while awake.",
    related: ["ADORA2A", "COMT"],
    featured: true,
    featuredLabel: "The caffeine gene",
    order: 1,
  },
  {
    slug: "actn3",
    symbol: "ACTN3",
    fullName: "Alpha-actinin-3 gene",
    nickname: "The sprinter gene",
    categorySlug: "fitness-and-muscle",
    indexLine: "Influences whether muscles lean toward power or endurance",
    oneLine:
      "ACTN3 is the gene best known for influencing whether your muscles are wired more for explosive power or for endurance.",
    whatItDoes:
      "ACTN3 produces a protein found specifically in fast-twitch muscle fibres, the ones that generate rapid, forceful contractions used in sprinting and heavy lifting. The gene's activity shapes the balance of your muscle performance.",
    variants:
      "A common variant switches the protein off. People with two working copies tend toward power and sprint performance, while those with two non-working copies, very common in many populations, lean toward endurance.",
    ifYouCarry:
      "Carrying the non-working version does not stop you building strength, it means your natural lean may be toward endurance, and your training and expectations can be set accordingly rather than fighting your wiring.",
    indiaRelevance:
      "The non-working variant is common across South Asian populations, which is part of why endurance-style training and progressive strength work often suit the regional physiology well.",
    honestCaveat:
      "ACTN3 explains only a small slice of athletic performance. Training, nutrition, sleep, and consistency matter far more than any single gene. No variant here makes or breaks an athlete.",
    related: ["ACE", "PPARGC1A", "COL1A1"],
    featured: true,
    featuredLabel: "The muscle gene",
    order: 2,
  },
  {
    slug: "mthfr",
    symbol: "MTHFR",
    fullName: "Methylenetetrahydrofolate reductase gene",
    nickname: "The B-vitamin gene",
    categorySlug: "vitamins-and-absorption",
    indexLine: "Affects how well you activate folate and B12",
    oneLine:
      "MTHFR is the gene that helps your body activate folate and vitamin B12, and a common variant makes that process less efficient.",
    whatItDoes:
      "The MTHFR gene produces an enzyme central to processing folate and recycling homocysteine, steps that matter for energy, nerve function, and, in pregnancy, healthy fetal development.",
    variants:
      "Common variants reduce the enzyme's efficiency, so the body activates folate and B12 less effectively. Many people carry one or two copies and never notice, while others feel it as low energy or raised homocysteine.",
    ifYouCarry:
      "It can mean standard supplement forms are less useful for you, and that the active forms of folate and B12 are absorbed better. It is worth a conversation with a doctor, especially before and during pregnancy.",
    indiaRelevance:
      "MTHFR variants are common in Indian populations, and combined with widespread B12 deficiency in largely vegetarian diets, this gene is one of the more practically relevant entries in this encyclopedia for the region.",
    honestCaveat:
      "MTHFR is heavily over-hyped online, with many unproven claims attached to it. The genuine, evidence-based implications are real but narrow. Treat dramatic internet claims about it with caution.",
    related: ["VDR", "FUT2"],
    featured: true,
    featuredLabel: "The vitamin gene",
    order: 3,
  },
  {
    slug: "comt",
    symbol: "COMT",
    fullName: "Catechol-O-methyltransferase gene",
    nickname: "The worrier-warrior gene",
    categorySlug: "stress-and-mood",
    indexLine: "Sets how fast you clear stress chemistry from the brain",
    oneLine:
      "COMT is the gene that helps clear stress chemicals like adrenaline and dopamine from the brain, and the speed at which it works shapes how you handle pressure.",
    whatItDoes:
      "COMT produces an enzyme that breaks down catecholamines, including dopamine, in the prefrontal cortex. How fast it works influences focus under pressure, stress recovery, and tolerance for stimulation.",
    variants:
      "A common variant slows the enzyme. Slower clearers, sometimes nicknamed 'worriers', tend to have higher baseline dopamine and can be more stress-sensitive but sharper in calm conditions, faster clearers ('warriors') handle acute stress more easily.",
    ifYouCarry:
      "If you are a slower clearer, intense stress lingers longer in your system and you may need a longer recovery runway after demanding periods. It is a difference in wiring, not a weakness.",
    indiaRelevance:
      "COMT variation is found across all populations, and in high-pressure academic and work cultures common in urban India, understanding your own stress-clearance speed can help you plan recovery rather than push through it.",
    honestCaveat:
      "The 'worrier-warrior' label is a useful simplification of a far more complex picture. COMT interacts with many other genes and with context, so do not read too much into a single result.",
    related: ["FKBP5", "ADORA2A"],
    featured: false,
    order: 100,
  },

  // ===== Index / launch-set entries (one-line definitions) =====
  {
    slug: "ace",
    symbol: "ACE",
    fullName: "Angiotensin-converting enzyme gene",
    nickname: "The endurance gene",
    categorySlug: "fitness-and-muscle",
    indexLine:
      "Influences cardiovascular efficiency and endurance response to training",
    related: ["ACTN3", "PPARGC1A"],
    order: 100,
  },
  {
    slug: "adora2a",
    symbol: "ADORA2A",
    fullName: "Adenosine A2A receptor gene",
    nickname: "The caffeine-sensitivity gene",
    categorySlug: "caffeine-and-stimulants",
    indexLine: "Sets how strongly your brain feels caffeine",
    related: ["CYP1A2", "COMT"],
    order: 100,
  },
  {
    slug: "amy1",
    symbol: "AMY1",
    fullName: "Amylase 1 gene",
    nickname: "The starch gene",
    categorySlug: "nutrition-and-metabolism",
    indexLine: "Controls how much carb-digesting enzyme your saliva makes",
    related: ["FTO", "TCF7L2"],
    order: 100,
  },
  {
    slug: "apoe",
    symbol: "APOE",
    fullName: "Apolipoprotein E gene",
    nickname: "The fat-and-brain gene",
    categorySlug: "nutrition-and-metabolism",
    indexLine: "Affects how you handle dietary fat and certain long-term risks",
    related: ["FTO", "TCF7L2"],
    order: 100,
  },
  {
    slug: "brca1-brca2",
    symbol: "BRCA1 / BRCA2",
    fullName: "Breast cancer genes 1 and 2",
    nickname: "The breast-cancer genes",
    categorySlug: "inherited-risk",
    indexLine: "Inherited variants raise risk of breast and ovarian cancer",
    related: ["HBB"],
    order: 100,
  },
  {
    slug: "clock",
    symbol: "CLOCK",
    fullName: "Circadian Locomotor Output Cycles Kaput gene",
    nickname: "A body-clock gene",
    categorySlug: "sleep-and-body-clock",
    indexLine: "Part of the circadian system that sets your daily rhythm",
    related: ["PER3"],
    order: 100,
  },
  {
    slug: "col1a1",
    symbol: "COL1A1",
    fullName: "Collagen type I alpha 1 gene",
    nickname: "A collagen gene",
    categorySlug: "connective-tissue",
    indexLine: "Affects tendon, ligament, and bone resilience",
    related: ["ACTN3"],
    order: 100,
  },
  {
    slug: "hbb",
    symbol: "HBB",
    fullName: "Hemoglobin subunit beta gene",
    nickname: "The thalassemia gene",
    categorySlug: "inherited-risk",
    indexLine:
      "Variants cause inherited blood disorders common in parts of India",
    related: ["BRCA1 / BRCA2"],
    order: 100,
  },
  {
    slug: "per3",
    symbol: "PER3",
    fullName: "Period 3 gene",
    nickname: "A body-clock gene",
    categorySlug: "sleep-and-body-clock",
    indexLine: "Influences whether you are a morning or evening person",
    related: ["CLOCK"],
    order: 100,
  },
  {
    slug: "tcf7l2",
    symbol: "TCF7L2",
    fullName: "Transcription factor 7-like 2 gene",
    nickname: "The diabetes gene",
    categorySlug: "nutrition-and-metabolism",
    indexLine: "The strongest common genetic link to type 2 diabetes risk",
    related: ["FTO", "AMY1"],
    order: 100,
  },
  {
    slug: "vdr",
    symbol: "VDR",
    fullName: "Vitamin D receptor gene",
    nickname: "The vitamin-D gene",
    categorySlug: "vitamins-and-absorption",
    indexLine: "Affects how your body responds to vitamin D",
    related: ["MTHFR"],
    order: 100,
  },
];
