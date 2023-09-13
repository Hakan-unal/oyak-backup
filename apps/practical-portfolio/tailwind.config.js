/** @type {import('tailwindcss').Config} */
module.exports = {
  presets : [ require('../../tailwind.config') ],
  content : [
    './pages/**/*.{js,ts,jsx,tsx}',
    './sections/**/*.{js,ts,jsx,tsx}',
    '../../libs/**/*.{js,ts,jsx,tsx}',
  ],
};
