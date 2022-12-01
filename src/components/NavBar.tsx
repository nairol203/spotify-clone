import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled from 'styled-components';

const StyledNavBar = styled.nav`
	display: flex;
	position: fixed;
	top: 0;
	z-index: 5;
	width: 100%;
	height: ${({ theme }) => theme.navBarHeight};
	background-color: ${({ theme }) => theme.colors.card};
	padding: 0 1em;
	box-shadow: 0 0 4px rgb(0 0 0 / 0.4);
	align-items: center;
	gap: 2.5em;

	a {
		display: flex;
		align-items: center;
		gap: 1em;
		font-size: 1.3em;
		font-weight: 600;
	}

	a.active,
	a:hover {
		text-decoration: underline;
	}

	@media (min-width: ${({ theme }) => theme.mobile.threshold}) {
		img:hover {
			filter: brightness(1.15);
			transition: 500ms ease;
		}
	}
`;

export default function NavBar() {
	const router = useRouter();

	return (
		<StyledNavBar>
			<Link href='/'>
				<Image src='/logo.png' alt='Logo von Nairol Price Check' width={40} height={40} />
			</Link>
			{/* <Link className={router.pathname == '/' ? 'active' : ''} href='/'>
				Home
			</Link> */}
			<Link className={router.pathname == '/top/artists' ? 'active' : ''} href='/top/artists'>
				Top Artists
			</Link>
			<Link className={router.pathname == '/top/tracks' ? 'active' : ''} href='/top/tracks'>
				Top Tracks
			</Link>
		</StyledNavBar>
	);
}
