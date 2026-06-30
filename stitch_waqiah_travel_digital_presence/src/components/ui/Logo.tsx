import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

/** Real Waqiah Travel brand logo. */
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
      aria-label="Waqiah Travel - home"
      className={cn("group inline-flex items-center", className)}
    >
      <img
        src="/waqiah-logo.png"
        alt="Waqiah Travel & Tour Inc"
        className={cn(
          "h-12 w-auto transition-transform duration-300 group-hover:scale-105 lg:h-14",
          tone === "white" && "drop-shadow"
        )}
      />
    </Link>
  );
}
