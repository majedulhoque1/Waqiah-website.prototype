import { Plane, ArrowRight } from "lucide-react";
import type { Flight } from "../../data/flights";
import { formatUSD } from "../../lib/utils";
import Button from "./Button";

export default function FlightRow({ flight }: { flight: Flight }) {
  return (
    <article className="rounded-xl border border-outline-variant/60 bg-white p-5 shadow-soft transition-all duration-200 hover:border-primary/40 hover:shadow-lift">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        {/* Airline */}
        <div className="flex items-center gap-3 md:w-44">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy-tint text-navy">
            <Plane className="h-5 w-5 -rotate-45" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display font-semibold leading-tight text-navy">{flight.airline}</p>
            <p className="tabular text-xs text-muted">{flight.flightNo}</p>
          </div>
        </div>

        {/* Schedule */}
        <div className="flex flex-1 items-center justify-between gap-3 md:justify-center md:gap-6">
          <div className="text-center">
            <p className="tabular font-display text-xl font-bold text-navy">{flight.depart}</p>
            <p className="text-xs font-medium text-muted">{flight.from}</p>
          </div>
          <div className="flex flex-col items-center text-muted">
            <span className="text-xs">{flight.duration}</span>
            <span className="my-1 flex w-24 items-center sm:w-32" aria-hidden="true">
              <span className="h-px flex-1 bg-outline-variant" />
              <ArrowRight className="h-4 w-4" />
            </span>
            <span className="text-xs">{flight.stops}</span>
          </div>
          <div className="text-center">
            <p className="tabular font-display text-xl font-bold text-navy">{flight.arrive}</p>
            <p className="text-xs font-medium text-muted">{flight.to}</p>
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-4 border-t border-outline-variant/50 pt-4 md:w-48 md:flex-col md:items-end md:border-l md:border-t-0 md:pl-6 md:pt-0">
          <div className="text-right">
            <p className="tabular font-display text-2xl font-bold text-primary">{formatUSD(flight.price)}</p>
            <p className="text-xs text-muted">{flight.cabin} · round trip</p>
          </div>
          <Button to="/contact" size="sm" className="shrink-0">
            Select
          </Button>
        </div>
      </div>
    </article>
  );
}
