import { SkeletonObjectDetailedDynamic } from '@components/SkeletonObject';
import { calcTime, msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import NotFound from '../404';

export default function Playlist() {
	const router = useRouter();
	const playlist = trpc.playlist.useQuery({ playlistId: router.query['id']?.[0] as string });

	if (!playlist.data)
		return (
			<div className='mt-8 grid gap-4 md:py-4'>
				<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
					<div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
					<div className='grid gap-2 md:gap-4'>
						<span className='skeleton'>Öffentliche Playlist</span>
						<h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum dolor.</h1>
						<span className='skeleton text-sm text-gray-300'>Lorem iAsum dolor sit amet.</span>
						<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
							<span className="skeleton after:ml-1.5 after:content-['•']">Lorem, ipsum.</span>
							<span className="skeleton after:ml-1.5 after:content-['•']">Lorem, ipsum.</span>
							<span className='skeleton'>Lorem, ipsum.</span>
						</div>
					</div>
				</div>
				<div>
					<div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400 lg:grid-cols-[1.25rem_6fr_4fr_3fr_1fr]'>
						<span>#</span>
						<span>Titel</span>
						<span className='hidden lg:block'>Album</span>
						<span className='hidden lg:block'>Hinzugefügt am</span>
						<span className='flex justify-end'>Dauer</span>
					</div>
					<div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
					<SkeletonObjectDetailedDynamic count={15} type='track' ranking />
				</div>
			</div>
		);

	if (!playlist.data.name) return <NotFound />;

	return (
		<div className='mt-8 grid gap-4 md:py-4'>
			<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
				<div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60 aspect-square'>
					<Image src={playlist.data.images[0]?.url} alt='Playlist Cover' fill sizes='8rem 11rem 15rem' className='object-cover aspect-square' />
				</div>
				<div className='grid gap-2 md:gap-4'>
					<span>{playlist.data.public ? 'Öffentliche Playlist' : 'Private Playlist'}</span>
					<h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>{playlist.data.name}</h1>
					<span className='text-sm text-gray-300'>{playlist.data.description}</span>
					<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
						<Link href={`/user/${playlist.data.owner.id}`} className='hover:underline'>
							{playlist.data.owner.display_name}
						</Link>
						<span className="before:mr-1.5 before:content-['•']">{new Intl.NumberFormat('de-DE').format(playlist.data.followers?.total)} Likes</span>
						<span className="before:mr-1.5 before:content-['•']">{new Intl.NumberFormat('de-DE').format(playlist.data.tracks.total)} Songs</span>
					</div>
				</div>
			</div>
			<div>
				<div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400 lg:grid-cols-[1.25rem_6fr_4fr_3fr_1fr]'>
					<span className='flex justify-center'>#</span>
					<span>Titel</span>
					<span className='hidden lg:block'>Album</span>
					<span className='hidden lg:block'>Hinzugefügt am</span>
					<span className='flex justify-end'>Dauer</span>
				</div>
				<div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
				{playlist.data.tracks.items.map(
					(item, index) =>
						item.track && (
							<div
								className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10 lg:grid-cols-[1.25rem_6fr_4fr_3fr_1fr]'
								key={item.track.id}
							>
								<span className='flex w-5 justify-center'>{index + 1}</span>
								<div className='flex items-center gap-4 overflow-hidden text-ellipsis whitespace-nowrap'>
									<Image className='aspect-square max-w-none rounded-sm' src={item.track.album.images?.[0]?.url} height={50} width={50} alt='Album Cover' />
									<div className='overflow-hidden text-ellipsis'>
										<Link className='hover:underline overflow-hidden text-ellipsis' href={`/track/${item.track.id}`}>
											<h3 className='overflow-hidden text-ellipsis'>{item.track.name}</h3>
										</Link>
										<div className='flex flex-wrap items-center gap-x-1'>
											{item.track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
											{item.track.artists.map((artist, index) => (
												<div className='text-gray-300' key={artist.id + index}>
													<Link className='text-sm hover:underline' href={`/artist/${artist.id}`} key={artist.id}>
														{artist.name}
													</Link>
													{index < (item.track?.artists.length ?? 0) - 1 && ','}
												</div>
											))}
										</div>
									</div>
								</div>
								<div className='hidden lg:flex overflow-hidden text-ellipsis whitespace-nowrap'>
									<Link className=' hover:underline overflow-hidden text-ellipsis' href={`/album/${item.track.album.id}`}>
										{item.track.album.name}
									</Link>
								</div>
								<span className='hidden lg:block'>
									{new Date().getTime() - new Date(item.added_at).getTime() > 86400000
										? new Date(item.added_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
										: calcTime(new Date(item.added_at))}
								</span>
								<span className='flex justify-end sm:mr-2'>{msToString(item.track.duration_ms)}</span>
							</div>
						)
				)}
			</div>
		</div>
	);
}
