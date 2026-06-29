/**
 * Tiny classname combiner — joins truthy class fragments with a space.
 * Keeps component markup readable without pulling in extra deps.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Format a USD price with no decimals, e.g. 4950 -> "$4,950". */
export function formatUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}
