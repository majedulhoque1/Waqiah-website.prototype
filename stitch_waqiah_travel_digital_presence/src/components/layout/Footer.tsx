import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Plane } from "lucide-react";
import { SITE, FOOTER_LINKS } from "../../data/site";
import Logo from "../ui/Logo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-outline-variant/60 bg-surface-container">
      <div className="container-px py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{SITE.tagline}</p>
            <ul className="mt-5 space-y-2 text-sm text-muted">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span>
                  {SITE.address.line1}, {SITE.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <span className="tabular">{SITE.phones.join(" · ")}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <nav aria-label="Explore">
            <h4 className="text-label-sm font-semibold uppercase tracking-wider text-navy">Explore</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {FOOTER_LINKS.explore.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Legal */}
          <nav aria-label="Legal">
            <h4 className="text-label-sm font-semibold uppercase tracking-wider text-navy">Legal</h4>
            <ul className="mt-4 space-y-3 text-sm">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-muted transition-colors hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Trust badge */}
          <div className="rounded-xl border border-outline-variant/60 bg-white p-5">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary-soft/40 px-3 py-1 text-label-sm font-semibold uppercase text-primary-deep">
              <Plane className="h-3.5 w-3.5" aria-hidden="true" />
              Licensed &amp; Bonded
            </span>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              A fully licensed and bonded travel agency operating out of New York — your investment
              and journey are protected.
            </p>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-outline-variant/60 pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {year} {SITE.legalName} · Licensed &amp; Bonded.
          </p>
          <p className="text-xs uppercase tracking-wider">Crafted for assured peace of mind</p>
        </div>
      </div>
    </footer>
  );
}
