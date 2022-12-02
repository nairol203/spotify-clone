import SkeletonCard from '@components/SkeletonCard';
import { Card, Chip, Flex, Group } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function Home() {
	const topTracks = trpc.recentlyPlayed.useQuery();

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			<h1>Spotify Stats</h1>
			<CurrentlyPlaying />
			<h2>Recently Played</h2>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
				{topTracks.data ? (
					topTracks.data.items.map(item => (
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
					))
				) : (
					<>
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
						<SkeletonCard withArtist />
					</>
				)}
			</div>
		</Flex>
	);
}

function CurrentlyPlaying() {
	const currentlyPlaying = trpc.currentlyPlaying.useQuery();

	if (!currentlyPlaying.data || !currentlyPlaying.data.is_playing || currentlyPlaying.data.currently_playing_type !== 'track') return <></>;

	return (
		<>
			<h2>Currently Playing</h2>
			<Card key={currentlyPlaying.data?.item?.id}>
				<Flex gap='1em' align='center'>
					<a style={{ display: 'flex', justifyContent: 'center' }} href={currentlyPlaying.data.item?.external_urls.spotify} target='_blank' rel='noreferrer'>
						<Image
							src={
								// @ts-expect-error
								currentlyPlaying.data?.item?.album.images[0].url
							}
							height={75}
							width={75}
							alt='Album Cover'
							style={{ borderRadius: '0.25em' }}
						/>
					</a>
					<Flex gap='.25em' direction='column'>
						<h3>{currentlyPlaying.data?.item?.name}</h3>
						<Group>
							{
								// @ts-expect-error
								currentlyPlaying.data?.item?.artists.map(artist => (
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
	);
}
