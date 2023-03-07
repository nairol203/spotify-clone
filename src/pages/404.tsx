import Link from 'next/link';

export default function NotFound() {
    return (
        <div className='inline-flex flex-col gap-4 py-4 mt-10 min-h-screen items-center w-full'>
            <h1>Seite nicht gefunden</h1>
            <Link className='primary-button' href='/'>Zurück zur Hompage</Link>
        </div>
    );
}
