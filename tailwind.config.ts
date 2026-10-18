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
      backgroundImage: {
        spectrum:
          "linear-gradient(90deg,#ff3b3b,#ff7a1a,#ffd23f,#3bff7a,#2ee6ff,#3b5bff,#c43bff)",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        scan: {
          "0%": { top: "0%" },
          "100%": { top: "100%" },
        },
        pulseDot: {
          "0%,100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 40s linear infinite",
        "spin-slower": "spin-slow 120s linear infinite",
        scan: "scan 3.5s ease-in-out infinite alternate",
        "pulse-dot": "pulseDot 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
