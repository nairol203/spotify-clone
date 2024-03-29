import { faArrowUpRightFromSquare, faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function UserDropdown() {
	const { data: session } = useSession();
	const [active, setActive] = useState(false);

	if (!session || !session?.user.image) return <></>;

	return (
		<div className='fixed top-4 right-8 hidden gap-2 md:grid'>
			<div className='relative'>
				<button className='flex items-center gap-2 rounded-3xl bg-black p-1 hover:bg-white hover:bg-opacity-10' onClick={() => setActive(!active)}>
					<Image src={session?.user.image} height={25} width={25} alt='User Profile Picture' className='aspect-square rounded-full' />
					<span>{session.user.name}</span>
					<FontAwesomeIcon height={20} width={20} icon={active ? faCaretUp : faCaretDown} />
				</button>
				{active && (
					<div className='absolute top-10 right-0 flex w-44 flex-col rounded-sm bg-black p-1'>
						<a
							onClick={() => setActive(false)}
							className='flex items-center justify-between rounded-sm px-3 py-2 hover:bg-white hover:bg-opacity-10'
							href='https://www.spotify.com/us/account/overview'
							target='_blank'
							rel='noreferrer'
						>
							<span>Spotify Konto</span>
							<FontAwesomeIcon height={15} width={15} icon={faArrowUpRightFromSquare} />
						</a>
						<Link onClick={() => setActive(false)} className='rounded-sm px-3 py-2 hover:bg-white hover:bg-opacity-10' href={`/user/${session.user.id}`}>
							Profil
						</Link>
						<button disabled className='flex cursor-not-allowed rounded-sm px-3 py-2 hover:bg-white hover:bg-opacity-10'>
							Einstellungen
						</button>
						<div className='mx-auto my-0.5 h-[0.05rem] w-11/12 rounded-full bg-gray-500' />
						<button onClick={() => signOut()} className='flex rounded-sm px-3 py-2 hover:bg-white hover:bg-opacity-10'>
							Abmelden
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
