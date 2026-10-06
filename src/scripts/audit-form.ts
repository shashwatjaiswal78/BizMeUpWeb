/**
 * Audit form submission. Sends a simple form-encoded POST (no preflight) to the
 * Google Apps Script web app, which appends the lead to a Sheet and emails an alert.
 */
import { whatsappUrl } from '../config/site';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

const PHONE = /^(?:\+?91|0)?[6-9]\d{9}$/;

const messages: Record<string, string> = {
  name: 'Please add your name.',
  business: 'Please add your business name.',
  phone: 'Enter a 10-digit mobile number.',
};

function normalisePhone(value: string) {
  return value.replace(/[\s\-().]/g, '');
}

function setFieldError(form: HTMLFormElement, name: string, message: string | null) {
  const input = form.elements.namedItem(name) as HTMLInputElement | null;
  const error = form.querySelector<HTMLElement>(`#err-${name}`);
  if (!input || !error) return;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
  error.textContent = message ?? '';
  error.hidden = !message;
}

function validate(form: HTMLFormElement) {
  const data = new FormData(form);
  const invalid: string[] = [];
  for (const name of ['name', 'business']) {
    const ok = String(data.get(name) ?? '').trim().length > 0;
    setFieldError(form, name, ok ? null : messages[name]);
    if (!ok) invalid.push(name);
  }
  const phoneOk = PHONE.test(normalisePhone(String(data.get('phone') ?? '')));
  setFieldError(form, 'phone', phoneOk ? null : messages.phone);
  if (!phoneOk) invalid.push('phone');
  return invalid;
}

async function send(endpoint: string, body: URLSearchParams) {
  if (!endpoint) {
    // No endpoint configured yet (set PUBLIC_FORM_ENDPOINT). Pretend success in development only.
    if (import.meta.env.DEV) {
      console.info('[audit form] PUBLIC_FORM_ENDPOINT is not set; simulating success.', Object.fromEntries(body));
      await new Promise((r) => setTimeout(r, 600));
      return true;
    }
    return false;
  }
  const res = await fetch(endpoint, { method: 'POST', body });
  if (!res.ok) return false;
  const json = await res.json().catch(() => null);
  return json?.result === 'success';
}

export function initAuditForms() {
  document.querySelectorAll<HTMLFormElement>('.audit-form').forEach((form) => {
    if (form.dataset.ready) return;
    form.dataset.ready = 'true';

    const wrap = form.closest<HTMLElement>('.audit-form-wrap');
    const success = wrap?.querySelector<HTMLElement>('.audit-success');
    const whatsapp = wrap?.querySelector<HTMLAnchorElement>('.audit-whatsapp');
    const error = form.querySelector<HTMLElement>('.form-error');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');

    // Clear a field's error as soon as it is corrected.
    form.addEventListener('input', (e) => {
      const target = e.target as HTMLInputElement;
      if (target.getAttribute('aria-invalid') === 'true') validate(form);
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (error) error.hidden = true;

      const invalid = validate(form);
      if (invalid.length) {
        (form.elements.namedItem(invalid[0]) as HTMLInputElement | null)?.focus();
        return;
      }

      const data = new FormData(form);
      // Honeypot filled: quietly pretend it worked.
      const isBot = String(data.get('company_website') ?? '').length > 0;

      const body = new URLSearchParams({
        name: String(data.get('name')).trim(),
        business: String(data.get('business')).trim(),
        phone: normalisePhone(String(data.get('phone'))),
        link: String(data.get('link') ?? '').trim(),
        services: data.getAll('services').join(', '),
        budget: String(data.get('budget') ?? ''),
        page: window.location.pathname,
      });

      if (submit) submit.disabled = true;
      let ok = false;
      try {
        ok = isBot ? true : await send(form.dataset.endpoint ?? '', body);
      } catch {
        ok = false;
      }
      if (submit) submit.disabled = false;

      if (!ok) {
        if (error) error.hidden = false;
        return;
      }

      if (!isBot) {
        window.gtag?.('event', 'generate_lead', { form: 'visibility_audit' });
        window.fbq?.('track', 'Lead');
      }

      const name = body.get('name');
      const business = body.get('business');
      if (whatsapp) {
        whatsapp.href = whatsappUrl(
          `Hi BizMeUp, I’m ${name} from ${business}. I just booked a free visibility audit.`,
        );
      }
      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus();
      }
    });
  });
}
