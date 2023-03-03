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
                    topTracks.data.items.map((item, index) => (
                        <div className='flex items-center justify-between gap-2' key={item.track.id + index}>
                            <div className='flex items-center gap-4'>
                                <a href={item.track.external_urls.spotify} target='_blank' rel='noreferrer'>
                                    <Image className='aspect-square rounded-sm' src={item.track.album.images[0].url} height={50} width={50} alt='Album Cover' />
                                </a>
                                <div>
                                    <h3>{item.track.name}</h3>
                                    <div className='flex flex-wrap items-center gap-1'>
                                        {item.track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}

                                        {item.track.artists.map((artist, index) => (
                                            <div key={artist.id + index}>
                                                <a className='text-sm hover:underline dark:text-gray-300' href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
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
            <div className='flex items-center justify-between gap-2'>
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
                        <div className='flex flex-wrap items-center gap-1'>
                            {currentlyPlaying.data?.item?.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
                            {
                                // @ts-expect-error
                                currentlyPlaying.data?.item?.artists.map((artist, index) => (
                                    <div key={artist.id + index}>
                                        <a className='text-sm hover:underline dark:text-gray-300' href={artist.external_urls.spotify} target='_blank' rel='noreferrer'>
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
