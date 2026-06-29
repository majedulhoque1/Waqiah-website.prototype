import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plane, ArrowRight, SlidersHorizontal } from "lucide-react";
import PageHero from "../components/ui/PageHero";
import { Section } from "../components/ui/Section";
import FlightSearchWidget from "../components/home/FlightSearchWidget";
import FlightRow from "../components/ui/FlightRow";
import { SAMPLE_FLIGHTS, POPULAR_AIRPORTS } from "../data/flights";

type Sort = "recommended" | "price" | "duration";

function durationToMinutes(d: string): number {
  const h = /(\d+)h/.exec(d);
  const m = /(\d+)m/.exec(d);
  return (h ? Number(h[1]) : 0) * 60 + (m ? Number(m[1]) : 0);
}

export default function Flights() {
  const [params] = useSearchParams();
  const [sort, setSort] = useState<Sort>("recommended");

  const from = params.get("from");
  const to = params.get("to");
  const depart = params.get("depart");

  const flights = useMemo(() => {
    const list = [...SAMPLE_FLIGHTS];
    if (sort === "price") list.sort((a, b) => a.price - b.price);
    if (sort === "duration") list.sort((a, b) => durationToMinutes(a.duration) - durationToMinutes(b.duration));
    return list;
  }, [sort]);

  return (
    <>
      <PageHero
        eyebrow="Global Flights"
        title="Find your best fare"
        subtitle="Compare competitive fares across Emirates, Qatar Airways, Turkish Airlines, Saudia, and more — booked and supported by our New York team."
      />

      {/* Search */}
      <div className="container-px relative z-10 -mt-10">
        <FlightSearchWidget />
      </div>

      <Section className="!pt-12">
        {/* Result context + sort */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {from && to ? (
              <p className="flex flex-wrap items-center gap-2 font-display text-lg font-bold text-navy">
                {from}
                <ArrowRight className="h-4 w-4 text-primary" aria-hidden="true" />
                {to}
                {depart && <span className="text-sm font-normal text-muted">· {depart}</span>}
              </p>
            ) : (
              <p className="font-display text-lg font-bold text-navy">Popular fares from New York (JFK)</p>
            )}
            <p className="text-sm text-muted">{flights.length} results · prices are round-trip estimates</p>
          </div>

          <label className="inline-flex items-center gap-2 self-start rounded-md border border-outline-variant/70 bg-white px-3 py-2 text-sm">
            <SlidersHorizontal className="h-4 w-4 text-muted" aria-hidden="true" />
            <span className="text-muted">Sort by</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="cursor-pointer bg-transparent font-medium text-navy outline-none"
            >
              <option value="recommended">Recommended</option>
              <option value="price">Lowest price</option>
              <option value="duration">Shortest duration</option>
            </select>
          </label>
        </div>

        <div className="space-y-4">
          {flights.map((f) => (
            <FlightRow key={f.id} flight={f} />
          ))}
        </div>

        {/* Popular routes */}
        <div className="mt-14">
          <h2 className="font-display text-xl font-bold text-navy">Popular destinations</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {POPULAR_AIRPORTS.map((a) => (
              <span
                key={a.code}
                className="inline-flex items-center gap-2 rounded-full border border-outline-variant/70 bg-white px-4 py-2 text-sm"
              >
                <Plane className="h-4 w-4 text-primary" aria-hidden="true" />
                <span className="font-semibold text-navy">{a.code}</span>
                <span className="text-muted">{a.city}</span>
              </span>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
