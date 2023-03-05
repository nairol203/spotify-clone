import { faBackwardStep, faForwardStep, faPause } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function CurrentlyPlaying() {
	// @ts-expect-error
	const currentlyPlaying = trpc.currentlyPlaying.useQuery({}, { refetchInterval: 1000 });

	if (currentlyPlaying.data && currentlyPlaying.data.is_playing && currentlyPlaying.data.currently_playing_type === 'track') {
		return (
			<div className='fixed bottom-0 z-10 flex h-24 w-full items-center justify-between bg-card px-4 dark:bg-darkMode-card sm:grid sm:h-24 sm:grid-cols-3'>
				<div className='flex gap-4'>
					<Image
						className='aspect-square max-w-none rounded-sm'
						src={
							// @ts-expect-error
							currentlyPlaying.data?.item?.album.images[0].url
						}
						height={60}
						width={60}
						alt='Album Cover'
					/>
					<div className='grid items-center'>
						<a
							className='hover:underline'
							href={
								// @ts-expect-error
								currentlyPlaying.data?.item.href
							}
							target='_blank'
							rel='noreferrer'
						>
							{currentlyPlaying.data?.item?.name}
						</a>
						<div className='flex items-center gap-1'>
							{
								// @ts-expect-error
								currentlyPlaying.data?.item.artists.map((artist, index) => (
									<div key={artist.id + index}>
										<a className='text-sm hover:underline dark:text-gray-300' href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
											{artist.name}
										</a>
										{
											// @ts-expect-error
											index < currentlyPlaying.data?.item.artists.length - 1 && ','
										}
									</div>
								))
							}
						</div>
					</div>
				</div>
				<div className='hidden justify-center gap-3 sm:grid'>
					<div className='flex justify-center'>
						<button onClick={() => null}>
							<FontAwesomeIcon height={40} width={40} icon={faBackwardStep} />
						</button>
						<button onClick={() => null}>
							<FontAwesomeIcon height={40} width={40} icon={faPause} />
						</button>
						<button onClick={() => null}>
							<FontAwesomeIcon height={40} width={40} icon={faForwardStep} />
						</button>
					</div>
					<div className='flex items-center gap-4'>
						<span>{msToString(currentlyPlaying.data.progress_ms ?? 0)}</span>
						<progress className='w-52 md:w-96' value={currentlyPlaying.data.progress_ms ?? 0} max={currentlyPlaying.data?.item?.duration_ms} />
						<span>{msToString(currentlyPlaying.data?.item?.duration_ms ?? 0)}</span>
					</div>
				</div>
				<div className='hidden justify-end sm:flex'>Volume?</div>
				<div className='sm:hidden'>
					<button onClick={() => null}>
						<FontAwesomeIcon height={60} width={60} icon={faPause} />
					</button>
				</div>
			</div>
		);
	}

	return <></>;
}
