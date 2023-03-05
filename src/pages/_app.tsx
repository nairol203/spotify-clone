import type { AppProps } from 'next/app';
import { trpc } from '@lib/trpc';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Head from 'next/head';
import '../styles/globals.css';
import CurrentlyPlaying from '@components/CurrentlyPlaying';

function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<link rel='icon' href='/logo.png' />
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
			<NavBar />
			<main className='mx-4 mt-14 mb-20 min-h-screen max-w-screen-maxDesktop sm:mb-24 md:mt-12 maxDesktop:mx-auto'>
				<Component {...pageProps} />
			</main>
			<CurrentlyPlaying />
			{/* <Footer /> */}
		</>
	);
}

export default trpc.withTRPC(App);
