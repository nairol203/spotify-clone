/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    swcMinify: true,
    i18n: {
        locales: ['de'],
        defaultLocale: 'de',
    },
    images: {
        domains: ['i.scdn.co', 'mosaic.scdn.co', 'wrapped-images.spotifycdn.com', 'lineup-images.scdn.co', 'newjams-images.scdn.co', 'scontent-ams4-1.xx.fbcdn.net'],
    },
};

module.exports = nextConfig;
