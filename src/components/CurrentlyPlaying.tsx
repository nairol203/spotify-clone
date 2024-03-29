import { faBackwardStep, faForwardStep, faPause, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';

export default function CurrentlyPlaying() {
	const currentlyPlaying = trpc.currentlyPlaying.useQuery(undefined, { refetchInterval: 1000 });
	const pause = trpc.pause.useMutation();
	const play = trpc.play.useMutation();
	const next = trpc.next.useMutation();
	const previous = trpc.previous.useMutation();

	const togglePlay = () => {
		if (currentlyPlaying.data?.is_playing) {
			pause.mutate();
		} else {
			play.mutate();
		}
	};

	if (currentlyPlaying.data?.currently_playing_type === 'track') {
		return (
			<div className='justify-between gap-4 sm:gap-0 sm:justify-start overflow-hidden text-ellipsis whitespace-nowrap relative flex h-full w-full items-center border-t-[1px] border-t-[#282828] bg-darkMode-card px-4 sm:grid sm:grid-cols-[1fr_1fr_1fr]'>
				<div className='flex gap-4 overflow-hidden text-ellipsis'>
					<div className='relative h-12 w-12 sm:h-16 sm:w-16'>
						<Image
							className='aspect-square max-w-none rounded-sm object-contain'
							src={
								// @ts-expect-error
								currentlyPlaying.data?.item?.album.images[0].url
							}
							alt='Album Cover'
							fill
							sizes='3rem 4rem'
						/>
					</div>
					<div className='flex flex-col justify-center overflow-hidden text-ellipsis'>
						<Link className='hover:underline overflow-hidden text-ellipsis' href={`/track/${currentlyPlaying.data.item?.id}`}>
							{currentlyPlaying.data?.item?.name}
						</Link>
						<div className='flex gap-1'>
							{
								// @ts-expect-error
								currentlyPlaying.data?.item.artists.map((artist, index) => (
									<div className='text-gray-300' key={artist.id + index}>
										<Link className='text-xs hover:underline' href={`/artist/${artist.id}`}>
											{artist.name}
										</Link>
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
				<div className='hidden flex-col justify-center gap-2 sm:flex'>
					<div className='flex justify-center gap-5'>
						<button onClick={() => null} disabled>
							<FontAwesomeIcon height={15} width={15} icon={faShuffle} className='text-gray-400 hover:text-white' />
						</button>
						<button title='Zurück' onClick={() => previous.mutate()}>
							<FontAwesomeIcon height={25} width={25} icon={faBackwardStep} className='text-gray-400 hover:text-white' />
						</button>
						<button title={currentlyPlaying.data.is_playing ? 'Pause' : 'Play'} onClick={togglePlay} className='rounded-full  bg-white p-1.5'>
							<FontAwesomeIcon height={25} width={25} icon={currentlyPlaying.data.is_playing ? faPause : faPlay} className=' text-black' />
						</button>
						<button title='Weiter' onClick={() => next.mutate()}>
							<FontAwesomeIcon height={25} width={25} icon={faForwardStep} className='text-gray-400 hover:text-white' />
						</button>
						<button onClick={() => null} disabled>
							<FontAwesomeIcon height={15} width={15} icon={faRepeat} className='text-gray-400 hover:text-white' />
						</button>
					</div>
					<div className='flex items-center gap-4'>
						<span className='text-xs'>{msToString(currentlyPlaying.data.progress_ms ?? 0)}</span>
						<div className='h-1 w-full rounded-full  bg-gray-600'>
							<div
								className='h-1 rounded-full  bg-white'
								style={{ width: `${((currentlyPlaying.data.progress_ms ?? 0) / (currentlyPlaying.data?.item?.duration_ms ?? 0)) * 100}%` }}
							/>
						</div>
						<span className='text-xs'>{msToString(currentlyPlaying.data?.item?.duration_ms ?? 0)}</span>
					</div>
				</div>
				<div className='hidden justify-end sm:flex'>
					{/* <button disabled>
                        <FontAwesomeIcon height={30} width={30} icon={faBars} />
                    </button> */}
				</div>
				<div className='sm:hidden'>
					<button title={currentlyPlaying.data.is_playing ? 'Pause' : 'Play'} onClick={togglePlay} >
						<FontAwesomeIcon height={25} width={25} icon={currentlyPlaying.data.is_playing ? faPause : faPlay} />
					</button>
				</div>
				<div className='absolute bottom-0 h-1 w-11/12 rounded-full  bg-gray-600 sm:hidden'>
					<div
						className='h-1 rounded-full  bg-white'
						style={{ width: `${((currentlyPlaying.data.progress_ms ?? 0) / (currentlyPlaying.data?.item?.duration_ms ?? 0)) * 100}%` }}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className='relative flex h-full w-full items-center border-t-[1px] border-t-[#282828] bg-darkMode-card px-4 sm:grid sm:grid-cols-[1fr_1fr_1fr]'>
			<div className='flex gap-4'>
				<div className='relative h-12 w-12 sm:h-16 sm:w-16'></div>
				<div className='flex flex-col justify-center'>
					<a className='hover:underline' href='#' target='_blank' rel='noreferrer'></a>
					<div className='flex gap-1'></div>
				</div>
			</div>
			<div className='hidden flex-col justify-center gap-3 sm:flex'>
				<div className='flex justify-center gap-5'>
					<button disabled>
						<FontAwesomeIcon height={15} width={15} icon={faShuffle} className='text-gray-400' />
					</button>
					<button disabled>
						<FontAwesomeIcon height={25} width={25} icon={faBackwardStep} className='text-gray-400' />
					</button>
					<button disabled className='rounded-full bg-white p-1.5'>
						<FontAwesomeIcon height={25} width={25} icon={faPlay} className=' text-black' />
					</button>
					<button disabled>
						<FontAwesomeIcon height={25} width={25} icon={faForwardStep} className='text-gray-400' />
					</button>
					<button disabled>
						<FontAwesomeIcon height={15} width={15} icon={faRepeat} className='text-gray-400' />
					</button>
				</div>
				<div className='flex items-center gap-4'>
					<span className='text-xs'>{msToString(0)}</span>
					<div className='h-1 w-full rounded-full  bg-gray-600'>
						<div className='h-1 w-0 rounded-full  bg-white' />
					</div>
					<span className='text-xs'>{msToString(0)}</span>
				</div>
			</div>
			<div className='hidden justify-end sm:flex'>
				{/* <button disabled>
                    <FontAwesomeIcon height={30} width={30} icon={faBars} />
                </button> */}
			</div>
			<div className='absolute bottom-0 h-1 w-11/12 rounded-full  bg-gray-600 sm:hidden'>
				<div className='h-1 w-0 rounded-full  bg-white' />
			</div>
		</div>
	);
}
