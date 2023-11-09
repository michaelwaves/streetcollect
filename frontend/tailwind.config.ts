import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        p: {
          1: "#5B085D",
          2: "#AF12B1",
          3: "#f630f9",
          4: "#EE68F1",
          5: "#F5D1F6",
        },
        s: {
          1: "#084171",
          2: "#1B7BCA",
          3: "#289eff",
          4: "#87C7FC",
          5: "#DBEFFF",
        }
      }
    },
  },
  plugins: [],
}
export default config
