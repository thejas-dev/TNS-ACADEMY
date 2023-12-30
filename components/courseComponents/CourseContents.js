"use client"

import {useRecoilState} from 'recoil'
import {currentCourseState,currentPlayingVideoState} from '../../atoms/userAtom';
import {PiPlayFill,PiScreencastBold} from 'react-icons/pi';
import {HiOutlineClock} from 'react-icons/hi';
import {GrNotes} from 'react-icons/gr';
import {TiTick} from 'react-icons/ti';
import {IoMdLock} from 'react-icons/io';


export default function CourseContents({loading,setLoading}) {
	const [currentCourse,setCurrentCourse] = useRecoilState(currentCourseState);
	const [currentPlayingVideo,setCurrentlyPlayingVideo] = useRecoilState(currentPlayingVideoState)
	


	return (
		<main className="md:w-[35%] z-0 flex flex-col overflow-y-auto md:relative md:block hidden h-full px-4 py-5">
			<div className="w-full flex flex-col gap-2">
				<h1 className='text-lg font-semibold text-gray-100'>{currentCourse?.title}</h1>
				<p className="text-sm font-normal text-gray-300">{currentCourse?.description}</p>
			</div>
			<div className="flex flex-col px-2 py-3 gap-4 border-t-[1px] border-gray-600 mt-4 py-4">
				{
					currentCourse?.content?.map((course,j)=>(
						<div key={j}
						onClick={()=>{
							if(!course.locked){
								setCurrentlyPlayingVideo(course);
							}
						}}
						className={`w-full px-2 py-3 flex border-[1.3px] border-gray-300 
						${currentPlayingVideo?.title === course?.title ? 'bg-gray-700/70' : 'hover:bg-gray-700/70'}
						${course?.locked ? '' : 'cursor-pointer'} 
						rounded-xl transition-all duration-200 ease-in-out items-center gap-2`}>
							<div className="rounded-full p-2 bg-gradient-to-r from-pink-500 to-purple-500">
								{
									course?.locked ? 
									<IoMdLock className="text-white h-5 w-5"/>
									:
									currentPlayingVideo?.title === course.title && !currentPlayingVideo.quiz ?
									<PiScreencastBold className="text-white animate-pulse h-5 w-5"/>
									:
									course?.quiz ? 
									<GrNotes className="text-white h-5 w-5"/>
									:
									<PiPlayFill className="text-white h-5 w-5"/>
								}
							</div>
							<div className="flex flex-col gap-2">
								<h1 className="text-md font-semibold leading-none break-words flex items-center gap-1 text-white">
								{course?.completed &&
									<div className="rounded-full h-3 w-3 text-white bg-purple-400">
										<TiTick className="h-full w-full"/>
									</div>
								}
								{course?.title}
								</h1>
								{
									course?.quiz ?
									<p className="text-sm font-normal text-gray-300 leading-none flex items-center gap-2">
										{course?.questions?.length} Questions
									</p>
									:  
									<p className="text-sm font-normal text-gray-300 leading-none flex items-center gap-2">
										<HiOutlineClock className="h-4 w-4"/>{course?.duration}
									</p>
								}
							</div>
						</div>
					))
				}
			</div>
		</main>
	)
}