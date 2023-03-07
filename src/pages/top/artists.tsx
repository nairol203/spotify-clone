import { SkeletonObjectDynamic } from '@components/SkeletonObject';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topArtists.useQuery({ range });

	return (
		<div className='grid gap-4 py-4'>
			<h1>Top Artists</h1>
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
					topTracks.data.items.map((artist, index) => (
						<div className='flex items-center gap-4 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={artist.id}>
							<div className='flex w-5 justify-center'>{index + 1}</div>
							<Image className='rounded-sms aspect-square max-w-none' src={artist.images[0].url} height={50} width={50} alt='Album Cover' />
							<Link className='hover:underline' href={`/artist/${artist.id}`}>
								<h3>{artist.name}</h3>
							</Link>
						</div>
					))
				) : (
					<SkeletonObjectDynamic count={15} type='track' ranking />
				)}
			</div>
		</div>
	);
}
