import type { Config } from "tailwindcss";
export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { cream:"#F5EFE4", beige:"#E7DCC6", stone:"#B9AC94", walnut:"#4A3427", bark:"#2E211A", bronze:"#9C6B3E", gold:"#C99A48" },
    fontFamily: { serif:["var(--font-serif)","serif"], sans:["var(--font-sans)","system-ui","sans-serif"] },
  }},
  plugins: [],
} satisfies Config;
