"use client"

import {useEffect,useState} from 'react';
import HeaderForCourse from '../HeaderForCourse';
import axios from 'axios';
import {useRouter} from 'next/navigation';
import {fetchCourse,enrollCourse} from '../../utils/ApiRoutes';
import {IoMdTime} from 'react-icons/io';
import {AiOutlineCalendar,AiOutlineInstagram} from 'react-icons/ai';
import {MdOutlineLanguage,MdOutlineVideoLibrary} from 'react-icons/md';
import {SiGooglemeet} from 'react-icons/si';
import {BsFillShareFill} from 'react-icons/bs';
import {TbCertificate} from 'react-icons/tb';
import {useRecoilState} from 'recoil'
import {GrNotes} from 'react-icons/gr';
import {currentUserState} from '../../atoms/userAtom';
import {TiTick} from 'react-icons/ti';
import {motion} from 'framer-motion';

export default function EnrollCourseComponent({id,setCourseName}) {
	const [loading,setLoading] = useState(true);
	const [currentCourse,setCurrentCourse] = useState('');
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const router = useRouter();
	const [enrolled,setEnrolled] = useState(false);
	const [successMessage,setSuccessMessage] = useState(false);
	const [loadingText,setLoadingText] = useState('Loading...');

	const fetchCourseFunc = async() => {
		const {data} = await axios.post(fetchCourse,{
			key:"DWjO8xwOjufFQsx7vUI7Mw==",
			id
		})
		if(currentUser?.enrolledCoursesId?.includes(data?.course?.courseId)){
			setEnrolled(true);
		}
		if (data.status) {
			setCurrentCourse(data?.course);
			setCourseName(data?.course?.title);
			setLoading(false);
		}else{
			router.push('/');
		}
	}

	const enrollThisCourse = async() => {
		if(!enrolled && currentUser && !currentCourse?.locked) {
			setLoading(true);
			setLoadingText('Enrolling...');
			setEnrolled(true);
			const enrolledCoursesId = [...currentUser.enrolledCoursesId,currentCourse.courseId];
			const courseData = {
				...currentCourse,
				completed:false,
				enrolledOn:new Date().toISOString(),
				certificate:'',
				name:currentUser?.name,
				userId:currentUser?._id,
				progress:0,
				allNotes:[]
			}
			const enrolledCoursesData = [...currentUser?.enrolledCoursesData,courseData];
			const {data} = await axios.post(`${enrollCourse}/${currentUser?._id}`,{
				enrolledCoursesId,enrolledCoursesData,key:'B2hkk90amFQZd3cpTeidd2qmav+DYVjRTg43u6YZ1KU='
			})
			if (data.status) {
				setCurrentUser(data?.user);
				setEnrolled(true);
				setLoading(false);
				setLoadingText('Loading...');
				showSuccesfullyRegisteredMessage();
			}
		}else if(currentUser && enrolled){
			router.push(`/courses/${currentCourse?.courseId}`);
		}else {
			router.push('/slideIn')
		}
	}

	const handleShare = async () => {
	    try {
	      if (navigator.share) {
	        await navigator.share({
	          title: 'TNS-Academy Courses',
	          text: `Check out TNS-Academy's ${currentCourse?.title}!`,
	          url: window.location.href,
	        });
	      } else {
	        throw new Error('Web Share API not supported');
	      }
	    } catch (error) {
	      console.error('Error sharing:', error.message);
	    }
	  };

	const showSuccesfullyRegisteredMessage = async() => {
		setSuccessMessage(true);
		setTimeout(()=>{
			setSuccessMessage(false);
		},5000)
	}

	useEffect(()=>{
		if(!currentCourse){
			fetchCourseFunc()
		}
	},[])

	return (
		<main className="w-full h-full overflow-y-auto bg-white">
			<div 
			onClick={()=>{
				setSuccessMessage(false)
			}}
			className={`fixed cursor-pointer ${successMessage ? 'bottom-5' : '-bottom-[100%]'} left-5
			mx-auto flex items-center bg-green-500 rounded-xl border-[1px] border-green-300/50 transition-all 
			duration-200 ease-in-out py-2 md:px-5 px-4 gap-2`}>
				<h1 className="md:text-xl text-lg font-semibold text-white">
					Successfully Registered
				</h1>
				<TiTick className="h-5 w-5 text-white"/>
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
				    <div class="text" data-text={loadingText}></div>
				</div>
			</div>
			<HeaderForCourse hide="true" fixed='true' />
			<div className="relative flex sm:flex-row flex-col-reverse md:mx-auto pt-12 xl:pb-7 lg:pb-10 md:pb-14 pb-[60px]  max-w-6xl md:bg-gradient-to-r bg-gradient-to-t from-purple-500/80 via-purple-500/80 to-red-500/50 rounded-b-2xl
			 shadow-xl shadow-purple-500/70 border-[1px] border-gray-300/60 items-center">
				<div className="md:w-[60%] w-full px-7 md:py-[70px] py-5">
					<h1 className="lg:text-3xl text-2xl font-semibold text-white md:text-start text-center">{currentCourse?.title}</h1>
					<p className="lg:text-md text-md mt-3 text-gray-100 md:text-start text-center">{currentCourse?.description}</p>
				</div>
				<div className="md:w-[40%] w-full px-7 sm:pt-14 sm:py-1 pt-7 ">
					<img className="rounded-2xl hover:scale-105 transition-all duration-100 shadow-xl cursor-pointer ease-in-out" alt="" src={currentCourse?.image}/>
				</div>
			</div>
			<div className="mt-[30px] max-w-6xl w-full mx-auto lg:px-6 px-4 flex">
				<div className="flex gap-5 md:flex-row flex-col w-full">
					<div className=" flex flex-col gap-2">
						<div className="flex xl:gap-14 lg:gap-10 md:gap-7 gap-5 items-center">
							<h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-gray-900 font-semibold">{currentCourse?.title} course</h1>
							<button 
							onClick={enrollThisCourse}
							className={`rounded-xl lg:px-14 px-7 lg:py-2 py-[5px] hover:scale-110 bg-gradient-to-r from-black/70 
							to-black text-white md:text-xl text-lg font-semibold border-[1px] border-sky-700/50 shadow-lg shadow-purple-500/30 
							transition-all ease-in-out duration-100`}>
								{
									enrolled ? 
									'Access'
									:
									'Enroll'
								}
							</button>
						</div>
						<div className="flex items-center md:gap-3 gap-2 flex-wrap">
							<p className="text-gray-600 text-md font-semibold flex items-center gap-1"><IoMdTime className="h-5 w-5 text-gray-600"/> {currentCourse?.duration}</p>
							<p className="text-gray-600 text-md font-semibold flex items-center gap-1"><MdOutlineLanguage className="h-5 w-5 text-gray-600"/> {currentCourse?.language}</p>
						</div>
						{
							currentCourse?.enrolledParticipants?.length > 0 &&
							<div className="flex items-center gap-1 w-full">
								<h1 className="text-lg text-gray-600 flex w-full items-center gap-2">
									<div className="flex items-center">
									{
										currentCourse?.enrollParticipants?.map((reg,j)=>(
											<img src={reg.image} alt="" key={j} className={`h-5 w-5 ${j>2 && 'hidden'} rounded-full`}/>
										))
									}
									</div>
									{
										currentCourse?.enrollParticipants?.length>0 &&
										`${currentCourse?.enrollParticipants?.length}+ Peoples Enrolled`
									}
								</h1>
							</div>
						}
						<div className="flex flex-col gap-[6px] w-full">
							<div className="flex items-center">
								<p className="text-gray-600 text-md font-semibold flex items-center gap-2">
									<MdOutlineVideoLibrary className="h-5 w-5 text-gray-600"/>  
									{
										enrolled ? 
										<a href={currentCourse?.meetingLink}>{currentCourse?.meetingLink}</a>
										:
										'The course contents will be available on our platform.'
									}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 text-md flex items-center gap-2">	
									<TbCertificate className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/>Certificates will be provided
								</p>
							</div>
							<div className="flex items-center gap-2">
								<p 
								onClick={handleShare}
								className="text-sky-500 cursor-pointer hover:text-sky-700 text-md flex items-center gap-2 underline">
									<BsFillShareFill className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/>Share Course
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-12 lg:max-w-6xl w-full mx-auto lg:px-6 px-4">
				<h1 className="xl:text-4xl underline lg:text-3xl text-center mb-8 md:text-3xl text-3xl font-semibold text-black">Course Contents</h1>
				{
					currentCourse?.content?.map((ln,j)=>(
						<motion.div 
						initial={{
							x:-100,
							opacity:0.5
						}}
						whileInView={{
							x:0,
							opacity:1
						}}
						transition={{
							duration:0.6
						}}
						viewport={{ once: true }}
						key={j} className={`w-full text-start ${j>0 ? 'mt-1' : 'mt-5'} `}>
							<div className="py-3 flex flex-col gap-[6px]">
								<h1 className=' md:text-xl text-lg text-gray-950 flex items-center gap-2'>{j+1}. {ln?.title} {
								ln?.title.toLowerCase().includes('quiz') ?
									<><GrNotes className="h-4 w-4"/> {ln?.questions?.length} Questions</>
									:
									<><IoMdTime className="h-5 w-5"/> ({ln?.duration})</>
								}</h1>
							</div>	
						</motion.div>				
					))
				}
			</div>

			<div className="mt-12 lg:max-w-6xl w-full mx-auto lg:px-6 px-4">
				<h1 className="xl:text-4xl lg:text-3xl text-center mb-8 md:text-3xl text-3xl underline font-semibold text-black">Instructions</h1>
				<div className="w-full text-start ">
					<h1 className="xl:text-2xl lg:text-xl text-lg font-semibold text-black	">Requirements :-</h1>
					<div className="pl-3 py-3 flex flex-col gap-[6px]">
						{currentCourse?.requirements?.map((req,j)=>(
							<h1 key={j} className=' xl:text-lg md:text-md text-gray-700 '>- {req}</h1>
						))}
					</div>	
				</div>				
			</div>

			<div className="mt-12 lg:max-w-6xl w-full mx-auto lg:px-6 px-4 flex justify-center mb-8 items-center">
				<a href={currentCourse?.authorInsta}><h1 className="text-gray-700 hover:underline flex gap-1 hover:text-sky-500 transition-all duration-100 ease-in
				font-semibold text-md">Author, {currentCourse?.author} <AiOutlineInstagram className="h-6 hover:text-sky-500 transition-all duration-100 ease-in
				w-6 text-gray-700"/> </h1></a>
			</div>

		</main>
	)
}