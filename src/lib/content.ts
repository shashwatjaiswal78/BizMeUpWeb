import { getCollection, type CollectionEntry } from 'astro:content';

export type Service = CollectionEntry<'services'>;
export type CaseStudy = CollectionEntry<'case-studies'>;
export type Post = CollectionEntry<'blog'>;

export async function getServices() {
  return (await getCollection('services')).sort((a, b) => a.data.order - b.data.order);
}

export async function getCaseStudies(filter?: (c: CaseStudy) => boolean) {
  const all = (await getCollection('case-studies')).sort((a, b) => a.data.order - b.data.order);
  return filter ? all.filter(filter) : all;
}

/** Service slugs a case belongs to, matched through each service's caseTags. */
export function caseServiceSlugs(entry: CaseStudy, services: Service[]) {
  const names = entry.data.services.map((s) => s.toLowerCase());
  return services
    .filter((s) => s.data.caseTags.some((tag) => names.includes(tag.toLowerCase())))
    .map((s) => s.id);
}

export const caseNumber = (entry: CaseStudy) => String(entry.data.order).padStart(2, '0');

export async function getPosts() {
  return (await getCollection('blog')).sort((a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf());
}

export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
