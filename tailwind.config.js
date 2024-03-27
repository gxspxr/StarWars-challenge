/** @type {import('tailwindcss').Config} */
export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				star: ['Star Wars', 'sans-serif'],
				orbit: ['Orbit', 'sans-serif']
			},
			screens: {
				xs: '200px', // 320-424
				sm: '425px', // 425-767
				md: '768px', // 786-1023
				lg: '1024px', // 1024 - 1279
				xl: '1280px', // 1280 - 1439
				xxl: '1440px' // 1440 +
			}
		}
	},
	plugins: []
};
