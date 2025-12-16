import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        border: "hsl(0 0% 15%)",
        input: "hsl(0 0% 8%)",
        ring: "hsl(0 80% 55%)",
        background: "hsl(0 0% 3%)",
        foreground: "hsl(0 0% 95%)",
        primary: {
          DEFAULT: "hsl(0 80% 55%)",
          foreground: "hsl(0 0% 100%)",
        },
        secondary: {
          DEFAULT: "hsl(0 0% 10%)",
          foreground: "hsl(0 0% 85%)",
        },
        destructive: {
          DEFAULT: "hsl(0 70% 50%)",
          foreground: "hsl(0 0% 98%)",
        },
        muted: {
          DEFAULT: "hsl(0 0% 12%)",
          foreground: "hsl(0 0% 50%)",
        },
        accent: {
          DEFAULT: "hsl(0 75% 45%)",
          foreground: "hsl(0 0% 100%)",
        },
        popover: {
          DEFAULT: "hsl(0 0% 8%)",
          foreground: "hsl(0 0% 95%)",
        },
        card: {
          DEFAULT: "hsl(0 0% 6%)",
          foreground: "hsl(0 0% 95%)",
        },
        sidebar: {
          DEFAULT: "hsl(0 0% 5%)",
          foreground: "hsl(0 0% 70%)",
          primary: "hsl(0 80% 55%)",
          "primary-foreground": "hsl(0 0% 100%)",
          accent: "hsl(0 0% 12%)",
          "accent-foreground": "hsl(0 0% 90%)",
          border: "hsl(0 0% 15%)",
          ring: "hsl(0 80% 55%)",
        },
        editor: {
          bg: "hsl(0 0% 2%)",
          line: "hsl(0 0% 8%)",
          "line-number": "hsl(0 0% 30%)",
        },
        status: {
          online: "hsl(142 76% 45%)",
          offline: "hsl(0 0% 40%)",
        },
      },
      borderRadius: {
        lg: "0.75rem",
        md: "0.5rem",
        sm: "0.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.95)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-up": "slide-up 0.4s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;