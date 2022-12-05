import { Card, Chip, Flex, Group, Skeleton } from './styles/Core.styled';

interface SkeletonCardProps {
	withArtist?: boolean;
	withRanking?: boolean;
}

export default function SkeletonCard({ withArtist, withRanking }: SkeletonCardProps) {
	return (
		<Card>
			<Flex gap='1em' align='center'>
				{withRanking && <Skeleton height='40px' width='40px' circle></Skeleton>}
				<Skeleton height='75px' width='75px'></Skeleton>
				<Flex gap='.25em' direction='column'>
					<Skeleton>
						<h3>Lorem ipsum dolor</h3>
					</Skeleton>
					{withArtist && (
						<Group>
							<Skeleton>
								<Chip size='small'>lorem</Chip>
							</Skeleton>
						</Group>
					)}
				</Flex>
			</Flex>
		</Card>
	);
}
