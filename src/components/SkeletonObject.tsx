export const SkeletonObject: React.FC<{ type: 'track' | 'album'; ranking?: boolean }> = ({ type, ranking }) => {
	return (
		<div className='flex items-center justify-between gap-2 rounded-[4px] p-3 hover:bg-black hover:bg-opacity-10 hover:dark:bg-white hover:dark:bg-opacity-10'>
			<div className='flex items-center gap-4'>
				{ranking && <div className='skeleton flex w-5 justify-center'>1</div>}
				<div className='skeleton h-[50px] w-[50px]'></div>
				<div>
					<h3 className='skeleton'>Lorem, ipsum.</h3>
					{type === 'track' && (
						<div className='flex flex-wrap items-center gap-1'>
							<div>
								<a className='skeleton text-sm hover:underline dark:text-gray-300'>Lorem, ipsum.</a>
							</div>
						</div>
					)}
				</div>
			</div>
			{type === 'track' && <span className='skeleton sm:mr-2'>4:20</span>}
		</div>
	);
};
