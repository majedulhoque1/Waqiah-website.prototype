/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Brand magenta (primary CTA / "Book Now") — DESIGN.md
        primary: {
          DEFAULT: "#D13184",
          dark: "#b00c6a",
          deep: "#8c0053",
          soft: "#f4a3c1",
          tint: "#ffd9e5",
          50: "#fff0f6",
        },
        // Deep navy — "foundation of trust" (headers, nav, emphasis)
        navy: {
          DEFAULT: "#3E3675",
          dark: "#2c2658",
          light: "#5e5697",
          soft: "#bfb6fe",
          tint: "#e5deff",
        },
        // Tonal neutrals from the Serene Voyage system
        surface: {
          DEFAULT: "#fcf9f8",
          container: "#f6f3f2",
          high: "#f0eded",
          dim: "#e5e2e1",
        },
        ink: "#1c1b1b",
        muted: "#574048",
        outline: {
          DEFAULT: "#8b7079",
          variant: "#debec8",
        },
        success: "#1f8a4c",
        warning: "#b8860b",
        danger: "#ba1a1a",
      },
      fontFamily: {
        display: ["Manrope", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["Work Sans", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "3.5rem", letterSpacing: "-0.02em", fontWeight: "700" }],
        "headline-lg": ["2rem", { lineHeight: "2.5rem", fontWeight: "600" }],
        "title-md": ["1.25rem", { lineHeight: "1.75rem", fontWeight: "600" }],
        "label-sm": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.05em", fontWeight: "500" }],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        md: "0.75rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        // Soft ambient, navy-tinted (DESIGN.md elevation)
        soft: "0 8px 24px -12px rgba(62, 54, 117, 0.16)",
        lift: "0 24px 48px -16px rgba(62, 54, 117, 0.22)",
        widget: "0 32px 64px -24px rgba(28, 27, 27, 0.35)",
      },
      maxWidth: {
        content: "1200px",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in": "fade-in 0.5s ease-out both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
