import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function Playlist() {
	const { data: session } = useSession();
	const router = useRouter();
	// @ts-expect-error
	const playlist = trpc.playlist.useQuery({ access_token: session?.user?.access_token, playlist_id: router.query['id']?.[0] });

	if (!playlist.data) return <div></div>;

	return (
		<div className='mt-8 grid gap-4 md:py-4'>
			<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
				<div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'>
					<Image src={playlist.data.images[0]?.url} alt='Playlist Cover' fill sizes='8rem 11rem 15rem' className='object-contain' />
				</div>
				<div className='grid gap-2 md:gap-4'>
					<h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>{playlist.data.name}</h1>
					<span>{playlist.data.description}</span>
				</div>
			</div>
			<div>
				{playlist.data.tracks.items.map(
					(track, index) =>
						track.track && (
							<div className='flex  items-center justify-between gap-2 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={track?.track?.id}>
								<div className='flex items-center gap-4'>
									<span className={`flex w-5 justify-center`}>{index + 1}</span>
									<a href={track?.track?.external_urls.spotify} target='_blank' rel='noreferrer'>
										<Image className='aspect-square max-w-none rounded-sm' src={track?.track?.album.images?.[0].url} height={50} width={50} alt='Album Cover' />
									</a>
									<div>
										<h3>{track?.track?.name}</h3>
										<div className='flex flex-wrap items-center gap-x-1'>
											{track?.track?.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
											{track?.track?.artists.map((artist, index) => (
												<div className='text-gray-300' key={artist.id + index}>
													<a className='text-sm hover:underline' href={artist.external_urls.spotify} target='_blank' rel='noreferrer' key={artist.id}>
														{artist.name}
													</a>
													{index < (track?.track?.artists.length ?? 0) - 1 && ','}
												</div>
											))}
										</div>
									</div>
								</div>
								<span className='sm:mr-2'>{msToString(track?.track?.duration_ms)}</span>
							</div>
						)
				)}
			</div>
		</div>
	);
}
