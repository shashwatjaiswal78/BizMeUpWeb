import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

/**
 * Case studies (CLAUDE.md section 9). Adding a case needs only a Markdown
 * file (and optional images) in src/content/case-studies.
 */
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/index.md', base: './src/content/case-studies' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      industry: z.string(),
      location: z.string(),
      services: z.array(z.string()),
      featured: z.boolean().default(false),
      order: z.number(),
      resultHeadline: z.string(),
      problem: z.string(),
      stats: z.array(z.object({ label: z.string(), value: z.string() })).default([]),
      /** Hero screenshot shown in the laptop mockup */
      mockupDesktop: image().optional(),
      /** Full-page capture opened in the site viewer */
      fullPage: image().optional(),
      mockupMobile: image().optional(),
      liveUrl: z.string().optional(),
      testimonial: z.object({ quote: z.string(), name: z.string(), role: z.string() }).optional(),
      publishedAt: z.coerce.date(),
    }),
});

/**
 * Services (CLAUDE.md section 9). Poster colours, rotations and tape live in
 * src/config/posters.ts so the wall keeps matching the locked design.
 */
const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/services' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    posterHeadline: z.string(),
    shortDescription: z.string(),
    posterColor: z.enum(['orange', 'mustard', 'blue', 'white', 'espresso']),
    startingPrice: z.string().optional(),
    /** Short price for stickers, e.g. "₹15K" */
    priceShort: z.string().optional(),
    order: z.number(),
    seoTitle: z.string(),
    seoDescription: z.string(),
    /** Case study service names that belong to this service, for related cases and Work filters */
    caseTags: z.array(z.string()).default([]),
    processTitle: z.string(),
    whatYouGet: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
    faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
  }),
});

/** Blog posts (CLAUDE.md section 9). */
const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      slug: z.string().optional(),
      description: z.string(),
      cover: image().optional(),
      coverAlt: z.string().optional(),
      tags: z.array(z.string()).default([]),
      publishedAt: z.coerce.date(),
    }),
});

export const collections = { 'case-studies': caseStudies, services, blog };
