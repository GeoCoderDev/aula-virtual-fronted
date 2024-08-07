import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sxs: "0px",
        xs: "300px",
        sm: "600px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
        "max-xs": { max: "350px" },
        "max-sm": { max: "500px" },
        "max-md": { max: "768px" },
        "max-lg": { max: "976px" },
        "max-xl": { max: "1440px" },
        "pseudo-portrait": { raw: "(max-aspect-ratio: 1.4/1)" },
        portrait: { raw: "(orientation: portrait)" },
        landscape: { raw: "(orientation: landscape)" },
        "small-height": { raw: "(min-aspect-ratio: 2.55/1)" },
        "more-double-height": { raw: "(max-aspect-ratio: 1/2)" },
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "verde-spotify": "var(--color-interfaz)",
        "rojo-orange": "#FF0000",
        "rojo-orange-dark": "#880000",
        "azul-pablo": "#1400FF",
        "azul-pablo-dark": "#0c0181",
        "amarillo-pooh": "#FFB800",
        "amarillo-pooh-dark": "#b38000",
        "negro": "#000000",
        "negro-claro": "#303030",
        "color-interfaz":"#667788"
      },
    },
  },
  plugins: []
};
export default config;
