/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    "node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "src/**/*.{js,jsx,ts,tsx,vue}",
  ],
  //purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        "custom-green": "#70AD47",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
