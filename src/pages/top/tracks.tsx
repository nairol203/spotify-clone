import { faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { trpc } from '@lib/trpc';
import useAudio from '@lib/useAudio';
import Image from 'next/image';
import React, { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';
import { SkeletonObject } from '..';
import { msToString } from '../../lib/helpers';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topTracks.useQuery({ range });
	const [active, setActive] = useState<string | null>(null);
	const { playing, toggle } = useAudio();

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
				{topTracks.data ? (
					topTracks.data.items.map((item, index) => (
						<div
							className='flex  items-center justify-between gap-2 rounded-[4px] px-4 py-2 hover:bg-black hover:bg-opacity-10 hover:dark:bg-white hover:dark:bg-opacity-10'
							key={item.id + index}
							onMouseEnter={() => setActive(item.id)}
							onMouseLeave={() => setActive(null)}
						>
							<div className='flex items-center gap-4' key={item.id}>
								<div className='relative flex items-center'>
									<span className={`${active === item.id && 'absolute hidden'} flex w-5 justify-center`}>{index + 1}</span>
									<button className={`${active !== item.id && 'absolute hidden'}`} onClick={() => toggle(item.preview_url)}>
										<FontAwesomeIcon icon={playing ? faPause : faPlay} width={20} height={20} />
									</button>
								</div>
								<a href={item.external_urls.spotify} target='_blank' rel='noreferrer'>
									<Image className='aspect-square rounded-sm' src={item.album.images[0].url} height={50} width={50} alt='Album Cover' />
								</a>
								<div>
									<h3>{item.name}</h3>
									<div className='flex flex-wrap items-center gap-1'>
										{item.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
										{item.artists.map((artist, index) => (
											<div key={artist.id + index}>
												<a
													className='text-sm hover:underline dark:text-gray-300'
													href={artist.external_urls.spotify}
													target='_blank'
													rel='noreferrer'
													key={artist.id}
												>
													{artist.name}
												</a>
												{index < item.artists.length - 1 && ','}
											</div>
										))}
									</div>
								</div>
							</div>
							<span className='sm:mr-2'>{msToString(item.duration_ms)}</span>
						</div>
					))
				) : (
					<>
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
						<SkeletonObject type='track' ranking />
					</>
				)}
			</div>
		</div>
	);
}
