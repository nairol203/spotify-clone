import { StyledSong, StyledTopPage } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

function calcTime(date: Date) {
	const ms = Date.now() - date.getTime();
	const hours = Math.floor(ms / 3600000) % 24;
	const seconds = Math.floor(ms / 1000) % 60;
	const minutes = Math.floor(ms / 60000) % 60;

	if (hours > 0) return `vor ${hours} Stunde${hours === 1 ? '' : 'n'}`;
	if (minutes > 0) return `vor ${minutes} Minute${minutes === 1 ? '' : 'n'}`;
	return `vor ${seconds} Sekunde${seconds === 1 ? '' : 'n'}`;
}

export default function Home() {
	const currentlyPlaying = trpc.currentlyPlaying.useQuery();
	const topTracks = trpc.recentlyPlayed.useQuery();

	if (!topTracks.data || !currentlyPlaying.data) return <div>Loading...</div>;
	if (topTracks.error || currentlyPlaying.error) return <div>Error!</div>;

	return (
		<StyledTopPage>
			{currentlyPlaying.data.is_playing && currentlyPlaying.data.currently_playing_type == 'track' && (
				<>
					<h1>Currently Playing</h1>
					<StyledSong>
						<Image
							// @ts-expect-error
							src={currentlyPlaying.data.item?.album.images[0].url}
							height={65}
							width={65}
							alt='Album Cover'
							style={{ borderRadius: '0.25em', boxShadow: '0 0 2px rgb(0,0,0,.25)' }}
						/>
						<div className='song'>
							<h3>{currentlyPlaying.data.item?.name}</h3>
							<div className='artists'>
								{
									// @ts-expect-error
									currentlyPlaying.data.item?.artists.map(artist => (
										<span>{artist.name}</span>
									))
								}
							</div>
						</div>
					</StyledSong>
				</>
			)}
			<h1>Recently Played</h1>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				{topTracks.data.items.map(item => (
					<StyledSong key={item.track.id}>
						<div
							style={{
								fontSize: '1.2em',
								width: '9em',
							}}
							className='index'
						>
							{calcTime(new Date(item.played_at))}
						</div>
						<Image src={item.track.album.images[0].url} height={65} width={65} alt='Album Cover' />
						<div className='song'>
							<h3>{item.track.name}</h3>
							<div className='artists'>
								{item.track.artists.map(artist => (
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
