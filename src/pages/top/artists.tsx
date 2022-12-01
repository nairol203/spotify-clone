import { Card, Chip, Flex, Group, Placeholder } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topArtists.useQuery({ range });

	if (!topTracks.data)
		return (
			<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</Flex>
		);

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			<h1>Top Artists</h1>
			<Group>
				<Chip clickable onClick={() => setRange('short_term')} variant={range === 'short_term' ? 'primary' : 'secondary'}>
					4 Weeks
				</Chip>
				<Chip clickable onClick={() => setRange('medium_term')} variant={range === 'medium_term' ? 'primary' : 'secondary'}>
					6 Months
				</Chip>
				<Chip clickable onClick={() => setRange('long_term')} variant={range === 'long_term' ? 'primary' : 'secondary'}>
					All time
				</Chip>
			</Group>
			<Flex direction='column' gap='1em'>
				{topTracks.data.items.map((item, index) => (
					<Card key={item.id}>
						<Flex gap='1em' align='center'>
							<Image src={item.images[0].url} height={75} width={75} alt='Album Cover' style={{ borderRadius: '0.25em' }} />
							<h3>{item.name}</h3>
						</Flex>
					</Card>
				))}
			</Flex>
		</Flex>
	);
}
