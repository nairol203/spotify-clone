import { SkeletonObjectDynamic } from '@components/SkeletonObject';
import { msToString } from '@lib/helpers';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Album() {
    const router = useRouter();
    const album = trpc.album.useQuery({ albumId: router.query['id']?.[0] as string });

    if (!album.data)
        return (
            <div className='mt-8 grid gap-4 md:py-4'>
                <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                    <div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
                    <div className='grid gap-2 md:gap-4'>
                        <span className='skeleton uppercase'>Album</span>
                        <h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum.</h1>
                        <div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
                            <span className='skeleton'>Lorem, ipsum dolor.</span>
                            <span className='skeleton'>Lorem.</span>
                            <span className='skeleton'>Lorem.</span>
                        </div>
                    </div>
                </div>
                <div>
                    <div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400'>
                        <span>#</span>
                        <span>Titel</span>
                        <span className='flex justify-end'>Dauer</span>
                    </div>
                    <div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
                    <SkeletonObjectDynamic count={15} type='track' ranking />
                </div>
            </div>
        );

    return (
        <div className='mt-8 grid gap-4 md:py-4'>
            <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                <div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'>
                    <Image src={album.data.images?.[0]?.url} alt={`Album Cover from ${album.data.name}`} fill sizes='8rem 11rem 15rem' className='object-cover' />
                </div>
                <div className='grid gap-2 md:gap-4'>
                    <span className='uppercase'>{album.data.album_type}</span>
                    <h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>{album.data.name}</h1>
                    <div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
                        <div className='flex gap-1'>
                            {album.data.artists.map((artist, index) => (
                                <Link href={`/artist/${artist.id}`} className={`${index !== 0 && "before:mr-1.5 before:content-['•']"} hover:underline`} key={artist.id + index}>
                                    {artist.name}
                                </Link>
                            ))}
                        </div>
                        <span className="before:mr-1.5 before:content-['•']">{new Date(album.data.release_date).getFullYear()}</span>
                        <span className="before:mr-1.5 before:content-['•']">{new Intl.NumberFormat('de-DE').format(album.data.tracks.total)} Songs</span>
                    </div>
                </div>
            </div>
            <div>
                <div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 px-4 py-2 text-gray-400'>
                    <span className='flex justify-center'>#</span>
                    <span>Titel</span>
                    <span className='flex justify-end'>Dauer</span>
                </div>
                <div className='mb-4 h-0.5 w-full rounded-full bg-gray-400 bg-opacity-10' />
                {album.data.tracks.items.map((track, index) => (
                    <div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10' key={track.id}>
                        <span className='flex w-5 justify-center'>{index + 1}</span>
                        <div className='flex items-center gap-4'>
                            <a href={track.external_urls.spotify} target='_blank' rel='noreferrer'>
                                <Image className='aspect-square max-w-none rounded-sm' src={album.data.images?.[0]?.url} height={50} width={50} alt='Album Cover' />
                            </a>
                            <div>
                                <h3>{track.name}</h3>
                                <div className='flex flex-wrap items-center gap-x-1'>
                                    {track.explicit && <span className='rounded-sm bg-slate-300 py-[1px] px-[5.5px] text-[10px] text-black'>E</span>}
                                    {track.artists.map((artist, index) => (
                                        <div className='text-gray-300' key={artist.id + index}>
                                            <Link className='text-sm hover:underline' href={`/artist/${artist.id}`} key={artist.id}>
                                                {artist.name}
                                            </Link>
                                            {index < (track?.artists.length ?? 0) - 1 && ','}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <span className='flex justify-end sm:mr-2'>{msToString(track.duration_ms)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
