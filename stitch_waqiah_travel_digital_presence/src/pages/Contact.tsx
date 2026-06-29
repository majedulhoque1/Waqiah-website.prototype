import { useId, useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";
import { SITE } from "../data/site";
import { cn } from "../lib/utils";

const SERVICES = ["Hajj Package", "Umrah Package", "Flight Booking", "Visa Service", "General Enquiry"];

type Errors = Partial<Record<"name" | "email" | "message", string>>;

export default function Contact() {
  const uid = useId();
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
    if (key in errors) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Errors = {};
    if (!form.name.trim()) next.name = "Please enter your name.";
    if (!form.email.trim()) next.email = "Please enter your email.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Please enter a valid email address.";
    if (!form.message.trim()) next.message = "Tell us a little about your trip.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    // NOTE: stubbed — wired to a backend (Supabase/email) in the next phase.
    setSent(true);
  }

  const fieldBase =
    "min-h-[48px] w-full rounded-md border bg-surface-container/50 px-3.5 text-[15px] text-ink outline-none transition " +
    "focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15";

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's plan your journey"
        subtitle="Questions about a package, a flight, or a visa? Reach our New York team — we usually respond within one business day."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          {/* Info */}
          <div className="space-y-4">
            {[
              { icon: MapPin, label: "Visit us", value: `${SITE.address.line1}, ${SITE.address.line2}` },
              { icon: Phone, label: "Call us", value: SITE.phones.join(" · "), href: `tel:${SITE.phones[0].replace(/\s/g, "")}` },
              { icon: Mail, label: "Email us", value: SITE.email, href: `mailto:${SITE.email}` },
              { icon: Clock, label: "Office hours", value: SITE.hours },
            ].map((item) => (
              <div key={item.label} className="flex items-start gap-4 rounded-xl border border-outline-variant/60 bg-white p-5 shadow-soft">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-primary-soft/40 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="text-label-sm font-semibold uppercase tracking-wider text-muted">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="tabular font-medium text-navy hover:text-primary">
                      {item.value}
                    </a>
                  ) : (
                    <p className="font-medium text-navy">{item.value}</p>
                  )}
                </div>
              </div>
            ))}

            <div className="overflow-hidden rounded-xl border border-outline-variant/60 shadow-soft">
              <iframe
                title="Waqiah Travel office location"
                src="https://www.google.com/maps?q=45-19+48th+Avenue+Woodside+NY+11377&output=embed"
                className="h-56 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft sm:p-8">
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center" role="status" aria-live="polite">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-success/10 text-success">
                  <CheckCircle2 className="h-9 w-9" aria-hidden="true" />
                </span>
                <h2 className="mt-5 text-2xl font-extrabold text-navy">Thank you, {form.name.split(" ")[0]}!</h2>
                <p className="mt-2 max-w-sm text-muted">
                  Your enquiry has been received. A travel coordinator will be in touch within one
                  business day.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", phone: "", service: SERVICES[0], message: "" });
                  }}
                  className="mt-6 font-display font-bold text-primary hover:text-primary-dark"
                >
                  Send another enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor={`${uid}-name`} className="mb-1.5 block text-sm font-semibold text-navy">
                      Full name <span className="text-primary">*</span>
                    </label>
                    <input
                      id={`${uid}-name`}
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      className={cn(fieldBase, errors.name ? "border-danger" : "border-outline-variant/70")}
                    />
                    {errors.name && (
                      <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-danger">
                        <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div>
                    <label htmlFor={`${uid}-phone`} className="mb-1.5 block text-sm font-semibold text-navy">
                      Phone
                    </label>
                    <input
                      id={`${uid}-phone`}
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      autoComplete="tel"
                      className={cn(fieldBase, "border-outline-variant/70")}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor={`${uid}-email`} className="mb-1.5 block text-sm font-semibold text-navy">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    id={`${uid}-email`}
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    className={cn(fieldBase, errors.email ? "border-danger" : "border-outline-variant/70")}
                  />
                  {errors.email && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-danger">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor={`${uid}-service`} className="mb-1.5 block text-sm font-semibold text-navy">
                    I'm interested in
                  </label>
                  <select
                    id={`${uid}-service`}
                    value={form.service}
                    onChange={(e) => update("service", e.target.value)}
                    className={cn(fieldBase, "cursor-pointer border-outline-variant/70")}
                  >
                    {SERVICES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor={`${uid}-message`} className="mb-1.5 block text-sm font-semibold text-navy">
                    Your message <span className="text-primary">*</span>
                  </label>
                  <textarea
                    id={`${uid}-message`}
                    rows={4}
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Tell us your destination, dates, and number of travelers…"
                    aria-invalid={!!errors.message}
                    className={cn(fieldBase, "resize-y py-3", errors.message ? "border-danger" : "border-outline-variant/70")}
                  />
                  {errors.message && (
                    <p className="mt-1.5 inline-flex items-center gap-1 text-sm text-danger">
                      <AlertCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      {errors.message}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-display font-bold text-white shadow-soft transition hover:bg-primary-dark hover:shadow-lift active:scale-[0.99]"
                >
                  <Send className="h-5 w-5" aria-hidden="true" />
                  Send enquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
