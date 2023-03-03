import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useState } from 'react';
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
            <div className='grid gap-4'>
                {topTracks.data &&
                    topTracks.data.items.map((item, index) => (
                        <div className='flex justify-between gap-2 items-center' key={item.id + index}>
                            <div className='flex items-center gap-4' key={item.id}>
                                <div className='flex w-5 justify-center'>{index + 1}</div>
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
                            <span>{msToString(item.duration_ms)}</span>
                        </div>
                    ))}
            </div>
        </div>
    );
}
