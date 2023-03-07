import { SkeletonObject } from '@components/SkeletonObject';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Artist() {
    const router = useRouter();
    const artist = trpc.artist.useQuery({ artistId: router.query['id']?.[0] as string });

    if (!artist.data)
        return (
            <div className='mt-8 grid gap-4 md:py-4'>
                <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                    <div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
                    <div className='grid gap-2 md:gap-4'>
                        <span className='skeleton uppercase'>Album</span>
                        <h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum.</h1>
                        <div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
                            <span className='skeleton'>Lorem ipsum dolor sit.</span>
                        </div>
                    </div>
                </div>
            </div>
        );

    return (
        <div className='mt-8 grid gap-4 md:py-4'>
            <div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
                <div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'>
                    <Image src={artist.data.images?.[0]?.url} alt={`Album Cover from ${artist.data.name}`} fill sizes='8rem 11rem 15rem' className='object-cover rounded-full' />
                </div>
                <div className='grid gap-2 md:gap-4'>
                    <span className='uppercase'>{artist.data.type}</span>
                    <h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>{artist.data.name}</h1>
                    <div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
                        <span>{new Intl.NumberFormat('de-DE').format(artist.data.followers.total)} Follower*innen</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
