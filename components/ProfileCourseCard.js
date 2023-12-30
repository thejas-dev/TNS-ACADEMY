"use client"
import {useState,useEffect} from 'react';

export default function ProfileCourseCard({course,j}) {
	// body...
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
		if(course){
			const percentage = calculateCompletionPercentage(course);
			setPercentage(percentage)
			
		}
	},[course])


	return (
		<div key={j} 
		onClick={()=>{
			router.push(`/courses/${course?.courseId}`);
		}}
		className="flex md:gap-3 gap-2 bg-white border-[1px] border-gray-300 hover:bg-gray-50 cursor-pointer 
		md:px-4 px-2 py-3 rounded-lg">
			<div className="w-[40%]">
				<img src={course?.image} alt="" className="w-full aspect-[16/9] rounded-lg"
				/>
			</div>
			<div className="flex w-[60%] flex-col gap-2 justify-between h-full">
				<h1 className="leading-none text-lg font-semibold text-black">{course?.title}</h1>
			
				<div className="w-full px-0 pb-0 flex flex-col gap-2">
					<div className="flex items-center justify-between">
						<span className="text-sm font-normal text-gray-900">Progress {percentage}%</span>
						<span className="text-purple-500 font-normal text-sm whitespace-no-wrap">Access &gt;&gt;</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full overflow-hidden h-2">
						<div style={{
							width:`${percentage}%`
						}} className={`h-full bg-gradient-to-r from-purple-500/80 via-purple-500/80 to-red-500/50`} />
					</div>
				</div>
			</div>	

		</div>
	)
}