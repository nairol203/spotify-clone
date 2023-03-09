import Image from 'next/image';
import logo from '@public/logo.png';

export default function Footer() {
	return (
		<footer className='flex flex-wrap items-center justify-center gap-4 p-2'>
			<Image src={logo} alt='Logo' width={25} height={25} />
			<a href='https://nairol.me' target='_blank' rel='noreferrer' className='text-sm text-gray-400 hover:underline'>
				© 2023 nairol203
			</a>
		</footer>
	);
}
