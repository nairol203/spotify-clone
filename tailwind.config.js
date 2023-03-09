/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/pages/**/*.{ts,tsx}', './src/components/**/*.{ts,tsx}'],
	theme: {
		extend: {
			screens: {
				sm: '650px',
				md: '850px',
				lg: '1050px',
				xl: '1250px',
				'2xl': '1450px',
				'3xl': '1650px',
				'4xl': '1850px',
				maxDesktop: '1800px',
			},
			width: {
				maxDesktop: '1800px',
			},
			colors: {
				primary: '#C21010',
				secondary: '#E64848',
				tertiary: '#d1d1d1',
				background: '#fff',
				text: '#000',
				card: '#f2f2f2',
				hover: '#e9e9e9',
				darkMode: {
					tertiary: '#545556',
					// background: '#121212',
					background: '#0f0f0f',
					text: '#f1f1f1',
					// card: '#272727',
					card: '#181818',
					hover: '#646464',
				},
			},
			gridTemplateColumns: {
				auto: 'repeat(auto-fit, minmax(25em, 1fr))',
			},
		},
	},
	plugins: [],
};
