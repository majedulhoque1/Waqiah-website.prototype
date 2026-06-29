import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Compass,
  BadgeDollarSign,
  Sparkles,
  ArrowRight,
  Plane,
  Globe2,
  HeartHandshake,
  Hotel,
  Briefcase,
  Star,
  MapPin,
} from "lucide-react";
import { Section, SectionHeading } from "../components/ui/Section";
import FeatureCard from "../components/ui/FeatureCard";
import PackageCard from "../components/ui/PackageCard";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import FlightSearchWidget from "../components/home/FlightSearchWidget";
import { PACKAGES } from "../data/packages";
import { AIRLINE_PARTNERS, SITE } from "../data/site";

const TRUST = [
  { icon: ShieldCheck, label: "Licensed & Bonded" },
  { icon: Star, label: `${SITE.rating.score}★ on ${SITE.rating.source}` },
  { icon: MapPin, label: "Woodside, New York" },
  { icon: Plane, label: "Global airline partners" },
];

const SERVICES = [
  { icon: Plane, title: "Flights", to: "/flights", body: "Competitive fares worldwide across our airline partners." },
  { icon: Globe2, title: "Tours & Packages", to: "/packages", body: "Holidays and multi-city tours, fully arranged." },
  { icon: Compass, title: "Hajj & Umrah", to: "/packages", body: "Scholar-led, all-inclusive sacred journeys — our specialty." },
  { icon: HeartHandshake, title: "Visa Services", to: "/visa", body: "End-to-end, compliant visa processing." },
  { icon: Hotel, title: "Hotels & Stays", to: "/contact", body: "Hand-picked hotels and resorts at the right price." },
  { icon: Briefcase, title: "Corporate & Group", to: "/contact", body: "Reliable travel management for teams and groups." },
];

export default function Home() {
  const featured = PACKAGES.filter((p) => p.featured)
    .concat(PACKAGES.filter((p) => !p.featured))
    .slice(0, 3);

  return (
    <>
      {/* ───────────────────────── Hero ───────────────────────── */}
      <section className="relative isolate overflow-hidden pb-28 pt-28 lg:pb-40 lg:pt-36">
        <div className="absolute inset-0 -z-10">
          <img
            src="/hero-makkah.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/85 to-surface/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent" />
        </div>

        <div className="container-px">
          <div className="max-w-3xl animate-fade-up">
            <Chip tone="brand" className="bg-white/80">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Licensed &amp; Bonded Travel Agency · New York
            </Chip>
            <h1 className="mt-5 text-[2.4rem] font-extrabold leading-[1.08] tracking-tight text-navy sm:text-5xl lg:text-[3.4rem]">
              Travel the world with confidence — from{" "}
              <span className="text-gradient">flights &amp; tours</span> to Hajj &amp; Umrah.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
              {SITE.description}
            </p>
          </div>

          {/* Search widget */}
          <div className="mt-10 animate-scale-in lg:mt-12">
            <FlightSearchWidget />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Trust strip ───────────────────────── */}
      <section className="border-y border-outline-variant/50 bg-surface-container">
        <div className="container-px grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
          {TRUST.map((t) => (
            <div key={t.label} className="flex items-center justify-center gap-2.5 text-center">
              <t.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <span className="font-display text-sm font-bold text-navy">{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ───────────────────────── Services ───────────────────────── */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="One agency for every journey"
          body="A full-service travel agency in Queens, New York — with deep expertise in Hajj & Umrah and a world of destinations beyond."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s) => (
            <Link
              key={s.title}
              to={s.to}
              className="group flex items-start gap-4 rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:shadow-lift"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-md bg-primary-soft/40 text-primary">
                <s.icon className="h-6 w-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="flex-1">
                <span className="flex items-center gap-1.5 font-display font-bold text-navy">
                  {s.title}
                  <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-1 group-hover:text-primary" aria-hidden="true" />
                </span>
                <span className="mt-1 block text-sm text-muted">{s.body}</span>
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* ───────────────────────── Why choose ───────────────────────── */}
      <section className="bg-surface-container">
        <div className="container-px section-pad">
          <SectionHeading
            eyebrow="Why Waqiah"
            title="Why travelers choose Waqiah"
            body="Whether it's a family holiday, a business trip, or the journey of a lifetime — we handle every detail so you don't have to."
          />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <FeatureCard
              icon={Compass}
              title="Expert Guidance"
              body="From the best fares to scholar-led pilgrimage, our seasoned team plans every step — so your journey is smooth from booking to return."
            />
            <FeatureCard
              highlighted
              icon={ShieldCheck}
              title="Licensed & Bonded"
              body="Travel with absolute confidence. We're a fully licensed and bonded agency in New York, protecting your investment and your safety."
            />
            <FeatureCard
              icon={BadgeDollarSign}
              title="Competitive Pricing"
              body="We leverage global airline and hotel partnerships to secure the most competitive rates — without compromising on quality or comfort."
            />
          </div>
        </div>
      </section>

      {/* ───────────────────────── Featured packages ───────────────────────── */}
      <Section>
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Curated journeys"
            title="Featured Packages"
            body="A taste of what we arrange — from worldwide holidays to Haram-facing pilgrimage stays."
          />
          <Button to="/packages" variant="secondary" size="md" className="shrink-0">
            View all packages
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Section>

      {/* ───────────────────────── Airline partners ───────────────────────── */}
      <section className="border-t border-outline-variant/50 bg-surface-container">
        <div className="container-px py-12">
          <p className="text-center text-label-sm font-semibold uppercase tracking-[0.18em] text-muted">
            Trusted Airline Partners
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {AIRLINE_PARTNERS.map((p) => (
              <span key={p.name} className="inline-flex items-center gap-2 font-display text-lg font-bold text-navy/70">
                <Plane className="h-5 w-5 text-primary" aria-hidden="true" />
                {p.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────── AI planner CTA ───────────────────────── */}
      <Section>
        <div className="relative overflow-hidden rounded-xl bg-navy px-6 py-14 text-center sm:px-12 lg:py-20">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/30 blur-3xl" aria-hidden="true" />
          <div className="absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-primary/20 blur-3xl" aria-hidden="true" />
          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-label-sm font-semibold uppercase tracking-wider text-white">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              New · AI Trip Planner
            </span>
            <h2 className="mt-5 text-3xl font-extrabold text-white sm:text-4xl">
              Let AI draft your perfect trip
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-white/80">
              Tell us your destination, dates, and budget — our planner builds a tailored itinerary,
              hotels, and estimate in seconds. Then hand it to our team to book.
            </p>
            <div className="mt-8">
              <Button to="/plan-with-ai" variant="white" size="lg">
                <Sparkles className="h-5 w-5" aria-hidden="true" />
                Plan with AI
              </Button>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
