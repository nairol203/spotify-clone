import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function Home() {
    const topTracks = trpc.recentlyPlayed.useQuery();

    return (
        <div className='grid gap-4 py-4'>
            <h1>Spotify Stats</h1>
            <CurrentlyPlaying />
            <h2>Recently Played</h2>
            <div className='grid gap-4'>
                {topTracks.data &&
                    topTracks.data.items.map((item) => (
                        <div className='flex justify-between gap-2 items-center'>
                            <div className='flex items-center gap-4' key={item.track.id}>
                                <a href={item.track.external_urls.spotify} target='_blank' rel='noreferrer'>
                                    <Image className='aspect-square rounded-sm' src={item.track.album.images[0].url} height={50} width={50} alt='Album Cover' />
                                </a>
                                <div>
                                    <h3>{item.track.name}</h3>
                                    <div className='flex flex-wrap gap-1 items-center'>
                                        {item.track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}

                                        {item.track.artists.map((artist, index) => (
                                            <div>
                                                <a
                                                    className='text-sm hover:underline dark:text-gray-300'
                                                    href={artist.external_urls.spotify}
                                                    target='_blank'
                                                    rel='noreferrer'
                                                    key={artist.id}
                                                >
                                                    {artist.name}
                                                </a>
                                                {index < item.track.artists.length - 1 && ','}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <span>{msToString(item.track.duration_ms)}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}

function CurrentlyPlaying() {
    const currentlyPlaying = trpc.currentlyPlaying.useQuery();

    if (!currentlyPlaying.data || !currentlyPlaying.data.is_playing || currentlyPlaying.data.currently_playing_type !== 'track') return <></>;

    return (
        <div className='grid gap-4'>
            <h2>Currently Playing</h2>
            <div className='flex justify-between gap-2 items-center'>
                <div className='flex items-center gap-4'>
                    <a href={currentlyPlaying.data.item?.external_urls.spotify} target='_blank' rel='noreferrer'>
                        <Image
                            className='aspect-square rounded-sm'
                            src={
                                // @ts-expect-error
                                currentlyPlaying.data?.item?.album.images[0].url
                            }
                            height={50}
                            width={50}
                            alt='Album Cover'
                        />
                    </a>
                    <div>
                        <h3>{currentlyPlaying.data?.item?.name}</h3>
                        <div className='flex flex-wrap gap-1 items-center'>
                            {currentlyPlaying.data?.item?.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
                            {
                                // @ts-expect-error
                                currentlyPlaying.data?.item?.artists.map((artist, index) => (
                                    <div>
                                        <a
                                            className='text-sm hover:underline dark:text-gray-300'
                                            href={artist.external_urls.spotify}
                                            target='_blank'
                                            rel='noreferrer'
                                            key={artist.id}
                                        >
                                            {artist.name}
                                        </a>
                                        {
                                            // @ts-expect-error
                                            index < currentlyPlaying.data?.item?.artists?.length - 1 && ','
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <span>{msToString(currentlyPlaying.data?.item?.duration_ms as number)}</span>
            </div>
        </div>
    );
}
