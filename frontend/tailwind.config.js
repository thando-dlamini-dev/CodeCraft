/** @type {import('tailwindcss').Config} */
export default {
	darkMode: 'class', // ✅ Enable class-based dark mode
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
	  extend: {
		animation: {
		  scroll: "scroll 10s linear infinite",
		},
		keyframes: {
		  scroll: {
			"0%": { transform: "translateX(0)" },
			"100%": { transform: "translateX(-50%)" }, // Moves left infinitely
		  },
		},
	  },
	},
	plugins: [],
  };
  