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
        prime: {
          950: "#030303",
          900: "#080808",
          850: "#0D0D0D",
          800: "#141414",
          700: "#222222",
          600: "#333333",
          500: "#666666",
          400: "#999999",
          300: "#CCCCCC",
          200: "#E5E5E5",
          100: "#F5F5F5",
        },
        zap: {
          red: {
            DEFAULT: "#DC2626",
            light: "#EF4444",
            dark: "#991B1B",
            muted: "#7F1D1D",
          },
          carbon: {
            DEFAULT: "#09090B",
            surface: "#121216",
            border: "#27272A",
            muted: "#18181B",
          },
          silver: {
            DEFAULT: "#A1A1AA",
            light: "#E4E4E7",
            chrome: "#F4F4F5",
            dark: "#52525B",
          },
        },
        metallic: {
          chrome: "#F4F4F5",
          silver: "#D4D4D8",
          graphite: "#52525B",
          dark: "#18181B",
        },
        luxe: {
          gold: "#E4E4E7",
          goldLight: "#F4F4F5",
          blue: "#DC2626",
          red: "#DC2626",
          titanium: "#A1A1AA",
        }
      },
      fontFamily: {
        display: ["var(--font-syne)", "Syne", "sans-serif"],
        editorial: ["var(--font-cinzel)", "Cinzel", "serif"],
        sans: ["var(--font-geist-sans)", "Geist", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      letterSpacing: {
        super: "0.28em",
        ultra: "0.35em",
      },
      keyframes: {
        "pulse-subtle": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
      animation: {
        "pulse-subtle": "pulse-subtle 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;
