/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	i18n: {
		locales: ['de'],
		defaultLocale: 'de',
	},
	images: {
		domains: ['i.scdn.co'],
	},
};

module.exports = nextConfig;