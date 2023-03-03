import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function NavBar() {
    const router = useRouter();

    return (
        <nav className='fixed top-0 z-10 flex h-14 md:h-12 w-full items-center gap-8 bg-card px-4 shadow-sm dark:bg-darkMode-card'>
            <Link href='/'>
                <Image
                    src='/logo.png'
                    alt='Logo von Nairol Price Check'
                    width={30}
                    height={30}
                    className='md:hover:underline md:hover:underline-offset-4 md:hover:brightness-110'
                />
            </Link>
            <Link className={`${router.pathname === '/' ? 'underline' : 'hover:opacity-70'} decoration-1 underline-offset-8 hover:underline`} href='/'>Home</Link>
            <Link className={`${router.pathname === '/top/artists' ? 'underline' : 'hover:opacity-70'} decoration-1 underline-offset-8 hover:underline`} href='/top/artists'>Top Artists</Link>
            <Link className={`${router.pathname === '/top/tracks' ? 'underline' : 'hover:opacity-70'} decoration-1 underline-offset-8 hover:underline`} href='/top/tracks'>Top Tracks</Link>
        </nav>
    );
}
