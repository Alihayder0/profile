/** @type {import('tailwindcss').Config} */
module.exports = {
 darkMode: 'class',  // يجب تحديد 'class' وليس 'media'
  // تأكد من أن المسارات صحيحة لمطابقة ملفات JavaScript وTypeScript
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        "card-bg": "rgb(var(--card-bg) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        "primary-hover": "rgb(var(--primary-hover) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        "button-bg": "rgb(var(--button-bg) / <alpha-value>)",
        "button-text": "rgb(var(--button-text) / <alpha-value>)",
        link: "rgb(var(--link) / <alpha-value>)",
        "link-hover": "rgb(var(--link-hover) / <alpha-value>)",
      },
    },
  },
  plugins: [],
};



