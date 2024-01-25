import timediff from 'timediff';
import Header2 from './Header2';
import {useEffect,useState} from 'react';
import DateDiff from 'date-diff';
import {IoMdTime} from 'react-icons/io';
import {AiOutlineInstagram,AiOutlineCalendar} from 'react-icons/ai';
import {currentWorkshopState,currentUserState} from '../atoms/userAtom';
import {useRecoilState} from 'recoil';
import {useRouter} from 'next/navigation';
import axios from 'axios';
import {updateWorkshop,updateRegisteredWorkshops} from '../utils/ApiRoutes';
import {TiTick} from 'react-icons/ti';
import {SiGooglemeet} from 'react-icons/si';
import {FcGoogle} from 'react-icons/fc';
import {BsFillShareFill} from 'react-icons/bs';
import {MdOutlineLanguage} from 'react-icons/md';
import {TbCertificate} from 'react-icons/tb';

export default function WorkshopComponent() {
	const [remainingTime,setRemainingTime] = useState('');
	const [startTimer,setStartTimer] = useState(false);
	const [joined,setJoined] = useState(true);
	const [currentWorkshop,setCurrentWorkshop] = useRecoilState(currentWorkshopState);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const router = useRouter();
	const [successMessage,setSuccessMessage] = useState(false);
	const [certificate,setCertificate] = useState('');

	const joinThisWorkshop = async() => {
		if(!joined && currentWorkshop && currentUser){
			setJoined(true);
			let user = {
				name:currentUser?.name,
				image:currentUser?.image,
				email:currentUser?.email,
				id:currentUser?._id
			}
			let newRegisteredParticipants = [user,...currentWorkshop?.registeredParticipants];			
			const {data} = await axios.post(`${updateWorkshop}/${currentWorkshop?._id}`,{
				registeredParticipants:newRegisteredParticipants
			})
			setCurrentWorkshop(data?.obj);
			
			let newRegisteredWorkshops = [currentWorkshop._id,...currentUser.registeredWorkshops];
			const data2 = await axios.post(`${updateRegisteredWorkshops}/${currentUser?._id}`,{
				registeredWorkshops:newRegisteredWorkshops,
				email:currentUser?.email,
				currentWorkshop
			})
			setCurrentUser(data2?.data?.obj);
			
			showSuccesfullyRegisteredMessage();
		}else if(!currentWorkshop || !currentUser){
			router.push('/')
		}
	}

	

	useEffect(()=>{
		if(currentWorkshop && currentUser){
			if(!currentUser?.registeredWorkshops?.includes(currentWorkshop?._id)){
				setJoined(false);
			}
		}
	},[currentUser])

			
	useEffect(()=>{
		if(currentWorkshop){
			try{
				if(currentUser?.certificates[currentWorkshop._id]){
					let cer = currentUser?.certificates[currentWorkshop._id];
					setCertificate(cer)
				}
			}catch(err){

			}
		}
	},[currentWorkshop])


	const showSuccesfullyRegisteredMessage = async() => {
		setSuccessMessage(true);
		setTimeout(()=>{
			setSuccessMessage(false);
		},5000)
	}

	useEffect(()=>{
		if(currentWorkshop){
			checkTime();
		}
	},[])

	const checkTime = () => {
		const date1 = new Date();
		const temp = currentWorkshop?.startsAt?.split('(')[0]?.split(' ')[0]?.split('-')?.reverse();
		temp[0] = '20'+temp[0];
		const currentdate = new Date(temp?.join('-'))
		const date2 = new Date(currentdate?.getTime() + 15 * 60 * 60 * 1000);

		var diff = new DateDiff(date2, date1);
		if(diff?.minutes() < 1 ){
			setRemainingTime('Closed')
		}else{
			setRemainingTime(timediff(date1,date2));
			setStartTimer(true)
		}
	}	

	useEffect(()=>{
		if(startTimer){
			setInterval(()=>{checkTime()},1000)
		}
	},[startTimer])



	return (
		<main className="min-h-screen">
			<div 
			onClick={()=>{
				setSuccessMessage(false)
			}}
			className={`fixed cursor-pointer ${successMessage ? 'bottom-5' : '-bottom-14'} right-5
			mx-auto flex items-center bg-green-600 rounded-xl border-[1px] border-green-300/50 transition-all 
			duration-200 ease-in-out py-2 md:px-5 px-4 gap-2`}>
				<h1 className="md:text-xl text-lg font-semibold text-white">
					Successfully Registered
				</h1>
				<TiTick className="h-5 w-5 text-white"/>
			</div>
			<Header2 hide='true' fixed='true' />
			<div className="relative flex md:flex-row flex-col-reverse md:mx-auto pt-12 xl:pb-7 lg:pb-10 md:pb-14 pb-[60px]  max-w-6xl md:bg-gradient-to-r bg-gradient-to-t from-purple-500/80 via-purple-500/80 to-red-500/50 rounded-b-2xl
			 shadow-xl shadow-purple-500/70 border-[1px] border-gray-300/60 items-center">
				<div className="md:w-[50%] w-full px-7 md:py-[70px] py-5">
					<h1 className="lg:text-4xl text-3xl font-semibold text-white md:text-start text-center">{currentWorkshop?.title}</h1>
					<p className="lg:text-lg text-md mt-3 text-gray-100 md:text-start text-center">{currentWorkshop?.description}</p>
				</div>
				<div className="md:w-[50%] w-full px-7 md:py-14 py-5 ">
					<img className="rounded-2xl hover:scale-105 transition-all duration-100 shadow-xl cursor-pointer ease-in-out" alt="" src={currentWorkshop?.image}/>
				</div>
				<div className={`${remainingTime ? 'absolute' : 'hidden'} -bottom-[60px]  md:w-[50%] w-[90%] rounded-2xl left-1/2 right-0 -translate-x-1/2 mx-auto bg-red-500 px-5 py-2 shadow-xl`}>
					<h1 className="text-lg text-white font-semibold">{
						remainingTime === 'Closed' ? 
						'Registration Closed'
						:
						'Registration Ends In:-'
					}</h1>
					<div className="flex mt-3 items-center w-full justify-between px-2">
						<div className="flex items-center flex-col gap-1">
							<h1 className="text-white text-xl font-bold">{
								remainingTime === 'Closed' ? 
								'0'
								:
								remainingTime?.days
							}</h1>
							<p className="text-gray-100 text-md">Days</p>
						</div>
						<div className="flex items-center flex-col gap-1">
							<h1 className="text-white text-xl font-bold">{
								remainingTime === 'Closed' ? 
								'0'
								:
								remainingTime?.hours
							}</h1>
							<p className="text-gray-100 text-md">Hours</p>
						</div>
						<div className="flex items-center flex-col gap-1">
							<h1 className="text-white text-xl font-bold">{
								remainingTime === 'Closed' ? 
								'0'
								:
								remainingTime?.minutes
							}</h1>
							<p className="text-gray-100 text-md">Minutes</p>
						</div>
						<div className="flex items-center flex-col gap-1">
							<h1 className="text-white text-xl font-bold">{
								remainingTime === 'Closed' ? 
								'0'
								:
								remainingTime?.seconds
							}</h1>
							<p className="text-gray-100 text-md">Seconds</p>
						</div>
					</div>
				</div>
			</div>
			<div className="mt-[90px] max-w-6xl w-full mx-auto lg:px-6 px-4 flex">
				<div className="flex gap-5 md:flex-row flex-col w-full">
					<div className=" flex flex-col gap-2">
						<div className="flex xl:gap-14 lg:gap-10 md:gap-7 gap-5 items-center">
							<h1 className="lg:text-4xl md:text-3xl sm:text-2xl text-xl text-gray-900 font-semibold">{currentWorkshop?.title} Workshop</h1>
							<button 
							onClick={joinThisWorkshop}
							className={`rounded-xl lg:px-14 px-7 lg:py-2 py-[5px] ${joined ? 'bg-gray-100 text-black' : 'bg-gradient-to-r from-black/70 to-black text-white'} md:text-xl text-lg font-semibold 
							border-[1px] border-sky-700/50 shadow-lg shadow-purple-500/30 hover:scale-110 
							transition-all ease-in-out duration-100 ${remainingTime === 'Closed' && 'hidden'}`}>
								{
									joined ? 
									'Joined'
									:
									'Join'
								}
							</button>
						</div>
						<div className="flex items-center md:gap-3 gap-2 flex-wrap">
							<p className="text-gray-600 text-md font-semibold flex items-center gap-1"><IoMdTime className="h-5 w-5 text-gray-600"/> {currentWorkshop?.duration}</p>
							<p className="text-gray-600 text-md font-semibold flex items-center gap-1"><AiOutlineCalendar className="h-5 w-5 text-gray-600"/> {currentWorkshop?.startsAt}</p>
							<p className="text-gray-600 text-md font-semibold flex items-center gap-1"><MdOutlineLanguage className="h-5 w-5 text-gray-600"/> {currentWorkshop?.language}</p>
						</div>
						{
							currentWorkshop?.registeredParticipants?.length>20 &&
							<div className="flex items-center gap-1 w-full">
								<h1 className="text-lg text-gray-600 flex w-full items-center gap-2">
									<div className="flex items-center">
									{
										currentWorkshop?.registeredParticipants?.map((reg,j)=>(
											<img src={reg.image} alt="" key={j} className={`h-5 w-5 ${j>2 && 'hidden'} rounded-full`}/>
										))
									}
									</div>
									{
										currentWorkshop?.registeredParticipants?.length>0 &&
										`${currentWorkshop?.registeredParticipants?.length}+ Peoples Enrolled`
									}
								</h1>
							</div>
						}
						<div className="flex flex-col gap-[6px] w-full">
							<div className="flex items-center">
								<p className="text-gray-600 text-md font-semibold flex items-center gap-2">
									<SiGooglemeet className="h-5 w-4 text-gray-600"/>  
									{
										joined && (4>5)  ? 
										<a href={currentWorkshop?.meetingLink}>{currentWorkshop?.meetingLink}</a>
										:
										'Workshop will be conduted on Google Meet'
									}
								</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 text-md flex md:items-center gap-2">
									<BsFillShareFill className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/>Meeting link will be shared to Mail inbox and 
									<span className="text-blue-500 hover:underline"><a href="https://chat.whatsapp.com/EbYs8s2Me0gKgaYxfykVZT">Whatsapp group</a></span>
								</p>
							</div>
							<div className="flex items-center gap-2">
								<p className="text-gray-600 text-md flex items-center gap-2">
									{
										joined ? 
										certificate ?
										<>
										<TbCertificate className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/><a href={certificate} className="text-sky-500" target="blank" download="true">Download certificate</a>
										</>
										:
										<>
										<TbCertificate className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/>Certificates will be provided
										</>
										:
										<>
										<TbCertificate className="h-5 w-5 md:mt-0 mt-2 text-gray-600"/>Certificates will be provided			
										</>
									}
								</p>
							</div>
						</div>
					</div>
					<div className={`grow md:mt-0 mt-5 ${currentWorkshop ? 'flex' : 'hidden'} justify-center h-full`} >
						<table className="table-fixed">
							<thead className="border-y-[1px] border-gray-400/40 cursor-pointer hover:bg-sky-200/30 transition-all duration-100 ease-in-out" >
								<tr>
									<td className="px-7 py-5" >Date</td>
									<td className="px-7 py-5">Timing</td>
								</tr>
							</thead>
							{
								currentWorkshop?.datesAndTimings?.map((dat,i)=>(
									<tbody key={i} className={`border-y-[1px] ${i%2 === 0 && 'bg-black/10' } border-gray-400/40 cursor-pointer hover:bg-sky-200/30 transition-all duration-100 ease-in-out`}>
										<tr>
											<td className="px-7 py-2" >{dat?.split('(')[0]}</td>
											<td className="px-7 py-2" >{dat?.split('(')[1]?.split(')')[0]?.split(':')[1]}</td>
										</tr>
									</tbody>
								))
							}
						</table>
					</div>
				</div>
			</div>
			<div className="mt-14 lg:max-w-6xl w-full mx-auto lg:px-6 px-4">
				<h1 className="xl:text-4xl underline lg:text-3xl text-center mb-8 md:text-3xl text-3xl font-semibold text-black">Topics To Be Covered</h1>
				{
					currentWorkshop?.learn?.map((ln,j)=>(
						<div key={j} className={`w-full text-start ${j>0 ? 'mt-7' : 'mt-10'} `}>
							<h1 className="lg:text-2xl text-xl font-semibold text-black	">Day {j+1} ({ln?.date}) :-</h1>
							<p className="text-gray-600 text-md font-semibold flex mt-2 mb-2
							items-center gap-1"><IoMdTime className="h-5 w-5 text-gray-600"/> {ln?.time}</p>
							{
								ln?.sessions?.map((sess,i)=>(
								<div key={i} className="py-3 flex flex-col gap-[6px]">
									<h1 className=' md:text-xl text-lg text-gray-950 '>{sess?.sessionNumber}. {sess?.title} ({sess?.duration})</h1>
									{
										sess?.topics?.map((top,k)=>(
											<div key={k} className="py-3 pl-3 flex gap-[4px]">
												<h1 className="md:text-lg text-md text-gray-800">- </h1>
												<h1 className=' md:text-lg text-md text-gray-800 '>{top}</h1>
											</div>
										))
									}
								</div>	
								))
							}
						</div>				
					))
				}
			</div>
			<div className="mt-12 lg:max-w-6xl w-full mx-auto lg:px-6 px-4">
				<h1 className="xl:text-4xl lg:text-3xl text-center mb-8 md:text-3xl text-3xl underline font-semibold text-black">Instructions</h1>
				<div className="w-full text-start ">
					<h1 className="xl:text-2xl lg:text-xl text-lg font-semibold text-black	">Requirements :-</h1>
					<div className="pl-3 py-3 flex flex-col gap-[6px]">
						{currentWorkshop?.requirements?.map((req,j)=>(
							<h1 key={j} className=' xl:text-lg md:text-md text-gray-700 '>- {req}</h1>
						))}
					</div>	
				</div>				
			</div>
			<div className="mt-12 lg:max-w-6xl w-full mx-auto lg:px-6 px-4 flex justify-center mb-8 items-center">
				<a href={currentWorkshop?.workshopByInsta}><h1 className="text-gray-700 hover:underline flex gap-1 hover:text-sky-500 transition-all duration-100 ease-in
				font-semibold text-md">Workshop By {currentWorkshop?.workshopBy} <AiOutlineInstagram className="h-6 hover:text-sky-500 transition-all duration-100 ease-in
				w-6 text-gray-700"/> </h1></a>
			</div>
		</main>

	)
}

