// Site-wide settings. Values in [square brackets] are placeholders
// awaiting real details from BizMeUp (CLAUDE.md section 12).

export const site = {
  name: 'BizMeUp',
  tagline: 'Turning Business Challenges into Success Stories',
  location: 'Mohali / Chandigarh, India',
  // Shown in the footer
  country: 'India',
  email: 'mail.bizmeup@gmail.com',
  phone: { label: '+91 73091 38731', href: 'tel:+917309138731' },
  instagram: { label: 'Instagram', url: 'https://www.instagram.com/bizmeup.in/' },
  linkedin: { label: 'LinkedIn', url: 'https://www.linkedin.com/company/biz-me-up-india/' },
  // Digits only with country code
  whatsappNumber: '917309138731',
  whatsappMessage: "Hi BizMeUp, I’d like a free visibility audit.",
};

export const nav = [
  { label: 'Services', href: '/#services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export const auditHref = '/#audit';

/** wa.me link with a pre-filled message. */
export function whatsappUrl(message: string = site.whatsappMessage): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
