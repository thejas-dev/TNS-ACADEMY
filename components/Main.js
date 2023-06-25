import Header2 from './Header2';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useState,useEffect} from 'react';
import {AiOutlineCalendar,AiOutlineFundProjectionScreen} from 'react-icons/ai';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {useRecoilState} from 'recoil'
import {currentWorkshopState} from '../atoms/userAtom';
import {MdVideoSettings} from 'react-icons/md';
import {IoMdTime} from 'react-icons/io';
import {getAllWorkshops,createWorkshop} from '../utils/ApiRoutes';
import Join from './Join.tsx';
import axios from 'axios';
import timediff from 'timediff';
import DateDiff from 'date-diff';
import {BsChevronDown} from 'react-icons/bs';

export default function Main() {
	
	const [workshops,setWorkshops] = useState([]);
	const router = useRouter();
	const [currentWorkshop,setCurrentWorkshop] = useRecoilState(currentWorkshopState);
	const [alertWorkshop,setAlertWorkshop] = useState('');
	const data = [{
		image:"https://ik.imagekit.io/d3kzbpbila/webdev_Z0TfmeIWE.png?updatedAt=1687367732190",
		title:'Kickstart Web Dev',
		description:'Gain knowledge about how websites work and the basics of HTML & CSS.',
		startsAt:'24-6-23 (Saturday)',
		duration:'2 Days'
	}]

	useEffect(()=>{
		getWorkshops()
		// createWorkshopFunction()
		// setTimeout(()=>{
		// 	document.getElementById('about').scrollIntoView({
		// 		behavior:"smooth",
		// 		block:"start",
		// 	})
		// },3000)
	},[])

	const createWorkshopFunction = async() => {
		let image = "https://ik.imagekit.io/d3kzbpbila/webdev_Z0TfmeIWE.png?updatedAt=1687367732190"
		let title = 'Kickstart Web Dev'
		let description = 'Gain knowledge about how websites work and the basics of HTML & CSS.'
		let startsAt = '24-6-23 (Saturday)'
		let duration = '2 Days'
		const {data} = await axios.post(createWorkshop,{
			title,description,image,startsAt,duration
		})
		// console.log(data);
	}

	const getWorkshops = async() => {
		const {data} = await axios.get(getAllWorkshops);
		//console.log(data);
		setWorkshops(data.data);
		setAlertWorkshop(data.data[0]);
	}

	const data2 = [{
		image:'./html.png',
		title:'Deep HTML',
		description:'Learn the basic and advance level of HTML and Kickstart your Journey in web development ',
		locked:true,
		videos:'10 Videos',
		projects:'2 Projects'
	},{
		image:'./css.png',
		title:'Dive into CSS',
		description:'Basic and Advance level of CSS,',
		locked:true,
		videos:'25 Videos',
		projects:'3 Projects'
	},{
		image:'./python.png',
		title:'Python Basic and Intermediate',
		description:'Learn the basics of python using real life examples and get a good understanding how an compiler and interpreter works',
		locked:true,
		videos:'20 Videos',
		projects:'5 Projects'
	},
	];
	

	return (
		<main className="flex min-h-screen flex-col items-center justify-between scroll-smooth">
			<Header2 hide='true'/>
			<div 
			id="home"
			className="relative">
				<div className="absolute h-full z-20 flex items-center justify-center  w-full ">
					<p className="md:text-5xl underline text-xl select-none text-center z-30 text-white font-anurati">Practice is the key to Success</p>
				</div>
				<div className="h-full w-full absolute top-0 bg-black/40"/>
				<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_14uHTfu_6"
				className="w-full aspect-video z-0 md:h-full " alt="a picture"
				/>
			</div>
			<div 
			id="about"
			className="max-w-6xl mx-auto md:py-[100px] py-[60px]  text-center">
				<h1 className="lg:text-6xl md:text-4xl text-2xl font-semibold text-black">Empower Your Digital Journey</h1>
				<p className="lg:text-2xl md:text-xl text-lg md:mt-7 mt-5 text-gray-500">Elevate. Innovate. Create.</p>
				<div className="flex md:flex-row flex-col-reverse gap-5 mt-12">
					<div className="px-5 md:px-2 text-start mt-6 md:mt-0 w-full md:w-[60%]">
						<h1 className="text-xl font-semibold text-gray-800">
							Welcome to TNS academy, your virtual hub for comprehensive web development and programming education. 
							We offer an immersive learning experience through engaging video tutorials and interactive workshops. 
							Whether you are a beginner taking your first steps or an experienced developer seeking to level up your skills, 
							we will guide you in honing your skills to create stunning websites, robust applications, and groundbreaking solutions. Join our thriving community of 
							learners and unlock your potential in the world of digital innovation. Get started today and embark on 
							a path to success in the exciting realm of web development and programming.
						</h1>
					</div>
					<div className="w-full md:w-[40%] px-5">
						<img src="https://ik.imagekit.io/d3kzbpbila/thejashari_W3efBZngA" 
						className="w-full rounded-xl shadow-xl" alt=""/>
					</div>
				</div>					
			</div>
			<div 
			id="workshops"
			className="mt-10 max-w-6xl mx-auto flex flex-col">
				<h1 className="text-gray-800 mx-auto lg:text-5xl md:text-3xl text-2xl underline font-semibold">Workshops</h1>
				<p className="text-gray-600 mx-auto font-semibold mt-4 text-xl">Every weekend workshops will be conducted</p>
				<div className="w-full grid grid-cols-1 mt-7 md:grid-cols-3 gap-5 px-3">
					{
						workshops.map((dat,l)=>(
							<div key={l}
							onClick={()=>{
								setCurrentWorkshop(dat);
								router.push('/workshops')
							}}
							className="rounded-xl flex cursor-pointer hover:scale-95 transition-all duration-200 ease-in-out
							flex-col shadow-xl border-[1px] border-gray-700/40 overflow-hidden pb-3">
								<img src={dat.image} alt="" className="w-full"/>
								<div className="px-3 py-2">
									<h1 className="text-2xl font-semibold text-black">{dat.title}</h1>
									<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><AiOutlineCalendar className="h-5 w-5"/>{dat.startsAt}</h1>
									<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><IoMdTime className="h-5 w-5 text-gray-600"/>{dat.duration}</h1>
									<p className="text-md mt-3 font-semibold text-gray-700">{dat.description}</p>
									<div className="flex items-center justify-between mt-5">
										<div className="w-full">

										</div>
										<button className="text-sky-500 text-lg flex whitespace-nowrap">Join  &gt;&gt;</button>
									</div>
								</div>
							</div>	

						))
					}

				</div>

			</div>
			<div 
			id="courses"
			className="mt-[100px] max-w-6xl mx-auto flex flex-col">
				<h1 className="text-gray-800 mx-auto lg:text-5xl md:text-3xl text-3xl underline font-semibold">Courses</h1>
				<div className="w-full grid grid-cols-1 mt-8 md:grid-cols-3 gap-5 px-3">
					{
						data2.map((dat,j)=>(
							<div key={j} className={`relative rounded-xl flex cursor-pointer ${dat.locked ? 'hover:scale-95':'' }  transition-all duration-100 ease-in-out
							 flex-col shadow-xl border-[1px] border-gray-700/40 overflow-hidden pb-3`}>
								<div className={`absolute h-full w-full bg-white/80 ${dat.locked ? 'flex' : 'hidden'} items-center justify-center`}>
									<HiOutlineLockClosed className="h-7 w-7 text-gray-700 "/>
								</div>
								<img src={dat.image} alt="" className="w-full aspect-video"/>
								<div className="px-3 py-2">
									<h1 className="text-2xl font-semibold text-black">{dat.title}</h1>
									<div className="flex gap-2">
										<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><MdVideoSettings className="h-5 w-5"/>{dat.videos}</h1>
										<h1 className="text-md items-center flex gap-2 text-gray-600 mt-2 font-semibold"><AiOutlineFundProjectionScreen className="h-5 w-5"/>{dat.projects}</h1>
									</div>
									<p className="text-md mt-3 font-semibold text-gray-700">{dat.description}</p>
									<div className="flex items-center justify-between mt-5">
										<div className="w-full">

										</div>
										<button className="text-sky-500 text-lg flex whitespace-nowrap">Enroll  &gt;&gt;</button>
									</div>
								</div>
							</div>	

						))
					}

				</div>
			</div>
			<section className="" id="contact">
				<Join/>
			</section>
			<div className={`fixed z-50 ${alertWorkshop ? 'bottom-0' : '-bottom-[100px]' } rounded-t-xl left-1/2 right-0 -translate-x-1/2 mx-auto
			border-[1px] border-gray-500/30 flex flex-col z-0 md:w-[50%] w-[90%] py-2 px-5 bg-red-500 transition-all duration-300 ease-in-out`}>
				<div className="flex items-center gap-2 justify-between relative">
					<div 
					onClick={()=>{
						setAlertWorkshop('');
					}}
					className="cursor-pointer absolute right-2 z-10 -top-9 bg-red-500 px-3 rounded-t-xl">
						<BsChevronDown className="text-white h-7 w-7"/>
					</div>
					<h1 className="text-white md:text-xl font-semibold text-md">Workshop Alert : {alertWorkshop?.title} <span className='animate-pulse'>({alertWorkshop?.startsAt?.split('(')[0]})</span> </h1>
					<button onClick={()=>{
						setCurrentWorkshop(alertWorkshop);
						router.push('/workshops')
					}} 
					className="px-7 md:px-10 text-white bg-gradient-to-r from-black/70 to-black text-white py-2 rounded-xl border-[1px] 
					border-purple-700/50 shadow-lg shadow-purple-500/30 hover:scale-110 transition-all ease-in-out 
					duration-100 text-md font-semibold">
						Join
					</button>
				</div>
			</div>
		</main>

	)
}
