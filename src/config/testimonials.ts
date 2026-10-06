// Client testimonials, shown in the animated testimonial cards on the homepage.

export interface Testimonial {
  name: string;
  initials: string;
  role: string;
  /** Short business name, shown on the poster card */
  business: string;
  quote: string;
  tone: 'orange' | 'mustard' | 'blue';
}

export const testimonials: Testimonial[] = [
  {
    name: 'Nishant Jaiswal',
    initials: 'NJ',
    role: 'Co-Founder, Vina Alkohal Liquor Store, Lucknow',
    business: 'Vina Alkohal',
    quote:
      "I just wanted to share a quick note and let you know that you guys do a really good job. I’m glad I decided to work with you.",
    tone: 'orange',
  },
  {
    name: 'Nikhil Anand',
    initials: 'NA',
    role: 'Elemento, Tiles and Sanitaryware',
    business: 'Elemento',
    quote:
      'We needed a website that could handle a large product catalogue and still load fast. BizMeUp delivered exactly that. The site is clean, professional, and our sales inquiries went up noticeably within the first month of going live. They understood our industry right away.',
    tone: 'mustard',
  },
  {
    name: 'Ahllya Sangeeta',
    initials: 'AS',
    role: 'Ahllya Mystic Numerology',
    business: 'Ahllya Mystic Numerology',
    quote:
      'I wanted a website that felt spiritual and trustworthy, not generic. BizMeUp took the time to understand the soul of my practice and built something that truly reflects it. My clients frequently tell me the website made them feel comfortable reaching out. That says everything.',
    tone: 'blue',
  },
];
