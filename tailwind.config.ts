import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#17120F",
        surface: "#17120F",
        "surface-dim": "#17120F",
        "surface-bright": "#3E3834",
        "surface-container-lowest": "#120D0A",
        "surface-container-low": "#201A17",
        "surface-container": "#241E1B",
        "surface-container-high": "#2F2925",
        "surface-container-highest": "#3A3330",
        "on-surface": "#ECE0DB",
        "on-surface-variant": "#E1BFB5",
        outline: "#A88A81",
        "outline-variant": "#59413A",
        primary: "#FFB59C",
        "primary-container": "#C4440F",
        "on-primary": "#5C1900",
        "on-primary-container": "#FFF1ED",
        secondary: "#FFB595",
        "secondary-container": "#8F3600",
        tertiary: "#96D4B2",
        "tertiary-container": "#3F7B5E",
        "tertiary-fixed": "#B1F0CD",
        "on-tertiary-container": "#D0FFE3",
        error: "#FFB4AB",
        "error-container": "#93000A",
        "on-error-container": "#FFDAD6",
        ash: {
          paper: "#F5F1EA",
          header: "#EAE4D9",
          border: "#B9AFA4",
          dark: "#16110E",
        },
      },
      fontFamily: {
        headline: ["Montserrat", "sans-serif"],
        editorial: ["EB Garamond", "serif"],
        body: ["Inter", "sans-serif"],
        mono: ["Geist", "monospace"],
      },
      maxWidth: {
        content: "1160px",
      },
      animation: {
        marquee: "marquee 25s linear infinite",
        "border-beam": "border-beam calc(var(--duration)*1s) infinite linear",
        "pulse-subtle": "pulse-subtle 3s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0%)" },
          to: { transform: "translateX(-50%)" },
        },
        "border-beam": {
          "100%": {
            "offset-distance": "100%",
          },
        },
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        shimmer: {
          from: { backgroundPosition: "0 0" },
          to: { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
