import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { Section, SectionHeading } from "../components/ui/Section";
import PackageCard from "../components/ui/PackageCard";
import Button from "../components/ui/Button";
import { cn } from "../lib/utils";
import { PACKAGES, PACKAGE_FILTERS, type PackageType } from "../data/packages";

// Friendly labels for the filter chips.
const FILTER_LABEL: Record<PackageType | "All", string> = {
  All: "All",
  Hajj: "Hajj",
  Umrah: "Umrah",
  International: "Holidays",
};

const ITINERARY = [
  { day: "Day 1", title: "Departure from JFK", body: "Meet & greet, group check-in, and a direct partner-airline flight." },
  { day: "Day 2", title: "Arrival & transfer", body: "Private airport transfer and check-in at your chosen hotel." },
  { day: "Day 3–5", title: "Guided experiences", body: "Ziyarat, city tours, or leisure time — tailored to your trip." },
  { day: "Day 6", title: "Onward journey", body: "Travel between cities or sites with all logistics handled." },
  { day: "Day 7+", title: "Worship & discovery", body: "Daily programs, free time, and curated highlights." },
  { day: "Final day", title: "Return home", body: "Farewell, airport transfer, and return flight to New York." },
];

export default function Packages() {
  const [filter, setFilter] = useState<PackageType | "All">("All");
  const visible = filter === "All" ? PACKAGES : PACKAGES.filter((p) => p.type === filter);

  return (
    <>
      <PageHero
        eyebrow="Tours & Packages"
        title="Travel packages for every journey"
        subtitle="Worldwide holidays, multi-city tours, and expertly guided Hajj & Umrah — all-inclusive, competitively priced, and supported end-to-end by our New York team."
      />

      <Section>
        {/* Filters */}
        <div className="mb-10 flex flex-wrap gap-2" role="tablist" aria-label="Filter packages">
          {PACKAGE_FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn(
                "min-h-[44px] rounded-full px-5 text-sm font-semibold transition-all duration-200",
                filter === f
                  ? "bg-primary text-white shadow-soft"
                  : "border border-outline-variant/70 text-muted hover:border-primary/50 hover:text-navy"
              )}
            >
              {FILTER_LABEL[f]}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((pkg) => (
            <PackageCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </Section>

      {/* Pilgrimage specialty band */}
      <section className="border-y border-outline-variant/50 bg-navy">
        <div className="container-px grid items-center gap-6 py-12 sm:grid-cols-[1fr_auto]">
          <div>
            <span className="text-label-sm font-semibold uppercase tracking-wider text-primary-soft">Our specialty</span>
            <h2 className="mt-1 text-2xl font-extrabold text-white">Hajj & Umrah, done right</h2>
            <p className="mt-2 max-w-2xl text-white/80">
              Scholar-led groups, Haram-facing hotels, Saudi ground transport, and full visa handling —
              the journeys we're known for, with the same care we bring to every trip.
            </p>
          </div>
          <Button to="/contact" variant="white" size="lg" className="shrink-0">
            Enquire about pilgrimage
          </Button>
        </div>
      </section>

      {/* Sample itinerary */}
      <section className="bg-surface-container">
        <div className="container-px section-pad">
          <SectionHeading
            eyebrow="Sample itinerary"
            title="How a typical trip flows"
            body="An example structure — every package is tailored to your dates, group size, and preferences."
          />
          <ol className="mx-auto mt-12 max-w-3xl">
            {ITINERARY.map((step, i) => (
              <li key={step.day} className="relative flex gap-5 pb-8 last:pb-0">
                {i < ITINERARY.length - 1 && (
                  <span className="absolute left-[19px] top-10 h-full w-px bg-outline-variant" aria-hidden="true" />
                )}
                <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary text-white shadow-soft">
                  <Check className="h-5 w-5" aria-hidden="true" />
                </span>
                <div className="pt-1">
                  <span className="text-label-sm font-semibold uppercase tracking-wider text-primary">{step.day}</span>
                  <h3 className="font-display text-lg font-bold text-navy">{step.title}</h3>
                  <p className="mt-1 text-muted">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Button to="/contact" size="lg">
              Request a custom itinerary
              <ArrowRight className="h-5 w-5" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
