import type { AppProps } from 'next/app';
import { trpc } from '@lib/trpc';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import Head from 'next/head';
import '../styles/globals.css';
import CurrentlyPlaying from '@components/CurrentlyPlaying';
import { SessionProvider } from 'next-auth/react';
import LeftNavBar from '@components/LeftNavBar';
import UserDropdown from '@components/UserDropdown';

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
	return (
		<SessionProvider session={session}>
			<Head>
				<link rel='icon' href='/logo.png' />
				<title>Nairol Spotify</title>
				<meta name='description' content='Nairol Spotify ist ein selbst entwickelter Spotify Client, der ein paar zusätzliche Features wie Top Songs bietet.' />
				<meta name='author' content='nairol203' />
				<meta name='viewport' content='width=device-width, initial-scale=1.0' />
				<link rel='shortcut icon' href='/logo.png' />
				<link rel='apple-touch-icon' sizes='192x192' href='/logo.png' />
				<meta property='og:title' content='Nairol Spotify' />
				<meta property='og:image' content='/logo.png' />
				<meta property='og:type' content='website' />
				<meta property='og:url' content='https://spotify.nairol.me' />
				<meta property='og:site_name' content='spotify.nairol.me' />
				<meta property='og:description' content='Nairol Spotify ist ein selbst entwickelter Spotify Client, der ein paar zusätzliche Features wie Top Songs bietet.' />
				<meta name='twitter:title' content='Nairol Spotify' />
				<meta name='twitter:description' content='Nairol Spotify ist ein selbst entwickelter Spotify Client, der ein paar zusätzliche Features wie Top Songs bietet.' />
				<meta name='twitter:image' content='https://spotify.nairol.me' />
				<meta name='twitter:site' content='@nairol203' />
				<meta name='twitter:creator' content='@nairol203' />
				<meta name='twitter:ccrard' content='summary' />
			</Head>
			<div className='grid h-screen grid-rows-[3.5rem_1fr_5rem] md:grid-rows-[1fr_6rem]'>
				<div className='md:hidden'>
					<NavBar />
				</div>
				<div className='overflow-y-auto md:grid md:grid-cols-[15rem_1fr]'>
					<LeftNavBar />
					<main className='overflow-y-auto relative'>
						<UserDropdown />
						<div className='mx-4'>
							<Component {...pageProps} />
							<Footer />
						</div>
					</main>
				</div>
				<CurrentlyPlaying />
			</div>
		</SessionProvider>
	);
}

export default trpc.withTRPC(App);
