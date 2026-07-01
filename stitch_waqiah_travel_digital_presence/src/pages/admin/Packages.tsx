import { useState } from "react";
import { Plus, Pencil, Trash2, Star, Search } from "lucide-react";
import { useAdmin } from "../../admin/store";
import { PACKAGE_FILTERS, type PackageType, type TravelPackage } from "../../data/packages";
import { formatUSD, cn } from "../../lib/utils";
import { Card, PageHeader, StatusBadge, Modal, Field, fieldClass } from "../../components/admin/ui";

const blankPackage = (): TravelPackage => ({
  id: `pkg-${Date.now()}`,
  type: "Umrah",
  title: "",
  duration: "",
  nights: 0,
  price: 0,
  rating: 4.8,
  hotel: "",
  distance: "",
  image: "/hero-makkah.png",
  highlights: [],
  featured: false,
});

export default function Packages() {
  const { packages, savePackage, deletePackage, toggleFeatured, showToast } = useAdmin();
  const [filter, setFilter] = useState<PackageType | "All">("All");
  const [query, setQuery] = useState("");
  const [editing, setEditing] = useState<TravelPackage | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<TravelPackage | null>(null);

  const filtered = packages.filter((p) => {
    const matchType = filter === "All" || p.type === filter;
    const matchQuery = p.title.toLowerCase().includes(query.toLowerCase());
    return matchType && matchQuery;
  });

  return (
    <div>
      <PageHeader
        title="Packages"
        subtitle="Manage Hajj, Umrah, and international travel packages shown on the website."
        action={
          <button
            onClick={() => setEditing(blankPackage())}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-md bg-primary px-4 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark"
          >
            <Plus className="h-4 w-4" /> New package
          </button>
        }
      />

      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {PACKAGE_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors",
                filter === f
                  ? "bg-navy text-white"
                  : "bg-white text-navy ring-1 ring-inset ring-outline-variant/60 hover:bg-surface-container"
              )}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="relative ml-auto flex items-center">
          <Search className="pointer-events-none absolute left-3 h-4 w-4 text-muted" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search packages…"
            className="h-9 w-56 rounded-md border border-outline-variant/60 bg-white pl-9 pr-3 text-sm outline-none focus:border-navy focus:ring-2 focus:ring-navy/10"
          />
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead>
              <tr className="border-b border-outline-variant/40 text-left text-xs uppercase tracking-wide text-muted">
                <th className="px-5 py-3 font-semibold">Package</th>
                <th className="px-5 py-3 font-semibold">Type</th>
                <th className="px-5 py-3 font-semibold">Duration</th>
                <th className="px-5 py-3 text-right font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Rating</th>
                <th className="px-5 py-3 font-semibold">Featured</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/30">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-surface-container/40">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-ink">{p.title}</p>
                    <p className="text-xs text-muted">{p.hotel}</p>
                  </td>
                  <td className="px-5 py-3">
                    <StatusBadge status={p.type} tone="neutral" />
                  </td>
                  <td className="px-5 py-3 text-muted">{p.duration}</td>
                  <td className="px-5 py-3 text-right font-semibold text-navy">{formatUSD(p.price)}</td>
                  <td className="px-5 py-3">
                    <span className="inline-flex items-center gap-1 text-muted">
                      <Star className="h-3.5 w-3.5 fill-warning text-warning" /> {p.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => toggleFeatured(p.id)}
                      aria-label="Toggle featured"
                      className={cn(
                        "grid h-8 w-8 place-items-center rounded-md transition-colors",
                        p.featured ? "bg-warning/15 text-warning" : "text-muted hover:bg-surface-container"
                      )}
                    >
                      <Star className={cn("h-4 w-4", p.featured && "fill-current")} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => setEditing({ ...p })}
                        aria-label="Edit"
                        className="grid h-8 w-8 place-items-center rounded-md text-navy hover:bg-surface-container"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDelete(p)}
                        aria-label="Delete"
                        className="grid h-8 w-8 place-items-center rounded-md text-danger hover:bg-danger/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-5 py-12 text-center text-muted">
                    No packages match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {editing && (
        <PackageEditor
          pkg={editing}
          onClose={() => setEditing(null)}
          onSave={(p) => {
            savePackage(p);
            setEditing(null);
            showToast(packages.some((x) => x.id === p.id) ? "Package updated" : "Package created");
          }}
        />
      )}

      <Modal
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
        title="Delete package?"
        footer={
          <>
            <button
              onClick={() => setConfirmDelete(null)}
              className="min-h-[44px] rounded-md px-4 text-sm font-bold text-navy hover:bg-surface-container"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                if (confirmDelete) deletePackage(confirmDelete.id);
                showToast("Package deleted", "danger");
                setConfirmDelete(null);
              }}
              className="min-h-[44px] rounded-md bg-danger px-4 text-sm font-bold text-white hover:bg-danger/90"
            >
              Delete
            </button>
          </>
        }
      >
        <p className="text-sm text-muted">
          This will remove <span className="font-semibold text-ink">{confirmDelete?.title}</span> from the website.
          This can't be undone (in this demo, use “Reset demo data” to restore).
        </p>
      </Modal>
    </div>
  );
}

function PackageEditor({
  pkg,
  onClose,
  onSave,
}: {
  pkg: TravelPackage;
  onClose: () => void;
  onSave: (p: TravelPackage) => void;
}) {
  const [form, setForm] = useState<TravelPackage>(pkg);
  const set = <K extends keyof TravelPackage>(k: K, v: TravelPackage[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const valid = form.title.trim() && form.duration.trim() && form.price > 0;

  return (
    <Modal
      open
      onClose={onClose}
      wide
      title={pkg.title ? "Edit package" : "New package"}
      footer={
        <>
          <button onClick={onClose} className="min-h-[44px] rounded-md px-4 text-sm font-bold text-navy hover:bg-surface-container">
            Cancel
          </button>
          <button
            disabled={!valid}
            onClick={() => onSave({ ...form, highlights: form.highlights })}
            className="min-h-[44px] rounded-md bg-primary px-5 text-sm font-bold text-white shadow-soft transition hover:bg-primary-dark disabled:opacity-50"
          >
            Save package
          </button>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <Field label="Title">
            <input className={fieldClass} value={form.title} onChange={(e) => set("title", e.target.value)} />
          </Field>
        </div>
        <Field label="Type">
          <select
            className={fieldClass}
            value={form.type}
            onChange={(e) => set("type", e.target.value as PackageType)}
          >
            <option>Hajj</option>
            <option>Umrah</option>
            <option>International</option>
          </select>
        </Field>
        <Field label="Duration">
          <input
            className={fieldClass}
            placeholder="14 Days"
            value={form.duration}
            onChange={(e) => set("duration", e.target.value)}
          />
        </Field>
        <Field label="Price (USD)">
          <input
            type="number"
            className={fieldClass}
            value={form.price || ""}
            onChange={(e) => set("price", Number(e.target.value))}
          />
        </Field>
        <Field label="Rating">
          <input
            type="number"
            step="0.1"
            max="5"
            className={fieldClass}
            value={form.rating}
            onChange={(e) => set("rating", Number(e.target.value))}
          />
        </Field>
        <div className="sm:col-span-2">
          <Field label="Hotel(s)">
            <input className={fieldClass} value={form.hotel} onChange={(e) => set("hotel", e.target.value)} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Distance / location">
            <input className={fieldClass} value={form.distance} onChange={(e) => set("distance", e.target.value)} />
          </Field>
        </div>
        <div className="sm:col-span-2">
          <Field label="Highlights" hint="One per line">
            <textarea
              className={cn(fieldClass, "min-h-[96px] py-2.5")}
              value={form.highlights.join("\n")}
              onChange={(e) => set("highlights", e.target.value.split("\n").filter(Boolean))}
            />
          </Field>
        </div>
        <label className="flex items-center gap-2 sm:col-span-2">
          <input
            type="checkbox"
            checked={!!form.featured}
            onChange={(e) => set("featured", e.target.checked)}
            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary"
          />
          <span className="text-sm font-medium text-navy">Feature this package on the homepage</span>
        </label>
      </div>
    </Modal>
  );
}
