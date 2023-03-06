import { faBookmark, faChartLine, faHeart, faHome, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trpc } from '@lib/trpc';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function LeftNavBar() {
	const router = useRouter();
	const { data: session } = useSession();
	// @ts-expect-error
	const playlists = trpc.playlists.useQuery({ access_token: session?.user?.access_token });

	console.log(router);

	return (
		<nav className='hidden h-full flex-col gap-4 overflow-y-auto bg-black py-4 px-3 md:flex '>
			<Link href='/' className='flex items-center gap-2'>
				<Image
					src='/logo.png'
					alt='Logo von Nairol Price Check'
					width={30}
					height={30}
					className='md:hover:underline md:hover:underline-offset-4 md:hover:brightness-110'
				/>
				<h1>Nairol Spotify</h1>
			</Link>
			<div className='m-2 flex flex-col gap-4'>
				<Link className={`${router.pathname === '/' ? 'text-white' : 'hover:text-white'} flex items-center gap-4 text-gray-300`} href='/'>
					<FontAwesomeIcon icon={faHome} height={20} width={20} />
					<span>Home</span>
				</Link>
				<Link className={`${router.pathname === '/top/artists' ? 'text-white' : 'hover:text-white'} flex items-center gap-4 text-gray-300`} href='/top/artists'>
					<FontAwesomeIcon icon={faChartLine} height={20} width={20} />

					<span>Top Artists</span>
				</Link>
				<Link className={`${router.pathname === '/top/tracks' ? 'text-white' : 'hover:text-white'} flex items-center gap-4 text-gray-300`} href='/top/tracks'>
					<FontAwesomeIcon icon={faChartLine} height={20} width={20} />
					<span>Top Tracks</span>
				</Link>
			</div>
			<div className='h-0.5 w-full rounded-full bg-gray-500' />
			<div className='mx-2 flex flex-col gap-4'>
				<button disabled onClick={() => null} className='flex cursor-not-allowed items-center gap-2 text-gray-300'>
					<FontAwesomeIcon icon={faPlus} height={20} width={20} />
					<span>Playlist erstellen</span>
				</button>
				<Link href='/collection/tracks' className={`${router.pathname === '/collection/tracks' ? 'text-white' : 'hover:text-white'} flex items-center gap-2 text-gray-300`}>
					<FontAwesomeIcon icon={faHeart} height={20} width={20} />
					<span>Lieblingssongs</span>
				</Link>
				<button disabled onClick={() => null} className='flex cursor-not-allowed items-center gap-2 text-gray-300'>
					<FontAwesomeIcon icon={faBookmark} height={20} width={20} />
					<span>Deine Folgen</span>
				</button>
			</div>
			<div className='h-0.5 w-full rounded-full bg-gray-500' />
			<div className='flex flex-col gap-1'>
				{playlists.data?.items &&
					playlists.data.items.map((playlist, index) => (
						<Link
							className={`${router.asPath === `/playlist/${playlist.id}` ? 'text-white' : 'hover:text-white'} text-gray-300`}
							key={playlist.id + index}
							href={`/playlist/${playlist.id}`}
						>
							{playlist.name}
						</Link>
					))}
			</div>
		</nav>
	);
}
