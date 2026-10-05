// JSON-LD structured data (CLAUDE.md section 11).
import { site } from '../config/site';
import type { Service, Post } from './content';

export type Crumb = { label: string; href?: string };

const abs = (path: string, base: URL | undefined) => new URL(path, base).toString();

export function organization(base?: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': abs('/#organization', base),
    name: site.name,
    url: abs('/', base),
    slogan: site.tagline,
    email: site.email,
    telephone: '+917309138731',
    founder: { '@type': 'Person', name: 'Shashwat Jaiswal' },
    sameAs: [site.instagram.url, site.linkedin.url].filter(Boolean),
    // [Add "logo" once the logo files are ready]
  };
}

export function localBusiness(base?: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': abs('/#business', base),
    name: site.name,
    description: 'BizMeUp builds websites, content and campaigns that make you impossible to miss.',
    url: abs('/', base),
    image: abs('/og/home.png', base),
    email: site.email,
    telephone: '+917309138731',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Mohali',
      addressRegion: 'Punjab',
      addressCountry: 'IN',
    },
    areaServed: [
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Chandigarh' },
    ],
    parentOrganization: { '@id': abs('/#organization', base) },
  };
}

export function breadcrumbList(items: Crumb[], base?: URL) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: abs(item.href, base) } : {}),
    })),
  };
}

export function serviceSchema(service: Service, base?: URL) {
  const d = service.data;
  const price = d.startingPrice?.replace(/[^\d]/g, '');
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: d.title,
    serviceType: d.title,
    description: d.shortDescription,
    url: abs(`/services/${service.id}`, base),
    provider: { '@id': abs('/#business', base) },
    areaServed: [
      { '@type': 'City', name: 'Mohali' },
      { '@type': 'City', name: 'Chandigarh' },
    ],
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(price), priceCurrency: 'INR' },
          },
        }
      : {}),
  };
}

export function articleSchema(post: Post, base?: URL) {
  const d = post.data;
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: d.title,
    description: d.description,
    datePublished: d.publishedAt.toISOString(),
    url: abs(`/blog/${post.id}`, base),
    image: abs(`/og/blog/${post.id}.png`, base),
    author: { '@type': 'Person', name: 'Shashwat Jaiswal' },
    publisher: { '@id': abs('/#organization', base) },
    keywords: d.tags.join(', '),
  };
}
