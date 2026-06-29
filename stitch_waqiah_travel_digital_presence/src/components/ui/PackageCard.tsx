import { MapPin, Star, Hotel, Clock } from "lucide-react";
import type { TravelPackage } from "../../data/packages";
import { formatUSD } from "../../lib/utils";
import Chip from "./Chip";
import Button from "./Button";

export default function PackageCard({ pkg }: { pkg: TravelPackage }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant/60 bg-white shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={pkg.image}
          alt={`${pkg.title} — ${pkg.hotel}`}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
        <div className="absolute left-4 top-4">
          <Chip tone="brand" className="bg-white/90 backdrop-blur">
            {pkg.type}
          </Chip>
        </div>
        <div className="absolute right-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-right shadow-soft backdrop-blur">
          <span className="block text-[10px] font-medium uppercase tracking-wide text-muted">From</span>
          <span className="tabular block font-display text-base font-bold text-primary">
            {formatUSD(pkg.price)}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-center gap-2 text-sm text-muted">
          <span className="inline-flex items-center gap-1 font-semibold text-navy">
            <Star className="h-4 w-4 fill-warning text-warning" aria-hidden="true" />
            {pkg.rating.toFixed(1)}
          </span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1">
            <Clock className="h-4 w-4" aria-hidden="true" />
            {pkg.duration}
          </span>
        </div>

        <h3 className="font-display text-lg font-bold leading-snug text-navy">{pkg.title}</h3>

        <p className="mt-2 inline-flex items-start gap-1.5 text-sm text-muted">
          <Hotel className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{pkg.hotel}</span>
        </p>
        <p className="mt-1 inline-flex items-center gap-1.5 text-sm text-muted">
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          {pkg.distance}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 3).map((h) => (
            <li key={h}>
              <Chip tone="neutral">{h}</Chip>
            </li>
          ))}
        </ul>

        <div className="mt-5 flex items-center gap-3 border-t border-outline-variant/50 pt-4">
          <Button to="/contact" variant="primary" size="sm" className="flex-1">
            Book Now
          </Button>
          <Button to="/packages" variant="secondary" size="sm" className="flex-1">
            View Details
          </Button>
        </div>
      </div>
    </article>
  );
}
