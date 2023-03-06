import { faBackwardStep, faBars, faForwardStep, faPause, faPlay, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function CurrentlyPlaying() {
    // @ts-expect-error
    const currentlyPlaying = trpc.currentlyPlaying.useQuery({}, { refetchInterval: 1000 });

    if (currentlyPlaying.data?.currently_playing_type === 'track') {
        return (
            <div className='relative flex h-full w-full items-center justify-between border-t-[1px] border-t-[#bebebe] bg-card px-4 dark:border-t-[#282828] dark:bg-darkMode-card sm:grid sm:grid-cols-3'>
                <div className='flex gap-4'>
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
                    <div className='flex flex-col justify-center'>
                        <a className='hover:underline' href={currentlyPlaying.data?.item?.external_urls.spotify} target='_blank' rel='noreferrer'>
                            {currentlyPlaying.data?.item?.name}
                        </a>
                        <div className='flex gap-1'>
                            {
                                // @ts-expect-error
                                currentlyPlaying.data?.item.artists.map((artist, index) => (
                                    <div className='dark:text-gray-300' key={artist.id + index}>
                                        <a className='text-xs hover:underline' href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
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
                    <div className='flex justify-center gap-5'>
                        <button disabled>
                            <FontAwesomeIcon height={15} width={15} icon={faShuffle} className='text-gray-400' />
                        </button>
                        <button disabled>
                            <FontAwesomeIcon height={25} width={25} icon={faBackwardStep} className='text-gray-400' />
                        </button>
                        <button disabled className='rounded-full bg-black p-1.5 dark:bg-white'>
                            <FontAwesomeIcon height={25} width={25} icon={currentlyPlaying.data.is_playing ? faPause : faPlay} className='text-white dark:text-black' />
                        </button>
                        <button disabled>
                            <FontAwesomeIcon height={25} width={25} icon={faForwardStep} className='text-gray-400' />
                        </button>
                        <button disabled>
                            <FontAwesomeIcon height={15} width={15} icon={faRepeat} className='text-gray-400' />
                        </button>
                    </div>
                    <div className='flex items-center gap-4'>
                        <span className='text-xs'>{msToString(currentlyPlaying.data.progress_ms ?? 0)}</span>
                        <div className='h-1 w-52 rounded-full bg-white dark:bg-gray-600 md:w-96 lg:w-[30rem]'>
                            <div
                                className='h-1 rounded-full bg-black dark:bg-white'
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
                <div className='absolute bottom-0 h-1 w-11/12 rounded-full bg-white dark:bg-gray-600 sm:hidden'>
                    <div
                        className='h-1 rounded-full bg-black dark:bg-white'
                        style={{ width: `${((currentlyPlaying.data.progress_ms ?? 0) / (currentlyPlaying.data?.item?.duration_ms ?? 0)) * 100}%` }}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className='relative flex h-full w-full items-center justify-between border-t-[1px] border-t-[#bebebe] bg-card px-4 dark:border-t-[#282828] dark:bg-darkMode-card sm:grid sm:grid-cols-3'>
            <div className='flex gap-4'>
                <div className='relative h-12 w-12 sm:h-16 sm:w-16'></div>
                <div className='flex flex-col justify-center'>
                    <a className='hover:underline' href='#' target='_blank' rel='noreferrer'></a>
                    <div className='flex gap-1'></div>
                </div>
            </div>
            <div className='hidden justify-center gap-3 sm:grid'>
                <div className='flex justify-center gap-5'>
                    <button disabled>
                        <FontAwesomeIcon height={15} width={15} icon={faShuffle} className='text-gray-400' />
                    </button>
                    <button disabled>
                        <FontAwesomeIcon height={25} width={25} icon={faBackwardStep} className='text-gray-400' />
                    </button>
                    <button disabled className='rounded-full bg-black p-1.5 dark:bg-white'>
                        <FontAwesomeIcon height={25} width={25} icon={faPlay} className='text-white dark:text-black' />
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
                    <div className='h-1 w-52 rounded-full bg-white dark:bg-gray-600 md:w-96 lg:w-[30rem]'>
                        <div className='h-1 w-0 rounded-full bg-black dark:bg-white' />
                    </div>
                    <span className='text-xs'>{msToString(0)}</span>
                </div>
            </div>
            <div className='hidden justify-end sm:flex'>
                {/* <button disabled>
                    <FontAwesomeIcon height={30} width={30} icon={faBars} />
                </button> */}
            </div>
            <div className='absolute bottom-0 h-1 w-11/12 rounded-full bg-white dark:bg-gray-600 sm:hidden'>
                <div className='h-1 w-0 rounded-full bg-black dark:bg-white' />
            </div>
        </div>
    );
}
