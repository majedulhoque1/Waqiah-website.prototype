import { Clock, CalendarCheck, ArrowRight, FileText, ShieldCheck } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { Section, SectionHeading } from "../components/ui/Section";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { formatUSD } from "../lib/utils";
import { VISA_SERVICES, VISA_STEPS } from "../data/visa";

export default function Visa() {
  return (
    <>
      <PageHero
        eyebrow="Visa Services"
        title="Visas, handled end-to-end"
        subtitle="From Umrah and tourist visas to Schengen and UK applications — our specialists prepare, submit, and track everything so you travel with confidence."
      />

      {/* Visa cards */}
      <Section>
        <SectionHeading
          align="left"
          eyebrow="Destinations"
          title="Popular visa services"
          body="Transparent service fees. Government and consular charges are quoted separately based on your nationality."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {VISA_SERVICES.map((v) => (
            <article
              key={v.id}
              className="relative flex flex-col rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              {v.popular && (
                <span className="absolute right-5 top-5">
                  <Chip tone="brand">Popular</Chip>
                </span>
              )}
              <span className="text-4xl" aria-hidden="true">
                {v.flag}
              </span>
              <h3 className="mt-4 font-display text-lg font-bold text-navy">{v.country}</h3>
              <p className="text-sm text-primary">{v.type}</p>

              <dl className="mt-5 space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted">
                  <Clock className="h-4 w-4 text-navy" aria-hidden="true" />
                  <dt className="sr-only">Processing time</dt>
                  <dd>{v.processing}</dd>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <CalendarCheck className="h-4 w-4 text-navy" aria-hidden="true" />
                  <dt className="sr-only">Validity</dt>
                  <dd>{v.validity} validity</dd>
                </div>
              </dl>

              <div className="mt-6 flex items-center justify-between border-t border-outline-variant/50 pt-4">
                <div>
                  <span className="block text-xs text-muted">Service fee from</span>
                  <span className="tabular font-display text-xl font-bold text-primary">{formatUSD(v.price)}</span>
                </div>
                <Button to="/contact" size="sm">
                  Apply
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Process */}
      <section className="bg-surface-container">
        <div className="container-px section-pad">
          <SectionHeading eyebrow="How it works" title="A simple, guided process" />
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {VISA_STEPS.map((step, i) => (
              <div key={step.title} className="rounded-xl bg-white p-6 shadow-soft">
                <span className="grid h-10 w-10 place-items-center rounded-full bg-navy font-display font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 font-display text-base font-bold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reassurance + CTA */}
      <Section>
        <div className="grid items-center gap-10 rounded-xl border border-outline-variant/60 bg-white p-8 shadow-soft lg:grid-cols-2 lg:p-12">
          <div>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Not sure which visa you need?</h2>
            <p className="mt-3 text-muted">
              Tell us your destination and travel dates. Our team confirms requirements, eligibility,
              and the exact documents you'll need — at no cost.
            </p>
            <div className="mt-6">
              <Button to="/contact" size="lg">
                Get a free eligibility review
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Button>
            </div>
          </div>
          <ul className="space-y-4">
            {[
              { icon: FileText, text: "Document checklist tailored to your nationality and purpose." },
              { icon: ShieldCheck, text: "Compliant submissions with consulate-ready paperwork." },
              { icon: CalendarCheck, text: "Status tracking and timely updates until a decision." },
            ].map((item) => (
              <li key={item.text} className="flex items-start gap-3 rounded-md bg-surface-container p-4">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary-soft/40 text-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm text-navy">{item.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
