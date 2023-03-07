import { SkeletonObject } from '@components/SkeletonObject';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	const recentTracks = trpc.recentlyPlayed.useQuery();

	return (
		<div className='grid gap-4 py-4'>
			<h1>Recently Played</h1>
			<div>
				{recentTracks.data ? (
					recentTracks.data.items.map((item, index) => (
						<div className='flex items-center justify-between gap-2 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={item.track.id + index}>
							<div className='flex items-center gap-4'>
								<Image className='aspect-square max-w-none rounded-sm' src={item.track.album.images[0].url} height={50} width={50} alt='Album Cover' />
								<div>
									<Link href={`/track/${item.track.id}`} className="hover:underline"><h3>{item.track.name}</h3></Link>
									<div className='flex flex-wrap items-center gap-1'>
										{item.track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}

										{item.track.artists.map((artist, index) => (
											<div className='text-gray-300' key={artist.id + index}>
												<Link className='text-sm hover:underline' href={`/artist/${artist.id}`}>
													{artist.name}
												</Link>
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
	);
}
