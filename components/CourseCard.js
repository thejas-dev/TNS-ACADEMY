"use client"
import {useState,useEffect} from 'react';
import {HiOutlineLockClosed} from 'react-icons/hi'
import {MdVideoSettings} from 'react-icons/md' 
import {AiOutlineFundProjectionScreen} from 'react-icons/ai';
import {IoMdTime} from 'react-icons/io';

export default function CourseCard({dat,j,currentUser,router}) {
	const [enrolled,setEnrolled] = useState(false);
	const [percentage,setPercentage] = useState(0);

	function calculateCompletionPercentage(courseData) {
	  if (!courseData || !courseData.content || courseData.content.length === 0) {
	    return 0;
	  }

	  const completedCount = courseData.content.filter(item => item.completed).length;

	  const completionPercentage = (completedCount / courseData.content.length) * 100;

	  return completionPercentage;
	}

	useEffect(()=>{
		if(dat){
			if(currentUser?.enrolledCoursesId?.includes(dat?.courseId.toString())){
				setEnrolled(true);
				const userCourses = [...currentUser?.enrolledCoursesData];
				const idx = userCourses.findIndex(course=>{
					if(course.courseId === dat?.courseId){
						return true
					}
					return false
				})
				const percentage = Math.ceil(calculateCompletionPercentage(currentUser?.enrolledCoursesData[idx]));
				setPercentage(percentage)
			}else{
				setEnrolled(false)
			}
		}
	},[dat])

	useEffect(()=>{
		if(currentUser?.enrolledCoursesId?.includes(dat?.courseId.toString())){
			setEnrolled(true);
			const userCourses = [...currentUser?.enrolledCoursesData];
			const idx = userCourses.findIndex(course=>{
				if(course.courseId === dat?.courseId){
					return true
				}
				return false
			})
			const percentage = Math.ceil(calculateCompletionPercentage(currentUser?.enrolledCoursesData[idx]));
			setPercentage(percentage)
		}else{
			setEnrolled(false)
		}
	},[currentUser])

	return (
		<div key={j} 
		onClick={()=>{
			if(!dat?.locked) {
				if(currentUser?.enrolledCoursesId?.includes(dat?.courseId.toString())){
					router.push(`/courses/${dat?.courseId}`);
				}else{
					router.push(`/enroll/${dat?.courseId}`);
				}
			}
		}}
		className={`relative rounded-xl flex cursor-pointer ${dat.locked ? '':'' } hover:scale-95 transition-all duration-100 ease-in-out
		 flex-col shadow-xl border-[1px] border-gray-700/40 overflow-hidden pb-3`}>
			<div className={`absolute h-full w-full bg-white/80 ${dat.locked ? 'flex' : 'hidden'} items-center justify-center`}>
				<HiOutlineLockClosed className="h-7 w-7 text-gray-700 "/>
			</div>
			<img src={dat.image} alt="" className="w-full aspect-video	"/>
			<div className="px-3 py-2">
				<h1 className="text-2xl font-semibold text-black">{dat?.title}</h1>
				<div className="flex gap-2">
					<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><MdVideoSettings className="h-5 w-5"/>{dat?.videos}</h1>
					<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><AiOutlineFundProjectionScreen className="h-5 w-5"/>{dat?.projects} projects</h1>
					<h1 className="text-md items-center flex gap-[5px] text-gray-600 mt-2 font-semibold"><IoMdTime className="h-5 w-5"/>{dat?.duration}</h1>
				</div>
				<p className="text-sm mt-3 font-semibold text-gray-700">{dat?.description}</p>
				{
					enrolled ?
					<div className="w-full mt-3 px-0 pb-0 flex flex-col gap-2">
						<div className="flex items-center justify-between">
							<span className="text-sm font-normal text-gray-900">Progress {percentage}%</span>
							<span className="text-purple-500 font-normal text-sm">Access &gt;&gt;</span>
						</div>
						<div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
							<div style={{
								width:`${percentage}%`
							}} className={`h-full bg-gradient-to-r from-purple-500/80 via-purple-500/80 to-red-500/50`} />
						</div>
					</div>
					:
					<div className="flex items-center justify-end mt-5">
						<button className="text-sky-500 text-lg flex whitespace-nowrap">Enroll  &gt;&gt;</button>
					</div>
				}
			</div>
		</div>	

	)
}