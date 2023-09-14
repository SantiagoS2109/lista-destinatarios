/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "royal-blue": "#1947a1",
        "darker-royal-blue": "#123271",
      },
      backgroundImage: {
        check:
          "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgZmlsbD0iI2ZmZmZmZiIgdmlld0JveD0iMCAwIDI1NiAyNTYiPjxwYXRoIGQ9Ik0yMjkuNjYsNzcuNjZsLTEyOCwxMjhhOCw4LDAsMCwxLTExLjMyLDBsLTU2LTU2YTgsOCwwLDAsMSwxMS4zMi0xMS4zMkw5NiwxODguNjksMjE4LjM0LDY2LjM0YTgsOCwwLDAsMSwxMS4zMiwxMS4zMloiPjwvcGF0aD48L3N2Zz4=')",
      },
    },
  },
  plugins: [],
};
