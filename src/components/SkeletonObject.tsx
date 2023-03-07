export const SkeletonObject: React.FC<{ type: 'track' | 'album' | 'albumCard'; ranking?: boolean }> = ({ type, ranking }) => {
    if (type == 'albumCard') {
        return (
            <div>
                <div className='skeleton grid max-w-[calc(150px+2rem)] gap-2 rounded-md bg-black p-4 hover:bg-white hover:bg-opacity-10'>
					<div className="h-[150px] w-[150px]"></div>
				</div>
            </div>
        );
    }

    return (
        <div className='flex items-center justify-between gap-2 rounded-[4px] p-2 px-4  hover:bg-white hover:bg-opacity-10'>
            <div className='flex items-center gap-4'>
                {ranking && <div className='skeleton flex w-5 justify-center'>1</div>}
                <div className='skeleton h-[50px] w-[50px]'></div>
                <div>
                    <h3 className='skeleton'>Lorem, ipsum.</h3>
                    {type === 'track' && (
                        <div className='flex flex-wrap items-center gap-1'>
                            <div>
                                <a className='skeleton text-sm text-gray-300 hover:underline'>Lorem, ipsum.</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {type === 'track' && <span className='skeleton sm:mr-2'>4:20</span>}
        </div>
    );
};

export const SkeletonObjectDetailed: React.FC<{ type: 'track' | 'album'; ranking?: boolean }> = ({ type, ranking }) => {
    return (
        <div className='grid grid-cols-[1.25rem_6fr_1fr] items-center gap-4 rounded-[4px] px-4 py-2 md:hover:bg-white md:hover:bg-opacity-10 lg:grid-cols-[1.25rem_6fr_4fr_3fr_1fr]'>
            {ranking && <div className='skeleton flex w-5 justify-center'>1</div>}
            <div className='flex items-center gap-4'>
                <div className='skeleton h-[50px] w-[50px]'></div>
                <div>
                    <h3 className='skeleton'>Lorem, ipsum.</h3>
                    {type === 'track' && (
                        <div className='flex flex-wrap items-center gap-x-1'>
                            <div>
                                <a className='skeleton text-sm text-gray-300 hover:underline'>Lorem, ipsum.</a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className='hidden lg:flex'>
                <span className='skeleton'>Lorem, ipsum.</span>
            </div>
            <div className='hidden lg:flex'>
                <span className='skeleton'>Lorem, ipsum.</span>
            </div>
            {type === 'track' && (
                <div className='flex justify-end'>
                    <span className='skeleton'>4:20</span>
                </div>
            )}
        </div>
    );
};
