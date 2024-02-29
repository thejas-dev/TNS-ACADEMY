"use client"
import dynamic from 'next/dynamic'
import SideBar from './SideBar';
const DynamicComponent = dynamic(() =>
  import('./VideoDetails'),{
  	ssr:false
  })

import {useState,useEffect} from 'react';
import CourseContents from './CourseContents';
// import VideoDetails	from './VideoDetails';
import {useRecoilState} from 'recoil'
import {currentCourseState,currentUserState} from '../../atoms/userAtom';
import {fetchCourse} from '../../utils/ApiRoutes';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import HelpCard from './HelpCard'

export default function MainCourseComponent({id,setCourseName}) {
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [currentCourse,setCurrentCourse] = useRecoilState(currentCourseState);
	const [loading,setLoading] = useState(true);
	const router = useRouter();
	const [openHelpTab,setOpenHelpTab] = useState(false);
	const [openSideBar,setOpenSideBar] = useState(false);

	const fetchCourseContents = async() => {
		if(currentUser?.enrolledCoursesId?.includes(id)){
			const userRegisteredCourses = currentUser?.enrolledCoursesData;
			const idx = userRegisteredCourses.findIndex(course=>{
				if(course.courseId === id){
					return true
				}
				return false
			})
			if(idx > -1){
				setCourseName(userRegisteredCourses[idx]?.title);
				setCurrentCourse(userRegisteredCourses[idx]);
			}else{
				router.push(`/`)
			}
		}else{
			router.push(`/`)
		}
	}
	
	useEffect(()=>{
		if(id){
			setCurrentCourse([]);
			fetchCourseContents();
		}
	},[id])

	return (
		<main className="w-full h-full flex items-center">
			<div className={`z-50 fixed left-0 h-full w-full bg-black/70 px-5 py-3 flex items-center
			justify-center ${openHelpTab ? 'top-0' : '-top-[100%]'} `}>
				<HelpCard openHelpTab={openHelpTab} setOpenHelpTab={setOpenHelpTab} />
			</div>

			<div className={` top-0 backdrop-blur-lg bg-black/90 flex items-center justify-center 
				left-0 ${loading ? 'fixed' : 'hidden'} h-full w-full z-50`}>
					<div id="wifi-loader">
					    <svg class="circle-outer" viewBox="0 0 86 86">
					        <circle class="back" cx="43" cy="43" r="40"></circle>
					        <circle class="front" cx="43" cy="43" r="40"></circle>
					        <circle class="new" cx="43" cy="43" r="40"></circle>
					    </svg>
					    <svg class="circle-middle" viewBox="0 0 60 60">
					        <circle class="back" cx="30" cy="30" r="27"></circle>
					        <circle class="front" cx="30" cy="30" r="27"></circle>
					    </svg>
					    <svg class="circle-inner" viewBox="0 0 34 34">
					        <circle class="back" cx="17" cy="17" r="14"></circle>
					        <circle class="front" cx="17" cy="17" r="14"></circle>
					    </svg>
					    <div class="text" data-text='Loading...'></div>
					</div>
				</div>
			<SideBar currentUser={currentUser} setOpenHelpTab={setOpenHelpTab} 
			openHelpTab={openHelpTab} openSideBar={openSideBar}
			setOpenSideBar={setOpenSideBar} />
			<DynamicComponent currentCourse={currentCourse} setCurrentCourse={setCurrentCourse} 
			loading={loading} setLoading={setLoading} openSideBar={openSideBar}
			setOpenSideBar={setOpenSideBar} 
			/>
			<CourseContents loading={loading} setLoading={setLoading} />

		</main>
	)
}