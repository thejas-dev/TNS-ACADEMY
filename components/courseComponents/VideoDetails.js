"use client"

import ReactPlayer from 'react-player'
import React, {useRef} from 'react'
import Video from 'next-video'
import {useEffect,useState} from 'react';
import {useRecoilState} from 'recoil'
import {currentPlayingVideoState,currentUserState} from '../../atoms/userAtom';
import {AiOutlinePlusCircle} from 'react-icons/ai';
import OptionComponent from './OptionComponent';
import {RxCross2} from 'react-icons/rx';
import {TiTick} from 'react-icons/ti';
import {verifyQuizRoute,updateUserCourses,courseCompletedRoute} from '../../utils/ApiRoutes';
import axios from 'axios'
import CourseCompletionCard from './CourseCompletionCard';
import {IoMdLock} from 'react-icons/io';
import {PiScreencastBold} from 'react-icons/pi';
import {GrNotes} from 'react-icons/gr';
import {PiPlayFill} from 'react-icons/pi';
import {HiOutlineClock} from 'react-icons/hi';
import {MdKeyboardArrowDown} from 'react-icons/md';
import {FiMenu} from 'react-icons/fi';

export default function VideoDetails({currentCourse,setCurrentCourse,openSideBar,
	setOpenSideBar,loading,setLoading}) {
	const [currentPlayingVideo,setCurrentPlayingVideo] = useRecoilState(currentPlayingVideoState)
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState)
	const [currentTab,setCurrentTab] = useState('Details');
	const [openNotesAddTab,setOpenNotesAddTab] = useState(false);
	const [duration,setDuration] = useState('');
	const [description,setDescription] = useState('');
	const [checkingStarted,setCheckingStarted] = useState(false);
	const [quizVerifyLoading,setQuizVerifyLoading] = useState(false);
	const [thisVideoCompleted,setThisVideoCompleted] = useState(false);
	const [showCourseCompleted,setShowCourseCompleted] = useState(false);
	const [showContentsMobile,setShowContentsMobile] = useState(false);
	const backgroundVideoRef = useRef(null);
  	const videoRef = useRef(null);

	const tabs = [
		'Details',
		'Contents',
		'Notes'
	];

	useEffect(()=>{
		setLoading(false);
	},[])

	useEffect(()=>{
		if(currentPlayingVideo !== {} && currentCourse){
			checkAndSetContent();
		}
	},[]);

	const handlePlay = () => {
	    const video = videoRef.current.getInternalPlayer();
	    const backgroundVideo = backgroundVideoRef.current.getInternalPlayer();

	    video.play();
	    backgroundVideo.play();

	    if(!checkingStarted){
	    	startCheck();
	    	setCheckingStarted(true);
	    }

	    const currentTime = video.currentTime;
	    backgroundVideoRef.current.seekTo(currentTime);
	  };

	  const handlePause = () => {
	    const video = videoRef.current.getInternalPlayer();
	    const backgroundVideo = backgroundVideoRef.current.getInternalPlayer();

	    video.pause();
	    backgroundVideo.pause();

	    const currentTime = video.currentTime;
	    backgroundVideoRef.current.seekTo(currentTime);
	  };

	function calculateCompletionPercentage(courseData) {
	  if (!courseData || !courseData.content || courseData.content.length === 0) {
	    return 0;
	  }

	  const completedCount = courseData.content.filter(item => item.completed).length;

	  const completionPercentage = (completedCount / courseData.content.length) * 100;

	  return completionPercentage;
	}

	const courseCompleted = async() => {
		const {data} = await axios.post(courseCompletedRoute,{
			userName:currentUser?.name,
			email:currentUser?.email
		});
		if(data.status){
			console.log("Congratulations for completing the course, certificates will be provided after veritification");
		}
	}

	const checkForCompletion = (courseData) => {
		const percentage = calculateCompletionPercentage(courseData);
		if (percentage > 98) {
			setShowCourseCompleted(true);
			courseCompleted();
		}
	}

	const checkAndSetContent = () => {
  		const unlockedContent = currentCourse?.content?.find(item => !item.completed);
		setCurrentPlayingVideo(unlockedContent);
	}

	const updatedCourseDataToUserData = async(courseData) =>{
		let userCourses = [...currentUser?.enrolledCoursesData];
		const idx = userCourses?.findIndex(course=>{
			if(course?.courseId === courseData?.courseId){
				return true
			}
			return false
		})
		if(idx > -1){
			userCourses.splice(idx,1,courseData);
			const {data} = await axios.post(`${updateUserCourses}/${currentUser?._id}`,{
				enrolledCoursesData:userCourses,
				key:'B2hkk90amFQZd3cpTeidd2qmav+DYVjRTg43u6YZ1KU='
			})
			if(data?.status){
				setCurrentUser(data?.user);
			}else{
				alert("Cant update the course progress! Please report this if the issue persists.");
			}
		}
	} 
				

	function unlockContent(courseData) {
	  const firstQuizIndex = courseData.content.findIndex(item => item.quiz === true);

	  let secondQuizIndex = courseData.content.findIndex((item, index) => index > firstQuizIndex && item.quiz === true && item.locked === true);
	  if(secondQuizIndex < 0) {
	  	secondQuizIndex = courseData?.content?.length;
	  }
	  const updatedContent = courseData.content.map((item, index) => {
	    if (index >= firstQuizIndex && index <= secondQuizIndex) {
	      return { ...item, locked: false };
	    }
	    return item;
	  });
	  console.log(updatedContent,firstQuizIndex,secondQuizIndex)

	  const updatedCourseData = { ...courseData, content: updatedContent };
	  updatedCourseDataToUserData(updatedCourseData);
	  checkForCompletion(updatedCourseData);
	  return updatedCourseData;
	}

	const completetedTheQuiz = () => {
		if(!currentPlayingVideo?.completed){
			const data = {
				...currentPlayingVideo,
				completed:true
			}
			const idx = currentCourse.content.findIndex(course=>{
				if(course.title === currentPlayingVideo?.title){
					return true
				}
				return false
			})
			if(idx > -1){
				let courseContents = [...currentCourse.content];
				courseContents.splice(idx,1,data);
				const updateCurrentCourse = {
					...currentCourse,
					content:courseContents
				}
				const courseData = unlockContent(updateCurrentCourse);
				checkForCompletion(updateCurrentCourse);
				setCurrentCourse(courseData);
			}
		}
	}

	const onVideo80PercentWatched = () => {
		// console.log("i ran")
		if(!currentPlayingVideo?.completed){
			const data = {
				...currentPlayingVideo,
				completed:true
			}
			const idx = currentCourse.content.findIndex(course=>{
				if(course.title === currentPlayingVideo?.title){
					return true
				}
				return false
			})
			if(idx > -1){
				let courseContents = [...currentCourse.content];
				courseContents.splice(idx,1,data);
				const updateCurrentCourse = {
					...currentCourse,
					content:courseContents
				}
				setCurrentCourse(updateCurrentCourse);
				updatedCourseDataToUserData(updateCurrentCourse);
			}
		}
	}

	function checkVideoProgress(e) {
		if(!thisVideoCompleted){
		    const currentTime = e.playedSeconds;
		    if(backgroundVideoRef.current){
		    	backgroundVideoRef.current.seekTo(currentTime)
		    }
		    const percentageWatched = Math.ceil(e.played * 100);

		    // console.log(percentageWatched)
		    if (percentageWatched >= 80) {
		      setThisVideoCompleted(true);
		      onVideo80PercentWatched();
		    }	
		}
	}

	const startCheck = () => {
		const video = document.getElementById('video');
		// video.addEventListener('timeupdate', checkVideoProgress);
	}

	const nextVideo = () => {
		const idx = currentCourse?.content?.findIndex(course=>{
			if(course.title === currentPlayingVideo.title){
				return true
			}
			return false
		})
		if(idx > -1){
			if(!currentCourse?.content[idx + 1].locked){
				setCurrentPlayingVideo(currentCourse?.content[idx + 1]);
			}
		}
	}

	const selectThisOption = (question,option) => {
		let questionsData = [...currentPlayingVideo?.questions];
		const idx = questionsData.findIndex(quest=>{
			if(quest?.questionId === question?.questionId){
				return true
			}
			return false
		})
		if(idx > -1){
			let questionData = questionsData[idx];
			let updateQuestionData = {
				...questionData,
				selected:option
			}
			questionsData.splice(idx,1,updateQuestionData);
			let tempData = {
				...currentPlayingVideo,
				questions:questionsData	
			}
			setCurrentPlayingVideo(tempData);
		}
	}

	const verifyQuiz = async() => {
		setQuizVerifyLoading(true);
		const {data} = await axios.post(verifyQuizRoute,{quiz:currentPlayingVideo});
		if(data?.status){
			if(data?.quiz?.everythingCorrect){
				completetedTheQuiz();
			}
			setCurrentPlayingVideo(data?.quiz);
			setQuizVerifyLoading(false);
		}else{
			setQuizVerifyLoading(false);
		}
	}

	useEffect(()=>{
		if(currentPlayingVideo){
			setCheckingStarted(false);
			setThisVideoCompleted(false);
		}
	},[currentPlayingVideo])

	return (
		<main className="lg:w-[65%] w-full flex z-10 flex-col py-5 overflow-y-auto h-full scrollbar-none">
			<div className={`fixed inset-0 ${showCourseCompleted ? 'h-full w-full' : 'h-0 w-0'} 
			bg-black/30 flex items-center justify-center overflow-hidden transition-all
			duration-200 ease-in-out`}>
				<CourseCompletionCard showCourseCompleted={showCourseCompleted} setShowCourseCompleted={setShowCourseCompleted} />
			</div>
			<div className={`fixed right-0 ${openNotesAddTab ? 'bottom-0' : '-bottom-[100%]'} flex rounded-t-lg 
			border-[1.3px] border-b-0 border-gray-400 transition-all backdrop-blur-xl bg-black/60 duration-200 ease-in-out overflow-hidden flex-col`}>
				<div className="p-2 px-3 pr-4 flex items-center bg-black justify-between gap-10">
					<div className="flex items-center gap-2">
						<div 
						onClick={()=>setOpenNotesAddTab(false)}
						className="p-1 hover:bg-gray-500/50 transition-all cursor-pointer rounded-full duration-200 ease-in-out">
							<RxCross2 className="text-gray-200 h-4 w-4"/>
						</div>
						<h1 className="text-white font-semibold text-md">Add notes</h1>
					</div>
					<button 
					onClick={()=>{
						alert("Notes feature is not currently implemented!")
					}}
					className={`bg-white hover:scale-[105%] transition-all duration-200 ease-in-out text-sm 
					rounded-lg text-black px-3 py-1`}>
						Confirm
					</button>
				</div>
				<form className="flex flex-col p-2 px-3 gap-2 mt-1">
					<h1 className="text-md font-normal text-gray-100">Timestamp :-</h1>
					<div className="w-full border-[1px] border-gray-400 focus-within:border-sky-500 rounded-lg">
						<input type="text" className="w-full p-2 resize-none text-sm text-gray-100 bg-transparent outline-none"
						placeholder="-None-" value={duration} onChange={(e)=>setDuration(e.target.value)}
						/>
					</div>
					<h1 className="text-md mt-1 font-normal text-gray-100">Note :-</h1>
					<div className="p-2 w-full border-[1px] border-gray-400 focus-within:border-sky-500 rounded-lg">
						<textarea type="text" className="w-full h-[150px] resize-none text-sm text-gray-100 bg-transparent outline-none"
						placeholder="-None-" value={description} onChange={(e)=>setDescription(e.target.value)}
						/>
					</div>
				</form>


			</div>
			<div className="w-full lg:hidden block px-3">
				<button 
				onClick={()=>{setOpenSideBar(true)}}
				className="p-1 rounded-md hover:bg-gray-700/50">
					<FiMenu className="h-5 w-5 text-gray-200"/>
				</button>
			</div>
			{
				currentPlayingVideo?.quiz ? 
				''
				:
				<div className="w-full md:p-5 p-2 md:pt-0 pt-2 pb-2">
					<div className="rounded-md relative shadow-white/40 aspect-[16/9] border-1 border-white">
						<ReactPlayer
					        url={currentPlayingVideo?.video}
					        onError={(error) => console.error('Error loading video:', error)}
					        id="background-video"
					        width="100%"
					        height="100%" muted
					        ref={backgroundVideoRef}
					        className="z-0 absolute z-0 top-0 left-0 blur-lg"
					      />
						<ReactPlayer
				        url={currentPlayingVideo?.video}
				        ref={videoRef}
				        onPlay={handlePlay}
				        onPause={handlePause}
				        onProgress={checkVideoProgress}
				        id="video"
				        onError={(error) => console.error('Error loading video:', error)}
				        controls className="relative z-1"
				        width="100%"
				        height="100%"
				      />
						
						
					</div>
				</div>	
			}

			<div className="w-full flex flex-col gap-3 mt-2 md:px-6 px-3">
				<h1 className="text-xl font-semibold text-white">{currentPlayingVideo?.title}</h1>
				{
					currentPlayingVideo?.quiz ?
					<>
					<div className="flex flex-col gap-2 pt-3 mt-1 border-t-[1px] border-gray-700">
						<h1 className="text-lg text-gray-200 leading-none">Answer the questions :-</h1>
					</div>
					<div className="w-full flex flex-col gap-5 p-5 pt-0 pb-2">
						{
							currentPlayingVideo?.questions?.map((question,j)=>(
								<div className="flex flex-col gap-4 w-full" key={j}>
									<h1 className="text-gray-200 font-semibold flex items-center gap-2">{j+1}) {question?.question} {
										question?.wrong !== undefined ?
										(
										question?.wrong ? 
										<RxCross2 className="h-6 w-6 text-red-500"/>
										:
										<TiTick className="h-6 w-6 text-green-500"/>
										)
										:
										''
									} </h1>
									<div className="flex flex-col gap-3">
										{
											question.options.map((option,k)=>(
												<OptionComponent selectThisOption={selectThisOption} question={question} option={option} k={k} key={k} />
											))
										}
									</div>
								</div>
							))
						}
					</div>
					</>
					:
					<div className="w-full flex items-center gap-2">
						{
							tabs?.map((tab,j)=>(
								<div key={j}
								onClick={()=>setCurrentTab(tab)}
								className={`flex-col rounded-md overflow-hidden ${tab === 'Contents' ? 'lg:hidden flex' : 'flex'}
								hover:bg-gray-700/50 transition-all duration-200 ease-in-out cursor-pointer`}>
									<h1 className="px-3 py-2 text-gray-100 text-sm">{tab}</h1>
									
									<div className={`w-full h-[2px] ${currentTab === tab ? 'bg-purple-500' : 'bg-transparent'} `}/>
								</div>
							))
						}
					</div>

				}
				{
					currentPlayingVideo?.quiz ?  
					''
					:
					currentTab === 'Details' ?
					<div className="flex flex-col gap-2 pt-3 mt-1 border-t-[1px] border-gray-700">
						<h1 className="text-lg text-gray-200 leading-none">Description :-</h1>
						<p className="text-sm mt-1  font-normal text-gray-300">{currentPlayingVideo?.description}</p>
						<div className="mt-5 lg:hidden block flex flex-col">
							<h1 className="text-lg text-gray-200 leading-none">Course Info :-</h1>
							<h1 className='text-lg mt-3 font-semibold text-gray-100'>{currentCourse?.title}</h1>
							<p className="text-sm font-normal mt-2 text-gray-300">{currentCourse?.description}</p>
						</div>
					</div>
					:
					currentTab === 'Notes' ?
					<div className="flex flex-col gap-3 pt-3 mt-1 border-t-[1px] border-gray-700">
						<h1 className="text-lg text-gray-200 leading-none">Notes :-</h1>
						<div className="px-3 py-2 rounded-lg border-[1px] flex items-start gap-2 bg-black flex-wrap border-gray-700">
							<div onClick={()=>{
								setOpenNotesAddTab(true);
								const time = document.getElementById('video').currentTime;
								setDuration(Math.trunc(time))
							}} 
							className={`p-2 hover:bg-gray-800 cursor-pointer rounded-full flex items-center ${currentPlayingVideo ? 'block' : 'hidden'} justify-center`}>
								<AiOutlinePlusCircle className="h-5 w-5 text-gray-400"/>
							</div>
						</div>	
					</div>
					:
					currentTab === 'Contents' ?
					<>
						
						<div className="flex flex-col px-2 py-3 gap-4 border-t-[1px] border-gray-600 mt-4 py-4">
						{
							currentCourse?.content?.map((course,j)=>(
								<div key={j}
								onClick={()=>{
									if(!course.locked){
										setCurrentPlayingVideo(course);
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
					</>
					:
					''
				}
			</div>


			{
				currentPlayingVideo?.quiz ? 
				<div className="w-full flex mt-2 items-center md:px-8 px-3 py-2 justify-end gap-4 flex-wrap">
					{
						quizVerifyLoading && 
						<div class="loader-quiz">
						  <div class="box-load1"></div>
						  <div class="box-load2"></div>
						  <div class="box-load3"></div>
						</div>
					}
					<button onClick={()=>{
						if(currentPlayingVideo?.everythingCorrect) {
							nextVideo();
						}else{
							verifyQuiz();
						}
					}} 
					className="transition-all duration-200 ease-in-out
					bg-gradient-to-r hover:scale-[105%] px-4 py-2 font-semibold rounded-lg from-pink-500 to-purple-500 text-white">
						{
							currentPlayingVideo?.everythingCorrect ? 
							'Next >>'
							:
							quizVerifyLoading ?
							'Please wait...'
							:
							'Check the answer'
						}
					</button>
				</div>
				:
				<div className="w-full flex mt-2 items-center px-5 py-2 justify-end gap-2">
					<button 
					onClick={()=>nextVideo()}
					className="transition-all duration-200 ease-in-out
					bg-gradient-to-r hover:scale-[105%] px-4 py-2 font-semibold rounded-lg from-pink-500 to-purple-500 text-white">
						Next &gt;&gt;
					</button>
				</div>
			}

			<div className="w-full mt-5 px-5 pb-5">
				{
					currentPlayingVideo?.quiz &&
					<>
						<div className="w-full md:hidden flex items-center border-b-[1px] text-gray-200 justify-between px-5 py-2 border-gray-600">
							Contents <div 
							onClick={()=>setShowContentsMobile(!showContentsMobile)}
							className="rounded-full p-[2px] bg-gray-700 cursor-pointer 
							hover:bg-gray-800 text-white">
								<MdKeyboardArrowDown className={`h-5 w-5 ${showContentsMobile ? 'rotate-180' : 'rotate-0'} transition-all 
								duration-200 ease-in-out`}/>
							</div>
						</div>
						<div className={`md:hidden flex flex-col ${showContentsMobile ? 'h-auto px-2 gap-4 py-4' : 'h-[0px] px-0 gap-0 py-0'} 
						transition-all duration-200 ease-in-out overflow-hidden`}>
						{
							currentCourse?.content?.map((course,j)=>(
								<div 
								onClick={()=>{
									if(!course.locked){
										setCurrentPlayingVideo(course);
									}
								}} key={j}
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
						</>
				}
			</div>

		</main>
	)
}