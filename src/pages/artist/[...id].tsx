import { SkeletonObjectDynamic } from '@components/SkeletonObject';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { ALBUM_GROUPS } from 'src/server/routers/_app';
import { z } from 'zod';

export default function Artist() {
	const router = useRouter();
	const [includedGroups, setIncludedGroups] = useState<z.infer<typeof ALBUM_GROUPS>[]>(['album', 'single']);
	const { data } = trpc.artist.useQuery({ artistId: router.query['id']?.[0] as string });
	const { data: dataAlbums } = trpc.artistAlbums.useQuery({ artistId: router.query['id']?.[0] as string, includeGroups: includedGroups });
	const { data: dataAlbumsAppearsOn } = trpc.artistAlbums.useQuery({ artistId: router.query['id']?.[0] as string, includeGroups: ['appears_on'] });

	function getGridClassByIndex(index: number): string | null {
		const gridSizes = ['grid', 'grid', 'grid', 'grid md:hidden lg:grid', 'grid md:hidden xl:grid', 'grid md:hidden 2xl:grid', 'grid md:hidden 3xl:grid', 'grid md:hidden 4xl:grid'];

		return index < gridSizes.length ? gridSizes[index] : 'grid md:hidden';
	}

	if (!data || !dataAlbums || !dataAlbumsAppearsOn)
		return (
			<div className='mt-8 grid gap-4 md:py-4'>
				<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
					<div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
					<div className='grid gap-2 md:gap-4'>
						<span className='skeleton'>Album</span>
						<h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum.</h1>
						<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
							<span className='skeleton'>Lorem ipsum dolor sit.</span>
						</div>
					</div>
				</div>
				<div className='grid gap-2'>
					<div className='flex'>
						<h2 className='skeleton'>Lorem, ipsum.</h2>
					</div>
					<div>
						<SkeletonObjectDynamic count={5} type='album' ranking />
					</div>
				</div>
				<div className='grid gap-4'>
					<div className='flex'>
						<h2 className='skeleton'>Lorem, ipsum.</h2>
					</div>
					<div className='flex flex-wrap gap-2'>
						<button className='skeleton secondary-button' disabled>
							Beliebte Veröffentlichungen
						</button>
						<button className='skeleton secondary-button' disabled>
							Alben
						</button>
						<button className='skeleton secondary-button' disabled>
							Singles und EPs
						</button>
					</div>
					<div className='flex gap-4 overflow-x-auto'>
						<SkeletonObjectDynamic count={8} type='albumCard' />
					</div>
				</div>
				<div className='grid gap-2'>
					<div className='flex'>
						<h2 className='skeleton'>Lorem, ipsum.</h2>
					</div>
					<div className='flex gap-4 overflow-x-auto'>
						<SkeletonObjectDynamic count={8} type='albumCard' />
					</div>
				</div>
				<div className='grid gap-2'>
					<div className='flex'>
						<h2 className='skeleton'>Lorem, ipsum.</h2>
					</div>
					<div className='flex gap-4 overflow-x-auto'>
						<SkeletonObjectDynamic count={8} type='albumCard' />
					</div>
				</div>
			</div>
		);

	const { artist, topTracks, relatedArtists } = data;

	return (
		<div className='mt-8 grid gap-4 md:py-4'>
			<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
				<div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60 aspect-square'>
					<Image src={artist.images?.[0]?.url} alt={`Album Cover from ${artist.name}`} fill sizes='8rem 11rem 15rem' className='rounded-full object-cover aspect-square' />
				</div>
				<div className='grid gap-2 md:gap-4'>
					<span>Künster*in</span>
					<h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl overflow-hidden text-ellipsis whitespace-nowrap'>{artist.name}</h1>
					<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
						<span>{new Intl.NumberFormat('de-DE').format(artist.followers.total)} Follower*innen</span>
					</div>
				</div>
			</div>
			<div className='grid gap-2'>
				<h2>Beliebt</h2>
				<div>
					{topTracks.tracks.slice(0, 5).map((track, index) => (
						<div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={track.id}>
							<span className='flex w-5 justify-center'>{index + 1}</span>
							<div className='flex items-center gap-4'>
								<Image className='aspect-square max-w-none rounded-sm' src={track.album.images?.[0]?.url} height={50} width={50} alt='Album Cover' />
								<div>
									<Link className='hover:underline' href={`/track/${track.id}`}>
										<h3>{track.name}</h3>
									</Link>
									<div className='flex flex-wrap items-center gap-x-1'>
										{track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
									</div>
								</div>
							</div>
							<span className='flex justify-end sm:mr-2'>{msToString(track.duration_ms)}</span>
						</div>
					))}
				</div>
			</div>
			{!!dataAlbums.items.length && <div className='grid gap-4'>
				<h2>Diskografie</h2>
				<div className='flex flex-wrap gap-2'>
					<button
						className={`${includedGroups.includes('album') && includedGroups.includes('single') ? 'primary-button' : 'secondary-button'}`}
						onClick={() => setIncludedGroups(['album', 'single'])}
					>
						Beliebte Veröffentlichungen
					</button>
					<button
						className={`${includedGroups.length === 1 && includedGroups[0] === 'album' ? 'primary-button' : 'secondary-button'}`}
						onClick={() => setIncludedGroups(['album'])}
					>
						Alben
					</button>
					<button
						className={`${includedGroups.length === 1 && includedGroups[0] === 'single' ? 'primary-button' : 'secondary-button'}`}
						onClick={() => setIncludedGroups(['single'])}
					>
						Singles und EPs
					</button>
				</div>
				<div className='flex gap-4 overflow-x-auto'>
					{dataAlbums.items
						.sort((a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime())
						.map((album, index) => (
							<Link
								href={`/album/${album.id}`}
								key={album.id + index}
								className={`${getGridClassByIndex(index)} max-w-[calc(150px+2rem)] gap-2 rounded-md bg-black p-4 hover:bg-white hover:bg-opacity-10`}
							>
								<div className='w-[150px] h-[150px]'>
									<Image src={album.images[0].url} width={150} height={150} alt={`Album Cover from ${album.name}`} className='aspect-square' />
								</div>
								<h3 className='overflow-hidden text-ellipsis whitespace-nowrap'>{album.name}</h3>
								<div className='flex gap-1.5'>
									<span>{new Date(album.release_date).getFullYear()}</span>
									<span className="capitalize before:mr-1.5 before:content-['•']">{album.album_type}</span>
								</div>
							</Link>
						))}
				</div>
			</div>}
			{!!relatedArtists.artists.length && <div className='grid gap-2'>
				<h2>Was anderen Fans gefällt</h2>
				<div className='flex gap-4 overflow-x-auto'>
					{relatedArtists.artists.slice(0, 8).map((artist, index) => (
						<Link
							href={`/artist/${artist.id}`}
							key={artist.id + index}
							className={`${getGridClassByIndex(index)} max-w-[calc(150px+2rem)] gap-2 rounded-md bg-black p-4 hover:bg-white hover:bg-opacity-10`}
						>
							<div className='h-[150px] w-[150px]'>
								{artist.images[0]?.url ? (
									<Image src={artist.images[0].url} width={150} height={150} alt={`Album Cover from ${artist.name}`} className='aspect-square rounded-full' />
								) : (
									<div className='flex h-[150px] w-[150px] items-center justify-center rounded-full bg-gray-500'>
										<FontAwesomeIcon icon={faUser} height={100} width={100} />
									</div>
								)}
							</div>
							<h3 className='overflow-hidden text-ellipsis whitespace-nowrap'>{artist.name}</h3>
							<div className='flex gap-1.5'>
								<span>Künstler*in</span>
							</div>
						</Link>
					))}
				</div>
			</div>}
			{!!dataAlbumsAppearsOn.items.length && <div className='grid gap-2'>
				<h2>Enthalten in</h2>
				<div className='flex gap-4 overflow-x-auto'>
					{dataAlbumsAppearsOn.items.slice(0, 8).map((album, index) => (
						<Link
							href={`/album/${album.id}`}
							key={album.id + index}
							className={`${getGridClassByIndex(index)} max-w-[calc(150px+2rem)] gap-2 rounded-md bg-black p-4 hover:bg-white hover:bg-opacity-10`}
						>
							<div className='w-[150px] h-[150px]'>
								<Image src={album.images[0].url} width={150} height={150} alt={`Album Cover from ${album.name}`} className='aspect-square' />
							</div>
							<h3 className='overflow-hidden text-ellipsis whitespace-nowrap'>{album.name}</h3>
							<div className='flex gap-1.5'>
								<span>{new Date(album.release_date).getFullYear()}</span>
								<span className="capitalize before:mr-1.5 before:content-['•']">{album.album_type}</span>
							</div>
						</Link>
					))}
				</div>
			</div>}
		</div>
	);
}
