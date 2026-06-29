import { useId, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftRight, MapPin, CalendarDays, Search, Users, AlertCircle } from "lucide-react";
import { CABIN_CLASSES, type CabinClass, type TripType } from "../../data/flights";
import { cn } from "../../lib/utils";

const TRIP_TABS: Array<{ id: TripType; label: string }> = [
  { id: "round", label: "Round Trip" },
  { id: "oneway", label: "One Way" },
  { id: "multi", label: "Multi City" },
];

export default function FlightSearchWidget() {
  const navigate = useNavigate();
  const today = useMemo(() => new Date().toISOString().split("T")[0], []);
  const uid = useId();

  const [trip, setTrip] = useState<TripType>("round");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [depart, setDepart] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [cabin, setCabin] = useState<CabinClass>("Economy");
  const [directOnly, setDirectOnly] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const showReturn = trip === "round";

  function swap() {
    setFrom(to);
    setTo(from);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!from.trim() || !to.trim()) {
      setError("Please enter both an origin and a destination.");
      return;
    }
    if (from.trim().toLowerCase() === to.trim().toLowerCase()) {
      setError("Origin and destination can't be the same.");
      return;
    }
    if (!depart) {
      setError("Please choose a departure date.");
      return;
    }
    if (showReturn && returnDate && returnDate < depart) {
      setError("Return date can't be before the departure date.");
      return;
    }
    setError(null);

    const params = new URLSearchParams({
      from: from.trim(),
      to: to.trim(),
      depart,
      trip,
      passengers: String(passengers),
      cabin,
      direct: String(directOnly),
    });
    if (showReturn && returnDate) params.set("return", returnDate);
    navigate(`/flights?${params.toString()}`);
  }

  const fieldBase =
    "min-h-[52px] w-full rounded-md border border-outline-variant/70 bg-surface-container/60 px-3 text-[15px] text-ink " +
    "outline-none transition focus:border-navy focus:bg-white focus:ring-2 focus:ring-navy/15";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full rounded-xl bg-white/95 p-4 shadow-widget backdrop-blur-sm sm:p-6"
      aria-label="Flight search"
    >
      {/* Trip type tabs */}
      <div
        className="mb-5 inline-flex flex-wrap gap-1 rounded-full bg-surface-container p-1"
        role="tablist"
        aria-label="Trip type"
      >
        {TRIP_TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            aria-selected={trip === t.id}
            onClick={() => setTrip(t.id)}
            className={cn(
              "min-h-[40px] rounded-full px-4 text-sm font-semibold transition-all duration-200",
              trip === t.id ? "bg-primary text-white shadow-soft" : "text-muted hover:text-navy"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Passengers + cabin */}
      <div className="mb-4 flex flex-wrap gap-3">
        <label className="flex items-center gap-2 rounded-full border border-outline-variant/70 px-3 py-1.5 text-sm">
          <Users className="h-4 w-4 text-muted" aria-hidden="true" />
          <span className="sr-only">Passengers</span>
          <select
            value={passengers}
            onChange={(e) => setPassengers(Number(e.target.value))}
            className="cursor-pointer bg-transparent pr-1 font-medium text-navy outline-none"
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Person" : "People"}
              </option>
            ))}
          </select>
        </label>

        <label className="flex items-center gap-2 rounded-full border border-outline-variant/70 px-3 py-1.5 text-sm">
          <span className="sr-only">Cabin class</span>
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value as CabinClass)}
            className="cursor-pointer bg-transparent pr-1 font-medium text-navy outline-none"
          >
            {CABIN_CLASSES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="ml-auto flex cursor-pointer items-center gap-2 text-sm text-muted">
          <input
            type="checkbox"
            checked={directOnly}
            onChange={(e) => setDirectOnly(e.target.checked)}
            className="h-4 w-4 rounded border-outline text-primary focus:ring-primary"
          />
          Direct flights only
        </label>
      </div>

      {/* Origin / Destination / Dates */}
      <div className="grid gap-3 lg:grid-cols-[1fr_auto_1fr_1fr_auto] lg:items-end">
        {/* Origin */}
        <div className="relative">
          <label htmlFor={`${uid}-from`} className="mb-1 block text-label-sm font-semibold uppercase text-muted">
            From
          </label>
          <MapPin className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-primary" aria-hidden="true" />
          <input
            id={`${uid}-from`}
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="City or airport"
            autoComplete="off"
            className={cn(fieldBase, "pl-9")}
          />
        </div>

        {/* Swap */}
        <button
          type="button"
          onClick={swap}
          aria-label="Swap origin and destination"
          className="mb-1 hidden h-11 w-11 shrink-0 place-items-center self-end rounded-full border border-outline-variant/70 bg-white text-navy transition hover:bg-navy hover:text-white lg:grid"
        >
          <ArrowLeftRight className="h-4 w-4" />
        </button>

        {/* Destination */}
        <div className="relative">
          <label htmlFor={`${uid}-to`} className="mb-1 block text-label-sm font-semibold uppercase text-muted">
            To
          </label>
          <MapPin className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-primary" aria-hidden="true" />
          <input
            id={`${uid}-to`}
            value={to}
            onChange={(e) => setTo(e.target.value)}
            placeholder="City or airport"
            autoComplete="off"
            className={cn(fieldBase, "pl-9")}
          />
        </div>

        {/* Departure */}
        <div className="relative">
          <label htmlFor={`${uid}-depart`} className="mb-1 block text-label-sm font-semibold uppercase text-muted">
            Departure
          </label>
          <CalendarDays className="pointer-events-none absolute left-3 top-[2.35rem] h-4 w-4 text-primary" aria-hidden="true" />
          <input
            id={`${uid}-depart`}
            type="date"
            min={today}
            value={depart}
            onChange={(e) => {
              setDepart(e.target.value);
              if (returnDate && e.target.value > returnDate) setReturnDate("");
            }}
            className={cn(fieldBase, "tabular pl-9")}
          />
        </div>

        {/* Search */}
        <button
          type="submit"
          className="grid min-h-[52px] place-items-center rounded-md bg-primary px-6 font-display font-bold text-white shadow-soft transition hover:bg-primary-dark hover:shadow-lift active:scale-[0.98]"
        >
          <span className="inline-flex items-center gap-2">
            <Search className="h-5 w-5" aria-hidden="true" />
            Search
          </span>
        </button>
      </div>

      {/* Return date (round trip only) */}
      {showReturn && (
        <div className="mt-3 max-w-[16rem]">
          <label htmlFor={`${uid}-return`} className="mb-1 block text-label-sm font-semibold uppercase text-muted">
            Return
          </label>
          <div className="relative">
            <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-primary" aria-hidden="true" />
            <input
              id={`${uid}-return`}
              type="date"
              min={depart || today}
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className={cn(fieldBase, "tabular pl-9")}
            />
          </div>
        </div>
      )}

      {trip === "multi" && (
        <p className="mt-3 text-sm text-muted">
          Planning a multi-city itinerary? Tell us your route on the{" "}
          <span className="font-semibold text-navy">Contact</span> page and our team will build it for you.
        </p>
      )}

      {error && (
        <p role="alert" className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-danger">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          {error}
        </p>
      )}
    </form>
  );
}
