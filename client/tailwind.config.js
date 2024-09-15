/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}", // Tailwind will scan all relevant files in these directories
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {}, // Extend default theme if needed (optional for future use)
  },
  plugins: [], // Add plugins here as needed
};
