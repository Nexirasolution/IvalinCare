/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "#FDFBF9",
        champagne: "#FDF0F5",
        forest: {
          DEFAULT: "#4CAF50",
          light: "#8BC34A",
          dark: "#1B5E20",
        },
        gold: {
          DEFAULT: "#D4A017",
          light: "#E9C158",
          dark: "#A87A0E",
        },
        rose: {
          DEFAULT: "#EC1E96",
          light: "#F45CB3",
          dark: "#B8106F",
        },
        terracotta: {
          DEFAULT: "#EC1E96",
          light: "#F45CB3",
        },
        ink: "#2A2620",
        muted: "#75695F",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      backgroundImage: {
        "leaf-corner": "radial-gradient(circle at top left, rgba(76,175,80,0.06), transparent 60%)",
      },
      boxShadow: {
        soft: "0 8px 30px rgba(76,175,80,0.08)",
        card: "0 4px 20px rgba(42,38,32,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};