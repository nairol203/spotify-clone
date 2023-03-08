import { SkeletonObjectDynamic } from '@components/SkeletonObject';
import { calcTime,msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
	const recentTracks = trpc.recentlyPlayed.useQuery();

	return (
		<div className='grid gap-4 py-4'>
			<h1>Zuletzt gehört</h1>
			<div>
				<div className='grid grid-cols-[6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400 lg:grid-cols-[7fr_2fr_1fr]'>
					<span>Titel</span>
					<span className='hidden lg:block'>Zuletzt gehört am</span>
					<span className='flex justify-end'>Dauer</span>
				</div>
				<div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
				<div>
					{recentTracks.data ? recentTracks.data.items.map((item, index) => (
						<div className='grid grid-cols-[6fr_1fr] lg:grid-cols-[7fr_2fr_1fr] items-center justify-between gap-2 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={item.track.id + index}>
							<div className='flex items-center gap-4'>
								<Image className='aspect-square max-w-none rounded-sm' src={item.track.album.images[0].url} height={50} width={50} alt='Album Cover' />
								<div>
									<Link href={`/track/${item.track.id}`} className='hover:underline'>
										<h3>{item.track.name}</h3>
									</Link>
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
							<span className='hidden lg:block'>
								{new Date().getTime() - new Date(item.played_at).getTime() > 86400000
									? new Date(item.played_at).toLocaleDateString('de-DE', { day: '2-digit', month: 'short', year: 'numeric' })
									: calcTime(new Date(item.played_at))}
							</span>
							<span className='flex justify-end sm:mr-2'>{msToString(item.track.duration_ms)}</span>
						</div>
						))
					: <SkeletonObjectDynamic count={25} type='trackRecently' />}
				</div>
			</div>
		</div>
	);
}
