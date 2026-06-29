import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { NAV_LINKS } from "../../data/site";
import { cn } from "../../lib/utils";
import Logo from "../ui/Logo";
import Button from "../ui/Button";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  // Solidify the bar after a short scroll.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Transparent only over the home hero (which is light); every other page has a
  // dark hero, so use the readable glass bar there to keep nav links visible.
  const transparentTop = pathname === "/" && !scrolled && !open;

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    cn(
      "relative py-2 text-[15px] font-medium transition-colors",
      "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:rounded-full after:bg-primary after:transition-all after:duration-300",
      isActive
        ? "text-primary after:w-full"
        : "text-navy/80 hover:text-navy after:w-0 hover:after:w-full"
    );

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparentTop
          ? "bg-transparent"
          : "glass border-b border-outline-variant/50 shadow-soft"
      )}
    >
      <nav className="container-px flex h-16 items-center justify-between lg:h-20">
        <Logo />

        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden lg:block">
          <Button to="/plan-with-ai" size="sm">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Plan with AI
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-md text-navy hover:bg-navy/[0.06] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={cn(
          "glass overflow-hidden border-t border-outline-variant/50 lg:hidden",
          open ? "max-h-[26rem]" : "max-h-0"
        )}
        style={{ transition: "max-height 0.3s ease" }}
      >
        <div className="container-px flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-3 text-base font-medium transition-colors",
                  isActive ? "bg-primary-soft/30 text-primary" : "text-navy hover:bg-navy/[0.05]"
                )
              }
            >
              {link.label}
            </NavLink>
          ))}
          <Button to="/plan-with-ai" size="md" className="mt-2 w-full">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            Plan with AI
          </Button>
        </div>
      </div>
    </header>
  );
}
