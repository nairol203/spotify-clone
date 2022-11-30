import type { AppProps } from 'next/app';
import { ThemeProvider } from 'styled-components';
import { trpc } from '@lib/trpc';
import GlobalStyles from '@lib/global';
import NavBar from '@components/NavBar';
import Footer from '@components/Footer';
import { darkMode } from '@lib/themes';

function App({ Component, pageProps }: AppProps) {
	return (
		<ThemeProvider theme={darkMode}>
			<GlobalStyles />
			<NavBar />
			<Component {...pageProps} />
			<Footer />
		</ThemeProvider>
	);
}

export default trpc.withTRPC(App);
