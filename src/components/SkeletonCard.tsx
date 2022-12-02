import { Card, Chip, Flex, Group, Skeleton } from './styles/Core.styled';

interface SkeletonCardProps {
	withArtist?: boolean;
}

export default function SkeletonCard({ withArtist }: SkeletonCardProps) {
	return (
		<Card>
			<Flex gap='1em' align='center'>
				<Skeleton height='40px' width='40px' circle></Skeleton>
				<Skeleton height='75px' width='75px'></Skeleton>
				<Flex gap='.25em' direction='column'>
					<Skeleton>
						<h3>Lorem ipsum dolor</h3>
					</Skeleton>
					{withArtist && (
						<Group>
							<Skeleton>
								<Chip>lorem</Chip>
							</Skeleton>
						</Group>
					)}
				</Flex>
			</Flex>
		</Card>
	);
}
