import { Card, Chip, Flex, Group, Placeholder } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';

export default function Home() {
	const topTracks = trpc.recentlyPlayed.useQuery();

	if (!topTracks.data)
		return (
			<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</Flex>
		);

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			<CurrentlyPlaying />
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

function CurrentlyPlaying() {
	const currentlyPlaying = trpc.currentlyPlaying.useQuery();

	if (!currentlyPlaying.data) return <></>;

	return (
		<>
			<h1>Currently Playing</h1>
			<Card
				key={
					// @ts-expect-error
					currentlyPlaying.data?.item.id
				}
			>
				<Flex gap='1em' align='center'>
					<a
						style={{ display: 'flex', justifyContent: 'center' }}
						href={
							// @ts-expect-error
							currentlyPlaying.data.item.external_urls.spotify
						}
						target='_blank'
						rel='noreferrer'
					>
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
						<h3>
							{
								// @ts-expect-error
								currentlyPlaying.data?.item.name
							}
						</h3>
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
	);
}
