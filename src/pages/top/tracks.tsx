import { StyledTopPage, StyledSong } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import styled from 'styled-components';

export default function Home() {
	const topTracks = trpc.topTracks.useQuery({ range: 'short_term' });

	if (!topTracks.data) return <div>Loading...</div>;
	if (topTracks.error) return <div>Error!</div>;

	return (
		<StyledTopPage>
			<h1>Top Tracks</h1>
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
						<Image src={item.album.images[0].url} height={65} width={65} alt='Album Cover' />
						<div className='song'>
							<h3>{item.name}</h3>
							<div className='artists'>
								{item.artists.map(artist => (
									<span key={artist.id}>{artist.name}</span>
								))}
							</div>
						</div>
					</StyledSong>
				))}
			</div>
		</StyledTopPage>
	);
}
