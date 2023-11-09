import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ["var(--font-lilita)"],
        'heading': ["var(--font-archivo)"],
      },
      colors: {
        p: {
          "1": "#0c460a",
          "2": "#135e17",
          "3": "#2b9d29",
          "4": "#5cf470",
          "5": "#baffb9",
          "6": "#deffdd"
        },
        s: {
          "1": "#0a4630",
          "2": "#135e48",
          "3": "#2b9d7e",
          "4": "#5cf4c5",
          "5": "#bafff0",
          "6": "#defffd"
        },
        a: {
          "1": "#46390a",
          "2": "#5e4b13",
          "3": "#9d7d2b",
          "4": "#f4c55c",
          "5": "#fff0ba",
          "6": "#fffdde"
        },
      },
    },
  },
  plugins: [],
}
export default config
