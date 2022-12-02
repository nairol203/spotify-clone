import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { trpc } from '@lib/trpc';
import GlobalStyles from '@lib/global';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { darkMode, lightMode } from '@lib/themes';
import Head from 'next/head';
import { useEffect, useState } from 'react';

function App({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = useState<string | null>(null);

	useEffect(() => {
		const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
		setTheme(darkModeQuery.matches ? 'dark' : 'light');
		darkModeQuery.addEventListener('change', event => {
			setTheme(event.matches ? 'dark' : 'light');
		});
	}, [theme]);

	return (
		<ThemeProvider theme={theme === 'light' ? lightMode : darkMode}>
			<Head>
				<title>Nairol Spotify Stats</title>
				<meta name='description' content='Nairol Spotify Stats kann die Top Tracks, Top Artists und die kürzlich gespielten Songs anzeigen.' />
				<meta name='author' content='nairol203' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='shortcut icon' href='/logo.png' />
				<link rel='apple-touch-icon' sizes='192x192' href='/logo.png' />
				<meta property='og:title' content='Nairol Spotify Stats' />
				<meta property='og:image' content='/logo.png' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://stats.nairol.me' />
				<meta property='og:site_name' content='stats.nairol.me' />
				<meta property='og:description' content='Nairol Spotify Stats kann die Top Tracks, Top Artists und die kürzlich gespielten Songs anzeigen.' />
				<meta name='twitter:title' content='Nairol Spotify Stats' />
				<meta name='twitter:description' content='Nairol Spotify Stats kann die Top Tracks, Top Artists und die kürzlich gespielten Songs anzeigen.' />
				<meta name='twitter:image' content='https://stats.nairol.me' />
				<meta name='twitter:site' content='@nairol203' />
				<meta name='twitter:creator' content='@nairol203' />
				<meta name='twitter:card' content='summary' />
			</Head>
			<GlobalStyles />
			{theme && (
				<>
					<NavBar />
					<Component {...pageProps} />
					<Footer />
				</>
			)}
		</ThemeProvider>
	);
}

export default trpc.withTRPC(App);
