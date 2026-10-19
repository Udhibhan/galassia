import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        void: "#05060a",
        deep: "#0a0c14",
        panel: "#0f121c",
        line: "rgba(255,255,255,0.08)",
        ink: "#e9ecf5",
        muted: "#8a90a6",
        flare: "#ff7a1a",
        ion: "#4cc9ff",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};

export default config;
