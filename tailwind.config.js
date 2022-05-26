module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
