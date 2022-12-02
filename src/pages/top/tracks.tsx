import SkeletonCard from '@components/SkeletonCard';
import { Card, Chip, Flex, Group, RadioButton, Ranking } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import Image from 'next/image';
import { useState } from 'react';
import { SPOTIFY_RANGE } from 'src/server/routers/_app';
import { z } from 'zod';

export default function Home() {
	const [range, setRange] = useState<z.infer<typeof SPOTIFY_RANGE>>('short_term');
	const topTracks = trpc.topTracks.useQuery({ range });

	return (
		<Flex direction='column' gap='1em' style={{ padding: '1em' }}>
			<h1>Top Tracks</h1>
			<Flex>
				<RadioButton active={range === 'short_term'} onClick={() => setRange('short_term')} variant={range === 'short_term' ? 'primary' : 'secondary'}>
					4 Weeks
				</RadioButton>
				<RadioButton active={range === 'medium_term'} onClick={() => setRange('medium_term')} variant={range === 'medium_term' ? 'primary' : 'secondary'}>
					6 Months
				</RadioButton>
				<RadioButton active={range === 'long_term'} onClick={() => setRange('long_term')} variant={range === 'long_term' ? 'primary' : 'secondary'}>
					All time
				</RadioButton>
			</Flex>
			<Flex direction='column' gap='1em'>
				{topTracks.data ? (
					topTracks.data.items.map((item, index) => (
						<Card key={item.id}>
							<Flex gap='1em' align='center'>
								<Ranking>{index + 1}</Ranking>
								<a style={{ display: 'flex', justifyContent: 'center' }} href={item.external_urls.spotify} target='_blank' rel='noreferrer'>
									<Image src={item.album.images[0].url} height={75} width={75} alt='Album Cover' style={{ borderRadius: '0.25em' }} />
								</a>
								<Flex gap='.25em' direction='column'>
									<h3>{item.name}</h3>
									<Group className='artists'>
										{item.artists.map(artist => (
											<Chip clickable href={artist.external_urls.spotify} target='_blank' rel='noreferrer' key={artist.id} variant='secondary' size='small'>
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
			</Flex>
		</Flex>
	);
}
