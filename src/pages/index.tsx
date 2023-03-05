import { SkeletonObject } from '@components/SkeletonObject';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function Home() {
	const recentTracks = trpc.recentlyPlayed.useQuery();

	return (
		<div className='grid gap-4 py-4'>
			<h1>Spotify Stats</h1>
			<div className='grid gap-1'>
				<h2>Recently Played</h2>
				<div>
					{recentTracks.data ? (
						recentTracks.data.items.map((item, index) => (
							<div
								className='flex items-center justify-between gap-2 rounded-[4px] px-4 py-2 hover:bg-black hover:bg-opacity-10 hover:dark:bg-white hover:dark:bg-opacity-10'
								key={item.track.id + index}
							>
								<div className='flex items-center gap-4'>
									<a href={item.track.external_urls.spotify} target='_blank' rel='noreferrer'>
										<Image className='aspect-square max-w-none rounded-sm' src={item.track.album.images[0].url} height={50} width={50} alt='Album Cover' />
									</a>
									<div>
										<h3>{item.track.name}</h3>
										<div className='flex flex-wrap items-center gap-1'>
											{item.track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}

											{item.track.artists.map((artist, index) => (
												<div key={artist.id + index}>
													<a className='text-sm hover:underline dark:text-gray-300' href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
														{artist.name}
													</a>
													{index < item.track.artists.length - 1 && ','}
												</div>
											))}
										</div>
									</div>
								</div>
								<span className='sm:mr-2'>{msToString(item.track.duration_ms)}</span>
							</div>
						))
					) : (
						<>
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
							<SkeletonObject type='track' />
						</>
					)}
				</div>
			</div>
		</div>
	);
}
