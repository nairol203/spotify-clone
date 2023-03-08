import { SkeletonObjectDynamic } from '@components/SkeletonObject';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';
import { msToString } from '../../lib/helpers';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topTracks.useQuery({ range });
	
	return (
		<div className='grid gap-4 py-4'>
			<h1>Top Tracks</h1>
			<div className='flex justify-center gap-10 sm:justify-start sm:gap-6'>
				<button className={`${range === 'short_term' ? 'underline' : 'opacity-80'} decoration-1 underline-offset-8 hover:underline`} onClick={() => setRange('short_term')}>
					4 Weeks
				</button>
				<button
					className={`${range === 'medium_term' ? 'underline' : 'opacity-80'} decoration-1 underline-offset-8 hover:underline`}
					onClick={() => setRange('medium_term')}
				>
					6 Months
				</button>
				<button className={`${range === 'long_term' ? 'underline' : 'opacity-80'} decoration-1 underline-offset-8 hover:underline`} onClick={() => setRange('long_term')}>
					All time
				</button>
			</div>
			<div>
				<div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400'>
					<span className='flex justify-center'>#</span>
					<span>Titel</span>
					<span className='flex justify-end'>Dauer</span>
				</div>
				<div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
				<div>
					{(topTracks.data ? topTracks.data.items.map((track, index) => (
						<div className='flex  items-center justify-between gap-2 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={track.id + index}>
							<div className='flex items-center gap-4' key={track.id}>
								<span className='flex w-5 justify-center'>{index + 1}</span>
								<Image className='aspect-square max-w-none rounded-sm' src={track.album.images[0].url} height={50} width={50} alt='Album Cover' />
								<div>
									<Link href={`/track/${track.id}`} className='hover:underline'>
										<h3>{track.name}</h3>
									</Link>
									<div className='flex flex-wrap items-center gap-x-1'>
										{track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
										{track.artists.map((artist, index) => (
											<div className='text-gray-300' key={artist.id + index}>
												<Link className='text-sm hover:underline' href={`/artist/${artist.id}`} key={artist.id}>
													{artist.name}
												</Link>
												{index < track.artists.length - 1 && ','}
											</div>
										))}
									</div>
								</div>
							</div>
							<span className='sm:mr-2'>{msToString(track.duration_ms)}</span>
						</div>
					)) : <SkeletonObjectDynamic count={25} type='track' ranking />)}
				</div>
			</div>
		</div>
	);
}
