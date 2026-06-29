import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn } from "../../lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "white";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded font-display font-bold tracking-tight " +
  "transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 " +
  "focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface " +
  "disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer";

const variants: Record<Variant, string> = {
  primary: "bg-primary text-white shadow-soft hover:bg-primary-dark hover:shadow-lift",
  secondary: "border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white",
  ghost: "text-navy hover:bg-navy/[0.06]",
  white: "bg-white text-navy shadow-soft hover:bg-surface-container",
};

// Min height honours the 44px touch-target guideline.
const sizes: Record<Size, string> = {
  sm: "min-h-[40px] px-4 text-sm",
  md: "min-h-[44px] px-5 text-[15px]",
  lg: "min-h-[52px] px-7 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
};

type AsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { to?: undefined; href?: undefined };
type AsLink = CommonProps & { to: string; href?: undefined };
type AsAnchor = CommonProps & { href: string; to?: undefined };

export default function Button(props: AsButton | AsLink | AsAnchor) {
  const { variant = "primary", size = "md", className, children } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("to" in props && props.to !== undefined) {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  if ("href" in props && props.href !== undefined) {
    return (
      <a href={props.href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as AsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
