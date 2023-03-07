import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function User() {
	const router = useRouter();
	const profile = trpc.profile.useQuery({ userId: router.query['id']?.[0] as string });

	if (!profile.data)
		return (
			<div className='mt-8 grid gap-4 md:py-4'>
				<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
					<div className='skeleton relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'></div>
					<div className='grid gap-2 md:gap-4'>
						<span className='skeleton uppercase'>Profil</span>
						<h1 className='skeleton text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>LoremA iAsum.</h1>
						<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
							<span className='skeleton'>0 Follower*innen</span>
						</div>
					</div>
				</div>
			</div>
		);

	return (
		<div className='mt-8 grid gap-4 md:py-4'>
			<div className='flex items-center gap-4 md:gap-6 lg:gap-8'>
				<div className='relative h-32 w-32 md:h-44 md:w-44 lg:h-60 lg:w-60'>
					<Image
						src={profile.data.images?.[0]?.url as string}
						alt={`Profile Picture from ${profile.data.display_name}`}
						fill
						sizes='8rem 11rem 15rem'
						className='rounded-full object-cover'
					/>
				</div>
				<div className='grid gap-2 md:gap-4'>
					<span className='uppercase'>{profile.data.type}</span>
					<h1 className='text-2xl sm:text-4xl md:text-4xl lg:text-6xl'>{profile.data.display_name}</h1>
					<div className='flex gap-1.5 text-xs sm:text-sm md:text-base'>
						<span>{new Intl.NumberFormat('de-DE').format(profile.data.followers?.total ?? 0)} Follower*innen</span>
					</div>
				</div>
			</div>
		</div>
	);
}
