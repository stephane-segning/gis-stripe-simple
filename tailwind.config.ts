import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui";

export default {
  content: [
    "./src/**/*.tsx",
    'node_modules/react-daisyui/dist/**/*.js',
  ],
  theme: {
    extend: {
      fontSize: {
        "3xl": "2rem"
      },
      fontFamily: {
        sans: ["Louis George Cafe", ...fontFamily.sans],
        serif: ["Louis George Cafe", ...fontFamily.serif],
        mono: ["Louis George Cafe", ...fontFamily.mono]
      },
    },
  },
  plugins: [daisyui],
} satisfies Config;