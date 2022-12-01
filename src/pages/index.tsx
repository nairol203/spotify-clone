import { Card, Chip, Flex, Group, Placeholder } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

// function calcTime(date: Date) {
// 	const ms = Date.now() - date.getTime();
// 	const hours = Math.floor(ms / 3600000) % 24;
// 	const seconds = Math.floor(ms / 1000) % 60;
// 	const minutes = Math.floor(ms / 60000) % 60;

// 	if (hours > 0) return `vor ${hours} Stunde${hours === 1 ? '' : 'n'}`;
// 	if (minutes > 0) return `vor ${minutes} Minute${minutes === 1 ? '' : 'n'}`;
// 	return `vor ${seconds} Sekunde${seconds === 1 ? '' : 'n'}`;
// }

export default function Home() {
	const currentlyPlaying = trpc.currentlyPlaying.useQuery();
	const topTracks = trpc.recentlyPlayed.useQuery();

	if (!topTracks.data || !currentlyPlaying.data)
		return (
			<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</Flex>
		);

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			{currentlyPlaying.data.is_playing && currentlyPlaying.data.currently_playing_type == 'track' && currentlyPlaying.data?.item && (
				<>
					<h1>Currently Playing</h1>
					<Card key={currentlyPlaying.data?.item.id}>
						<Flex gap='1em' align='center'>
							<a style={{ display: 'flex', justifyContent: 'center' }} href={currentlyPlaying.data.item.external_urls.spotify} target='_blank' rel='noreferrer'>
								<Image
									src={
										// @ts-expect-error
										currentlyPlaying.data?.item.album.images[0].url
									}
									height={75}
									width={75}
									alt='Album Cover'
									style={{ borderRadius: '0.25em' }}
								/>
							</a>
							<Flex gap='.25em' direction='column'>
								<h3>{currentlyPlaying.data?.item.name}</h3>
								<Group>
									{
										// @ts-expect-error
										currentlyPlaying.data?.item.artists.map(artist => (
											<Chip clickable href={artist.external_urls.spotify} target='_blank' rel='noreferrer' key={artist.id} variant='secondary'>
												{artist.name}
											</Chip>
										))
									}
								</Group>
							</Flex>
						</Flex>
					</Card>
				</>
			)}
			<h1>Recently Played</h1>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				{topTracks.data.items.map(item => (
					<Card key={item.track.id}>
						<Flex gap='1em' align='center'>
							<a style={{ display: 'flex', justifyContent: 'center' }} href={item.track.external_urls.spotify} target='_blank' rel='noreferrer'>
								<Image src={item.track.album.images[0].url} height={75} width={75} alt='Album Cover' style={{ borderRadius: '0.25em' }} />
							</a>
							<Flex gap='.25em' direction='column'>
								<h3>{item.track.name}</h3>
								<Group>
									{item.track.artists.map(artist => (
										<Chip clickable href={artist.external_urls.spotify} target='_blank' rel='noreferrer' key={artist.id} variant='secondary'>
											{artist.name}
										</Chip>
									))}
								</Group>
							</Flex>
						</Flex>
					</Card>
				))}
			</div>
		</Flex>
	);
}
