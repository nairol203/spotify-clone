import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Track() {
	const router = useRouter();
	const track = trpc.track.useQuery({ trackId: router.query['id']?.[0] as string });

	if (!track.data)
		return (
			<div className='mt-8 grid gap-4 md:py-4'>
				<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
					<div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
					<div className='grid gap-2 md:gap-4'>
						<span className='skeleton'>Album</span>
						<h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum.</h1>
						<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
							<span className='skeleton'>Lorem, ipsum dolor.</span>
							<span className='skeleton'>Lorem.</span>
							<span className='skeleton'>Lorem.</span>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className='mt-8 grid gap-4 md:py-4'>
			<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
				<div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60 aspect-square'>
					<Image
						src={track.data.album.images?.[0]?.url}
						alt={`Album Cover from ${track.data.name}`}
						fill
						sizes='8rem 11rem 15rem'
						className='rounded-full object-cover aspect-square'
					/>
				</div>
				<div className='grid gap-2 md:gap-4'>
					<span className='capitalize'>{track.data.type}</span>
					<h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl overflow-hidden text-ellipsis whitespace-nowrap'>{track.data.name}</h1>
					<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
						<div className='flex gap-1'>
							{track.data.album.artists.map((artist, index) => (
								<Link href={`/artist/${artist.id}`} className={`${index !== 0 && "before:mr-1.5 before:content-['•']"} hover:underline`} key={artist.id + index}>
									{artist.name}
								</Link>
							))}
						</div>
						<span className="before:mr-1.5 before:content-['•']">{new Date(track.data.album.release_date).getFullYear()}</span>
						<span className="before:mr-1.5 before:content-['•']">{msToString(track.data.duration_ms)}</span>
					</div>
				</div>
			</div>
		</div>
	);
}
