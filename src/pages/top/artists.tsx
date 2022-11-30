import { Placeholder, StyledSong, StyledTopPage } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function Home() {
	const topTracks = trpc.topArtists.useQuery({ range: 'short_term' });

	if (!topTracks.data)
		return (
			<StyledTopPage>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</StyledTopPage>
		);
	if (topTracks.error)
		return (
			<StyledTopPage>
				<h1>Error!</h1>
				<Placeholder height='90vh' />
			</StyledTopPage>
		);
	return (
		<StyledTopPage>
			<h1>Top Artists</h1>
			<div className='selector'>
				<a>
					<h2>4 Weeks</h2>
				</a>
				<a style={{ color: 'gray' }}>
					<h2>6 Months</h2>
				</a>
				<a style={{ color: 'gray' }}>
					<h2>All time</h2>
				</a>
			</div>
			<div className='songs'>
				{topTracks.data.items.map((item, index) => (
					<StyledSong key={item.id}>
						<div className='index'>{index + 1}</div>
						<Image src={item.images[0].url} height={65} width={65} alt='Album Cover' />
						<div className='song'>
							<h2>{item.name}</h2>
						</div>
					</StyledSong>
				))}
			</div>
		</StyledTopPage>
	);
}