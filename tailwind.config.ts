/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e3ff04", // Add the custom primary color
      },
      container: {
        center: true, // Center the container
        padding: "1rem", // Default padding for the container
        screens: {
          sm: "100%", // Full width on small screens
          md: "768px", // Set max width for medium screens
          lg: "1024px", // Set max width for large screens
          xl: "1280px", // Set max width for extra large screens
          "2xl": "1536px", // Set max width for 2xl screens
        },
      },
    },
  },
  plugins: [],
};
