import type { Config } from "tailwindcss";

const c = (name: string) => `rgb(var(--md-${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: c("primary"),
        "on-primary": c("on-primary"),
        "primary-container": c("primary-container"),
        "on-primary-container": c("on-primary-container"),
        secondary: c("secondary"),
        "on-secondary": c("on-secondary"),
        "secondary-container": c("secondary-container"),
        "on-secondary-container": c("on-secondary-container"),
        surface: c("surface"),
        "surface-container": c("surface-container"),
        "surface-high": c("surface-high"),
        "on-surface": c("on-surface"),
        "on-surface-variant": c("on-surface-variant"),
        outline: c("outline"),
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      borderRadius: { "m3-xl": "28px", "m3-2xl": "48px" },
    },
  },
  plugins: [],
};
export default config;
