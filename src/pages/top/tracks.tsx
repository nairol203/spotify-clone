import { Placeholder, Group, Chip, Card, Flex, RadioChip } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topTracks.useQuery({ range });

	if (!topTracks.data)
		return (
			<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</Flex>
		);

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			<h1>Top Tracks</h1>
			<Flex>
				<RadioChip active={range === 'short_term'} clickable onClick={() => setRange('short_term')} variant={range === 'short_term' ? 'primary' : 'secondary'}>
					4 Weeks
				</RadioChip>
				<RadioChip active={range === 'medium_term'} clickable onClick={() => setRange('medium_term')} variant={range === 'medium_term' ? 'primary' : 'secondary'}>
					6 Months
				</RadioChip>
				<RadioChip active={range === 'long_term'} clickable onClick={() => setRange('long_term')} variant={range === 'long_term' ? 'primary' : 'secondary'}>
					All time
				</RadioChip>
			</Flex>
			<Flex direction='column' gap='1em'>
				{topTracks.data.items.map(item => (
					<Card key={item.id}>
						<Flex gap='1em' align='center'>
							<a style={{ display: 'flex', justifyContent: 'center' }} href={item.external_urls.spotify} target='_blank' rel='noreferrer'>
								<Image src={item.album.images[0].url} height={75} width={75} alt='Album Cover' style={{ borderRadius: '0.25em' }} />
							</a>
							<Flex gap='.25em' direction='column'>
								<h3>{item.name}</h3>
								<Group className='artists'>
									{item.artists.map(artist => (
										<Chip clickable href={artist.external_urls.spotify} target='_blank' rel='noreferrer' key={artist.id} variant='secondary'>
											{artist.name}
										</Chip>
									))}
								</Group>
							</Flex>
						</Flex>
					</Card>
				))}
			</Flex>
		</Flex>
	);
}
