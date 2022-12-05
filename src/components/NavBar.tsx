import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMediaQuery } from '@mantine/hooks';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styled, { useTheme } from 'styled-components';
import Dropdown from './core/Dropdown';
import { Flex } from './styles/Core.styled';

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
	justify-content: space-between;

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
	const theme = useTheme();
	const isDesktop = useMediaQuery(`(min-width: ${theme.mobile.threshold})`);

	const navLinks = [
		<Link key={0} className={router.pathname == '/' ? 'active' : ''} href='/'>
			Home
		</Link>,
		<Link key={1} className={router.pathname == '/top/artists' ? 'active' : ''} href='/top/artists'>
			Top Artists
		</Link>,
		<Link key={2} className={router.pathname == '/top/tracks' ? 'active' : ''} href='/top/tracks'>
			Top Tracks
		</Link>,
	];

	return (
		<StyledNavBar>
			<Flex gap='2.5em'>
				<Link href='/'>
					<Image src='/logo.png' alt='Logo von Nairol Price Check' width={40} height={40} />
				</Link>
				{isDesktop && navLinks}
			</Flex>
			{!isDesktop && <Dropdown trigger={<FontAwesomeIcon icon={faBars} width={30} height={30} />} menu={navLinks} />}
		</StyledNavBar>
	);
}
