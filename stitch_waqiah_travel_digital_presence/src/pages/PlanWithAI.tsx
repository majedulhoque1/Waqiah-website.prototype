import { useRef, useState } from "react";
import {
  Sparkles,
  Wand2,
  Users,
  CalendarRange,
  Clock3,
  Hotel,
  Plane,
  FileCheck2,
  Car,
  MapPin,
  Check,
  RefreshCw,
} from "lucide-react";
import PageHero from "../components/ui/PageHero";
import Button from "../components/ui/Button";
import Chip from "../components/ui/Chip";
import { formatUSD, cn } from "../lib/utils";

type Journey = "Holiday" | "Tour" | "Umrah" | "Hajj";
type Comfort = "Value" | "Comfort" | "Premium";

const isPilgrimage = (j: Journey) => j === "Umrah" || j === "Hajj";

const JOURNEYS: Array<{ id: Journey; label: string; desc: string }> = [
  { id: "Holiday", label: "Holiday", desc: "Leisure & relaxation" },
  { id: "Tour", label: "Multi-city Tour", desc: "Explore several cities" },
  { id: "Umrah", label: "Umrah", desc: "Madinah + Makkah" },
  { id: "Hajj", label: "Hajj", desc: "The annual pilgrimage" },
];

const SEASONS = ["Flexible", "Spring", "Summer", "Autumn", "Winter", "Ramadan"];
const DURATIONS = [5, 7, 10, 14, 21];
const COMFORTS: Array<{ id: Comfort; stars: string; note: string }> = [
  { id: "Value", stars: "3★", note: "Comfortable & central" },
  { id: "Comfort", stars: "4★", note: "Premium & well-located" },
  { id: "Premium", stars: "5★", note: "Luxury & prime spots" },
];
const TRAVELER_PRESETS = [
  { label: "Solo", count: 1 },
  { label: "Couple", count: 2 },
  { label: "Family", count: 4 },
  { label: "Group", count: 8 },
];

const HOTELS: Record<Comfort, { makkah: string; madinah: string; stars: string; dist: string }> = {
  Value: { makkah: "Dar Al Eiman Royal", madinah: "Al Madinah Concorde", stars: "3★", dist: "~350 m to the Haram" },
  Comfort: { makkah: "Pullman ZamZam Makkah", madinah: "Madinah Mövenpick", stars: "4★", dist: "~150 m to the Haram" },
  Premium: { makkah: "Swissôtel Al Maqam", madinah: "Anwar Al Madinah Mövenpick", stars: "5★", dist: "Haram-facing · 0 min walk" },
};

const NIGHTLY: Record<Comfort, number> = { Value: 80, Comfort: 130, Premium: 190 };

type Step = { label: string; title: string; body: string };
type Budget = { Flights: number; Hotels: number; Visa: number; Transport: number; Experiences: number };
type Plan = {
  journey: Journey;
  destination: string;
  duration: number;
  travelers: number;
  comfort: Comfort;
  season: string;
  perPerson: number;
  budget: Budget;
  steps: Step[];
};

function dayLabel(start: number, end: number) {
  return start === end ? `Day ${start}` : `Days ${start}–${end}`;
}

function buildSteps(journey: Journey, duration: number, destination: string): Step[] {
  // ── Leisure / multi-city tour ──
  if (!isPilgrimage(journey)) {
    const dest = destination.trim() || "your destination";
    const mid = Math.max(3, duration - 1);
    return [
      { label: "Day 1", title: "Depart New York (JFK)", body: "Meet & greet and a partner-airline flight." },
      { label: "Day 2", title: `Arrive in ${dest}`, body: "Private transfer and check-in at your hand-picked hotel." },
      {
        label: dayLabel(3, mid),
        title: journey === "Tour" ? "Explore & travel between cities" : `Discover ${dest}`,
        body: journey === "Tour" ? "Guided tours, landmarks, and smooth intercity transfers." : "Curated sightseeing, experiences, and free time to relax.",
      },
      { label: `Day ${duration}`, title: "Return to New York", body: "Final transfer and return flight home." },
    ];
  }

  // ── Hajj / Umrah ──
  const core = Math.max(2, duration - 3);
  const madinahDays = Math.max(1, Math.round(core * 0.45));
  const makkahDays = Math.max(1, core - madinahDays - 1);

  const steps: Step[] = [
    { label: "Day 1", title: "Depart New York (JFK)", body: "Group meet & greet, check-in, and a direct partner-airline flight." },
    { label: "Day 2", title: "Arrive in Madinah", body: "Private transfer and check-in near Al-Masjid an-Nabawi." },
  ];
  const madinahStart = 3;
  const madinahEnd = madinahStart + madinahDays - 1;
  steps.push({ label: dayLabel(madinahStart, madinahEnd), title: "Madinah — ziyarat & worship", body: "Guided visits to historic sites with a knowledgeable scholar." });

  const umrahDay = madinahEnd + 1;
  steps.push({ label: `Day ${umrahDay}`, title: "Travel to Makkah & perform Umrah", body: "Enter ihram, perform Umrah, and settle into your Haram-area hotel." });

  const makkahStart = umrahDay + 1;
  const makkahEnd = makkahStart + makkahDays - 1;
  steps.push({ label: dayLabel(makkahStart, Math.min(makkahEnd, duration - 1)), title: "Makkah — daily worship", body: "Prayers at the Haram, spiritual programs, and optional ziyarat." });

  if (journey === "Hajj") {
    steps.push({ label: "Hajj days", title: "Mina, Arafat & Muzdalifah", body: "VIP camps and full scholar guidance through the rites of Hajj." });
  }

  steps.push({ label: `Day ${duration}`, title: "Return to New York", body: "Farewell tawaf, transfer, and return flight home." });
  return steps;
}

function buildPlan(journey: Journey, destination: string, duration: number, travelers: number, comfort: Comfort, season: string): Plan {
  const nights = duration - 1;
  const Hotels = nights * NIGHTLY[comfort];
  const Flights = 1300;
  const Visa = isPilgrimage(journey) ? 180 : 160;
  const Transport = 220;
  const Experiences =
    journey === "Hajj" ? 3500 : journey === "Umrah" ? 120 : journey === "Tour" ? 650 : 350;

  const budget: Budget = { Flights, Hotels, Visa, Transport, Experiences };
  const perPerson = Flights + Hotels + Visa + Transport + Experiences;

  return {
    journey,
    destination,
    duration,
    travelers,
    comfort,
    season,
    perPerson,
    budget,
    steps: buildSteps(journey, duration, destination),
  };
}

const BUDGET_META: Array<{ key: keyof Budget; icon: typeof Plane; label: string }> = [
  { key: "Flights", icon: Plane, label: "Flights" },
  { key: "Hotels", icon: Hotel, label: "Hotels" },
  { key: "Visa", icon: FileCheck2, label: "Visa & processing" },
  { key: "Transport", icon: Car, label: "Ground transport" },
  { key: "Experiences", icon: Sparkles, label: "Tours & guidance" },
];

export default function PlanWithAI() {
  const [journey, setJourney] = useState<Journey>("Holiday");
  const [destination, setDestination] = useState("Dubai");
  const [season, setSeason] = useState("Flexible");
  const [duration, setDuration] = useState(7);
  const [travelers, setTravelers] = useState(2);
  const [comfort, setComfort] = useState<Comfort>("Comfort");
  const [notes, setNotes] = useState("");
  const [plan, setPlan] = useState<Plan | null>(null);
  const [generating, setGenerating] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);

  const pilgrimage = isPilgrimage(journey);

  function generate() {
    setGenerating(true);
    window.setTimeout(() => {
      setPlan(buildPlan(journey, destination, duration, travelers, comfort, season));
      setGenerating(false);
      window.setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    }, 700);
  }

  const hotel = HOTELS[comfort];
  const maxBudget = plan ? Math.max(...Object.values(plan.budget)) : 1;
  const planPilgrimage = plan ? isPilgrimage(plan.journey) : false;

  return (
    <>
      <PageHero
        eyebrow="AI Trip Planner"
        title={
          <span className="inline-flex flex-wrap items-center gap-3">
            Plan with AI <Sparkles className="h-8 w-8 text-primary-soft" aria-hidden="true" />
          </span>
        }
        subtitle="Set your preferences and our planner drafts a tailored itinerary, hotels, and budget in seconds — for any destination, from a beach holiday to Hajj & Umrah. A preview; our coordinators confirm live availability and pricing."
      />

      <div className="container-px section-pad">
        <div className="grid gap-8 lg:grid-cols-[420px_1fr] lg:items-start">
          {/* ───────────── Builder ───────────── */}
          <div className="rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft lg:sticky lg:top-24">
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
                <Wand2 className="h-5 w-5" aria-hidden="true" />
              </span>
              <h2 className="font-display text-lg font-bold text-navy">Build your journey</h2>
            </div>

            {/* Journey */}
            <Fieldset label="Trip type">
              <div className="grid grid-cols-2 gap-2">
                {JOURNEYS.map((j) => (
                  <OptionCard key={j.id} active={journey === j.id} onClick={() => setJourney(j.id)} title={j.label} sub={j.desc} />
                ))}
              </div>
            </Fieldset>

            {/* Destination (non-pilgrimage) */}
            {!pilgrimage && (
              <Fieldset label="Destination">
                <input
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  placeholder="e.g. Dubai, Istanbul, Maldives…"
                  className="w-full rounded-md border border-outline-variant/70 bg-surface-container/50 px-3 py-2.5 text-sm outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15"
                />
              </Fieldset>
            )}

            {/* Season */}
            <Fieldset label="When">
              <div className="flex flex-wrap gap-2">
                {SEASONS.map((s) => (
                  <Pill key={s} active={season === s} onClick={() => setSeason(s)}>
                    {s}
                  </Pill>
                ))}
              </div>
            </Fieldset>

            {/* Duration */}
            <Fieldset label="Duration">
              <div className="flex flex-wrap gap-2">
                {DURATIONS.map((d) => (
                  <Pill key={d} active={duration === d} onClick={() => setDuration(d)}>
                    {d} days
                  </Pill>
                ))}
              </div>
            </Fieldset>

            {/* Travelers */}
            <Fieldset label="Travelers">
              <div className="flex flex-wrap gap-2">
                {TRAVELER_PRESETS.map((t) => (
                  <Pill key={t.label} active={travelers === t.count} onClick={() => setTravelers(t.count)}>
                    {t.label}
                  </Pill>
                ))}
              </div>
            </Fieldset>

            {/* Comfort */}
            <Fieldset label="Comfort level">
              <div className="grid grid-cols-3 gap-2">
                {COMFORTS.map((c) => (
                  <OptionCard key={c.id} active={comfort === c.id} onClick={() => setComfort(c.id)} title={`${c.id} ${c.stars}`} sub={c.note} compact />
                ))}
              </div>
            </Fieldset>

            {/* Notes */}
            <Fieldset label="Anything specific? (optional)">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                placeholder="e.g. budget per person, dietary needs, specific dates…"
                className="w-full resize-y rounded-md border border-outline-variant/70 bg-surface-container/50 px-3 py-2 text-sm outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15"
              />
            </Fieldset>

            <button
              type="button"
              onClick={generate}
              disabled={generating}
              className="mt-2 inline-flex min-h-[52px] w-full items-center justify-center gap-2 rounded-md bg-primary px-6 font-display font-bold text-white shadow-soft transition hover:bg-primary-dark hover:shadow-lift active:scale-[0.99] disabled:opacity-70"
            >
              {generating ? (
                <>
                  <RefreshCw className="h-5 w-5 animate-spin" aria-hidden="true" />
                  Drafting…
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" aria-hidden="true" />
                  {plan ? "Regenerate itinerary" : "Generate itinerary"}
                </>
              )}
            </button>
          </div>

          {/* ───────────── Result ───────────── */}
          <div ref={resultRef}>
            {!plan ? (
              <EmptyState />
            ) : (
              <div className="space-y-6 animate-fade-up">
                {/* Summary */}
                <div className="overflow-hidden rounded-xl border border-outline-variant/60 bg-white shadow-soft">
                  <div className="flex flex-col gap-4 border-b border-outline-variant/50 bg-navy p-6 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-label-sm font-semibold uppercase tracking-wider text-white">
                        <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                        AI draft itinerary
                      </span>
                      <h3 className="mt-2 font-display text-2xl font-extrabold text-white">
                        {planPilgrimage ? `${plan.journey} · ${plan.duration} days` : `${plan.journey} to ${plan.destination.trim() || "your destination"}`}
                      </h3>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="block text-xs uppercase tracking-wider text-white/70">Est. per person</span>
                      <span className="tabular font-display text-3xl font-extrabold text-white">{formatUSD(plan.perPerson)}</span>
                    </div>
                  </div>
                  <dl className="grid grid-cols-2 gap-px bg-outline-variant/40 sm:grid-cols-4">
                    {[
                      { icon: CalendarRange, label: "When", value: plan.season },
                      { icon: Clock3, label: "Duration", value: `${plan.duration} days` },
                      { icon: Users, label: "Travelers", value: plan.travelers === 1 ? "Solo" : `${plan.travelers} people` },
                      { icon: Hotel, label: "Comfort", value: `${plan.comfort} ${HOTELS[plan.comfort].stars}` },
                    ].map((m) => (
                      <div key={m.label} className="flex items-center gap-2.5 bg-white px-4 py-3.5">
                        <m.icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                        <div>
                          <dt className="text-xs text-muted">{m.label}</dt>
                          <dd className="font-display text-sm font-bold text-navy">{m.value}</dd>
                        </div>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* Timeline + hotels */}
                <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
                  <div className="rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft">
                    <h3 className="font-display text-lg font-bold text-navy">Your day-by-day plan</h3>
                    <ol className="mt-5">
                      {plan.steps.map((step, i) => (
                        <li key={`${step.label}-${i}`} className="relative flex gap-4 pb-6 last:pb-0">
                          {i < plan.steps.length - 1 && (
                            <span className="absolute left-[15px] top-8 h-full w-px bg-outline-variant" aria-hidden="true" />
                          )}
                          <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-primary text-white">
                            <Check className="h-4 w-4" aria-hidden="true" />
                          </span>
                          <div>
                            <span className="text-label-sm font-semibold uppercase tracking-wider text-primary">{step.label}</span>
                            <h4 className="font-display font-bold text-navy">{step.title}</h4>
                            <p className="text-sm text-muted">{step.body}</p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="space-y-6">
                    {/* Hotels */}
                    <div className="rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft">
                      <h3 className="font-display text-lg font-bold text-navy">Recommended stays</h3>
                      <p className="mt-1 text-sm text-muted">{planPilgrimage ? hotel.dist : `${plan.comfort} ${hotel.stars} · centrally located`}</p>
                      <ul className="mt-4 space-y-3">
                        {(planPilgrimage
                          ? [
                              { city: "Madinah", name: hotel.madinah },
                              { city: "Makkah", name: hotel.makkah },
                            ]
                          : [{ city: plan.destination.trim() || "Destination", name: `${plan.comfort} ${hotel.stars} hotel` }]
                        ).map((h) => (
                          <li key={h.city} className="flex items-center gap-3 rounded-md bg-surface-container p-3">
                            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md bg-primary-soft/40 text-primary">
                              <Hotel className="h-5 w-5" aria-hidden="true" />
                            </span>
                            <div>
                              <p className="font-display text-sm font-bold text-navy">{h.name}</p>
                              <p className="text-xs text-muted">
                                {h.city} · {hotel.stars}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Budget */}
                    <div className="rounded-xl border border-outline-variant/60 bg-white p-6 shadow-soft">
                      <h3 className="font-display text-lg font-bold text-navy">Estimated budget</h3>
                      <p className="mt-1 text-sm text-muted">Per person · indicative</p>
                      <ul className="mt-4 space-y-3">
                        {BUDGET_META.map((b) => {
                          const value = plan.budget[b.key];
                          return (
                            <li key={b.key}>
                              <div className="mb-1 flex items-center justify-between text-sm">
                                <span className="inline-flex items-center gap-2 text-muted">
                                  <b.icon className="h-4 w-4 text-navy" aria-hidden="true" />
                                  {b.label}
                                </span>
                                <span className="tabular font-semibold text-navy">{formatUSD(value)}</span>
                              </div>
                              <div className="h-1.5 overflow-hidden rounded-full bg-surface-high">
                                <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((value / maxBudget) * 100)}%` }} />
                              </div>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Handoff */}
                <div className="flex flex-col items-center gap-4 rounded-xl bg-navy p-6 text-center sm:flex-row sm:justify-between sm:text-left">
                  <div>
                    <p className="font-display text-lg font-bold text-white">Like this plan?</p>
                    <p className="text-sm text-white/75">
                      Hand it to a Waqiah coordinator to confirm dates, availability, and live pricing.
                    </p>
                    {notes.trim() && <p className="mt-2 text-xs text-white/60">Your note will be shared: “{notes.trim()}”</p>}
                  </div>
                  <Button to="/contact" variant="white" size="lg" className="shrink-0">
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    Talk to our team
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

/* ── Small local building blocks ── */

function Fieldset({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <fieldset className="mt-5">
      <legend className="mb-2 text-label-sm font-semibold uppercase tracking-wider text-muted">{label}</legend>
      {children}
    </fieldset>
  );
}

function Pill({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "min-h-[40px] rounded-full px-4 text-sm font-semibold transition-all duration-200",
        active ? "bg-primary text-white shadow-soft" : "border border-outline-variant/70 text-muted hover:border-primary/50 hover:text-navy"
      )}
    >
      {children}
    </button>
  );
}

function OptionCard({
  active,
  onClick,
  title,
  sub,
  compact = false,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  sub: string;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "rounded-md border p-3 text-left transition-all duration-200",
        active ? "border-primary bg-primary-soft/15 ring-1 ring-primary" : "border-outline-variant/70 hover:border-primary/40"
      )}
    >
      <span className={cn("block font-display font-bold text-navy", compact ? "text-xs" : "text-sm")}>{title}</span>
      <span className="mt-0.5 block text-xs leading-tight text-muted">{sub}</span>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="grid h-full min-h-[28rem] place-items-center rounded-xl border border-dashed border-outline-variant bg-surface-container/40 p-10 text-center">
      <div className="max-w-sm">
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-primary-soft/40 text-primary">
          <Wand2 className="h-8 w-8" aria-hidden="true" />
        </span>
        <h3 className="mt-5 font-display text-xl font-bold text-navy">Your itinerary appears here</h3>
        <p className="mt-2 text-muted">
          Choose your trip type, destination, and comfort level on the left, then generate a tailored
          draft — complete with a day-by-day plan, hotels, and budget.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          <Chip tone="neutral">Day-by-day plan</Chip>
          <Chip tone="neutral">Hotel picks</Chip>
          <Chip tone="neutral">Budget estimate</Chip>
        </div>
      </div>
    </div>
  );
}
