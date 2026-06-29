import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/** Brand globe mark + "Waqiah Travel" wordmark. */
export default function Logo({
  className,
  tone = "navy",
}: {
  className?: string;
  tone?: "navy" | "white";
}) {
  return (
    <Link
      to="/"
      aria-label="Waqiah Travel — home"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-primary shadow-soft transition-transform duration-300 group-hover:scale-105">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="9" stroke="white" strokeWidth="1.6" />
          <path
            d="M3 12h18M12 3c2.5 2.4 2.5 15.6 0 18M12 3c-2.5 2.4-2.5 15.6 0 18"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "font-display text-xl font-extrabold tracking-tight",
          tone === "white" ? "text-white" : "text-primary"
        )}
      >
        Waqiah Travel
      </span>
    </Link>
  );
}
