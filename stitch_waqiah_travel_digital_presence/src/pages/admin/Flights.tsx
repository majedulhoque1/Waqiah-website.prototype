import { useState } from "react";
import { Plus, Pencil, Trash2, Plane, PlaneTakeoff } from "lucide-react";
import { useAdmin } from "../../admin/store";
import type { Flight } from "../../data/flights";
import type { BookingStatus } from "../../data/admin/seed";
import { formatUSD, cn } from "../../lib/utils";
import { Card, PageHeader, Modal, Field, fieldClass } from "../../components/admin/ui";

type Tab = "deals" | "bookings";

const blankFlight = (): Flight => ({
  id: `f-${Date.now()}`,
  airline: "",
  flightNo: "",
  from: "",
  fromCity: "",
  to: "",
  toCity: "",
  depart: "",
  arrive: "",
  duration: "",
  stops: "Non-stop",
  price: 0,
  cabin: "Economy",
});

export default function Flights() {
  const { flights, bookings, saveFlight, deleteFlight, setBookingStatus, showToast } = useAdmin();
  const [tab, setTab] = useState<Tab>("deals");
  const [editing, setEditing] = useState<Flight | null>(null);

  return (
    <div>
      <PageHeader
        title="Flights & Bookings"
        subtitle="Curate featured flight deals and manage customer bookings."
        action={
          tab === "deals" && (
            <button
              onClick={() => setEditing(blankFlight())}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
            >
              <Plus className="h-4 w-4" /> New flight deal
            </button>
          )
        }
      />

      <div className="mb-5 inline-flex rounded-lg bg-surface-container p-1">
        {(["deals", "bookings"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={cn(
              "rounded-md px-4 py-2 text-sm font-semibold transition-colors",
              tab === t ? "bg-white text-navy shadow-soft" : "text-muted hover:text-navy"
            )}
          >
            {t === "deals" ? `Flight deals (${flights.length})` : `Bookings (${bookings.length})`}
          </button>
        ))}
      </div>

      {tab === "deals" ? (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[820px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-semibold">Airline</th>
                  <th className="px-5 py-3 font-semibold">Route</th>
                  <th className="px-5 py-3 font-semibold">Times</th>
                  <th className="px-5 py-3 font-semibold">Stops</th>
                  <th className="px-5 py-3 font-semibold">Cabin</th>
                  <th className="px-5 py-3 text-right font-semibold">Fare</th>
                  <th className="px-5 py-3 text-right font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {flights.map((f) => (
                  <tr key={f.id} className="hover:bg-surface-container/40">
                    <td className="px-5 py-3">
                      <p className="font-semibold text-ink">{f.airline}</p>
                      <p className="text-xs text-muted">{f.flightNo}</p>
                    </td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 font-medium text-navy">
                        {f.from} <PlaneTakeoff className="h-3.5 w-3.5 text-primary" /> {f.to}
                      </span>
                      <p className="text-xs text-muted">{f.fromCity} → {f.toCity}</p>
                    </td>
                    <td className="px-5 py-3 text-muted">{f.depart} – {f.arrive}<br /><span className="text-xs">{f.duration}</span></td>
                    <td className="px-5 py-3 text-muted">{f.stops}</td>
                    <td className="px-5 py-3 text-muted">{f.cabin}</td>
                    <td className="px-5 py-3 text-right font-semibold text-navy">{formatUSD(f.price)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button
                          onClick={() => setEditing({ ...f })}
                          aria-label="Edit"
                          className="grid h-8 w-8 place-items-center rounded-md text-navy hover:bg-surface-container"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => {
                            deleteFlight(f.id);
                            showToast("Flight deal removed", "danger");
                          }}
                          aria-label="Delete"
                          className="grid h-8 w-8 place-items-center rounded-md text-danger hover:bg-danger/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {flights.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-muted">
                      No flight deals yet. Add one to feature it on the website.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-sm">
              <thead>
                <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                  <th className="px-5 py-3 font-semibold">Ref</th>
                  <th className="px-5 py-3 font-semibold">Customer</th>
                  <th className="px-5 py-3 font-semibold">Type</th>
                  <th className="px-5 py-3 font-semibold">Item</th>
                  <th className="px-5 py-3 font-semibold">Pax</th>
                  <th className="px-5 py-3 text-right font-semibold">Amount</th>
                  <th className="px-5 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/30">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-surface-container/40">
                    <td className="px-5 py-3 font-mono text-xs font-semibold text-navy">{b.ref}</td>
                    <td className="px-5 py-3 font-medium text-ink">{b.customer}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 text-muted">
                        <Plane className="h-3.5 w-3.5" /> {b.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-muted">{b.item}</td>
                    <td className="px-5 py-3 text-muted">{b.pax}</td>
                    <td className="px-5 py-3 text-right font-semibold text-navy">{formatUSD(b.amount)}</td>
                    <td className="px-5 py-3">
                      <select
                        value={b.status}
                        onChange={(e) => {
                          setBookingStatus(b.id, e.target.value as BookingStatus);
                          showToast(`${b.ref} → ${e.target.value}`);
                        }}
                        className="rounded-md border border-outline-variant/60 bg-white px-2 py-1 text-xs font-semibold text-navy outline-none focus:border-navy"
                      >
                        <option>Pending</option>
                        <option>Confirmed</option>
                        <option>Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {editing && (
        <FlightEditor
          flight={editing}
          isNew={!flights.some((f) => f.id === editing.id)}
          onClose={() => setEditing(null)}
          onSave={(f) => {
            saveFlight(f);
            setEditing(null);
            showToast(flights.some((x) => x.id === f.id) ? "Flight deal updated" : "Flight deal added");
          }}
        />
      )}
    </div>
  );
}

function FlightEditor({
  flight,
  isNew,
  onClose,
  onSave,
}: {
  flight: Flight;
  isNew: boolean;
  onClose: () => void;
  onSave: (f: Flight) => void;
}) {
  const [form, setForm] = useState<Flight>(flight);
  const set = <K extends keyof Flight>(k: K, v: Flight[K]) => setForm((f) => ({ ...f, [k]: v }));
  const valid = form.airline.trim() && form.from.trim() && form.to.trim() && form.price > 0;

  return (
    <Modal
      open
      onClose={onClose}
      wide
      title={isNew ? "New flight deal" : "Edit flight deal"}
      footer={
        <>
          <button onClick={onClose} className="min-h-[44px] rounded-md px-4 text-sm font-bold text-navy hover:bg-surface-container">
            Cancel
          </button>
          <button
            disabled={!valid}
            onClick={() => onSave(form)}
            className="min-h-[44px] rounded-md bg-primary px-5 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-50"
          >
            Save deal
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Airline">
          <input className={fieldClass} value={form.airline} onChange={(e) => set("airline", e.target.value)} />
        </Field>
        <Field label="Flight no.">
          <input className={fieldClass} value={form.flightNo} onChange={(e) => set("flightNo", e.target.value)} placeholder="EK 204" />
        </Field>
        <Field label="From (code)">
          <input className={fieldClass} value={form.from} onChange={(e) => set("from", e.target.value.toUpperCase())} placeholder="JFK" />
        </Field>
        <Field label="From city">
          <input className={fieldClass} value={form.fromCity} onChange={(e) => set("fromCity", e.target.value)} />
        </Field>
        <Field label="To (code)">
          <input className={fieldClass} value={form.to} onChange={(e) => set("to", e.target.value.toUpperCase())} placeholder="JED" />
        </Field>
        <Field label="To city">
          <input className={fieldClass} value={form.toCity} onChange={(e) => set("toCity", e.target.value)} />
        </Field>
        <Field label="Departs">
          <input className={fieldClass} value={form.depart} onChange={(e) => set("depart", e.target.value)} placeholder="11:00 PM" />
        </Field>
        <Field label="Arrives">
          <input className={fieldClass} value={form.arrive} onChange={(e) => set("arrive", e.target.value)} placeholder="07:45 PM" />
        </Field>
        <Field label="Duration">
          <input className={fieldClass} value={form.duration} onChange={(e) => set("duration", e.target.value)} placeholder="13h 45m" />
        </Field>
        <Field label="Stops">
          <input className={fieldClass} value={form.stops} onChange={(e) => set("stops", e.target.value)} placeholder="1 stop · DXB" />
        </Field>
        <Field label="Cabin">
          <select className={fieldClass} value={form.cabin} onChange={(e) => set("cabin", e.target.value)}>
            <option>Economy</option>
            <option>Premium Economy</option>
            <option>Business</option>
            <option>First</option>
          </select>
        </Field>
        <Field label="Fare (USD)">
          <input type="number" className={fieldClass} value={form.price || ""} onChange={(e) => set("price", Number(e.target.value))} />
        </Field>
      </div>
    </Modal>
  );
}
