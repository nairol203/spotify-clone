import { StyledTopPage, Placeholder, Group, Chip, Card, Flex } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useState } from 'react';

export default function Home() {
	const [range, setRange] = useState<'short_term' | 'medium_term' | 'long_term'>('short_term');
	const topTracks = trpc.topTracks.useQuery({ range });

	if (!topTracks.data)
		return (
			<StyledTopPage>
				<h1>Loading...</h1>
				<Placeholder height='90vh' />
			</StyledTopPage>
		);

	return (
		<StyledTopPage>
			<h1>Top Tracks</h1>
			<Flex>
				<Chip clickable onClick={() => setRange('short_term')} variant={range === 'short_term' ? 'primary' : 'secondary'}>
					4 Weeks
				</Chip>
				<Chip clickable onClick={() => setRange('medium_term')} variant={range === 'medium_term' ? 'primary' : 'secondary'}>
					6 Months
				</Chip>
				<Chip clickable onClick={() => setRange('long_term')} variant={range === 'long_term' ? 'primary' : 'secondary'}>
					All time
				</Chip>
			</Flex>
			<Flex direction='column' gap='1em'>
				{topTracks.data.items.map(item => (
					<Card key={item.id}>
						<Flex gap='1em' align='center'>
							<Image src={item.album.images[0].url} height={75} width={75} alt='Album Cover' style={{ borderRadius: '0.25em' }} />
							<Flex gap='.25em' direction='column'>
								<h3>{item.name}</h3>
								<Group className='artists'>
									{item.artists.map(artist => (
										<Chip key={artist.id} variant='secondary'>
											{artist.name}
										</Chip>
									))}
								</Group>
							</Flex>
						</Flex>
					</Card>
				))}
			</Flex>
		</StyledTopPage>
	);
}
