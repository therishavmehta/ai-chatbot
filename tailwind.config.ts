/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Enable dark mode
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem", // Padding for containers
      screens: {
        "2xl": "1400px", // Breakpoint for 2xl screens
      },
    },
    extend: {
      screens: {
        xs: "380px", // Extra small breakpoint
        sm: "640px", // Default small screen breakpoint
        md: "768px", // Default medium screen breakpoint
        lg: "1024px", // Default large screen breakpoint
        xl: "1280px", // Default extra large screen breakpoint
        "2xl": "1536px", // Default 2xl screen breakpoint
        "3xl": "1920px", // Custom breakpoint for very large screens
      },
      colors: {
        background: {
          primary: "#1A1A1A", // Main background color
          secondary: "#2A2A2A", // Secondary background color
          tertiary: "#333333", // Tertiary background color,
        },
        toast: {
          background: "#1A202C", // Dark background
          border: "#2D3748", // Border color
          text: "#F7FAFC", // Text color
        },
        foreground: {
          primary: "#FFFFFF", // Primary text color
          secondary: "#A1A1A1", // Secondary text color
          tertiary: "#666666", // Tertiary text color,
          "gradient-start": "#34D399", // Custom green color for from-green-400
          "gradient-end": "#10B981", // Custom green color for to-green-600
        },
        accent: {
          primary: "#2196F3", // Accent color primary
          hover: "#1E88E5", // Accent color on hover
        },
        border: {
          DEFAULT: "#404040", // Default border color
          hover: "#4D4D4D", // Hover border color
        },
        input: "#404040", // Input field color
        ring: "#A1A1A1", // Ring color
      },
      borderRadius: {
        lg: "0.5rem", // Large border radius
        md: "calc(0.5rem - 2px)", // Medium border radius
        sm: "calc(0.5rem - 4px)", // Small border radius
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        "toast-slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "toast-slide-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out", // Animation for accordion down
        "accordion-up": "accordion-up 0.2s ease-out", // Animation for accordion up
        bounce: "bounce .5s infinite", // Bouncing animation
        blink: "blink 1s steps(2, start) infinite", // Blinking animation
        "toast-slide-in": "toast-slide-in 0.3s ease-out",
        "toast-slide-out": "toast-slide-out 0.3s ease-in",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"), // Animation plugin
    require("tailwind-scrollbar-hide"), // Scrollbar hide plugin
  ],
  // Add the custom range input thumb styles
  corePlugins: {
    // Make sure to enable range input styles
    appearance: false,
  },
  // Add custom styles to target the range input thumb
};
