import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOg, type OgCard } from '../../lib/og';
import { getServices, getCaseStudies, getPosts, caseNumber } from '../../lib/content';

export const getStaticPaths = (async () => {
  const [services, cases, posts] = await Promise.all([getServices(), getCaseStudies(), getPosts()]);
  const cards: { route: string; card: OgCard }[] = [
    { route: 'home', card: { tone: 'cream', headline: "Great businesses don’t fail. They go unseen." } },
    { route: 'about', card: { tone: 'cream', kicker: 'About BizMeUp', headline: 'Turning Business Challenges into Success Stories' } },
    { route: 'contact', card: { tone: 'orange', kicker: 'Get a free visibility audit', headline: 'Ready to be seen?' } },
    { route: 'work', card: { tone: 'cream', kicker: 'Real businesses. Real problems. Lights on.', headline: 'The Case Files.' } },
    { route: 'blog', card: { tone: 'cream', kicker: 'Blog', headline: 'The BizMeUp blog.' } },
    ...services.map((s) => ({
      route: `services/${s.id}`,
      card: { tone: 'cream' as const, kicker: s.data.title, headline: s.data.posterHeadline },
    })),
    ...cases.map((c) => ({
      route: `work/${c.id}`,
      card: { tone: 'cream' as const, kicker: `Case ${caseNumber(c)} / ${c.data.title}`, headline: c.data.resultHeadline },
    })),
    ...posts.map((p) => ({
      route: `blog/${p.id}`,
      card: { tone: 'cream' as const, kicker: 'Blog', headline: p.data.title },
    })),
  ];
  return cards.map(({ route, card }) => ({ params: { route }, props: { card } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg((props as { card: OgCard }).card);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
