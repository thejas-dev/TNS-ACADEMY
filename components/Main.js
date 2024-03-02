import Header2 from './Header2';
import {motion} from 'framer-motion';
import Image from 'next/image';
import {useState,useEffect} from 'react';
import {AiOutlineCalendar,AiOutlineFundProjectionScreen} from 'react-icons/ai';
import {HiOutlineLockClosed} from 'react-icons/hi';
import {useRouter} from 'next/navigation';
import {useRecoilState} from 'recoil'
import {currentWorkshopState,currentUserState} from '../atoms/userAtom';
import {MdVideoSettings} from 'react-icons/md';
import {IoMdTime} from 'react-icons/io';
import {getAllWorkshops,createWorkshop,createCourse,getAllCourses} from '../utils/ApiRoutes';
import Join from './Join.tsx';
import axios from 'axios';
import timediff from 'timediff';
import DateDiff from 'date-diff';
import {BsChevronDown} from 'react-icons/bs';
import WorkshopCard from './WorkshopCard';
import CourseCard from './CourseCard';

export default function Main() {
	
	const [workshops,setWorkshops] = useState([]);
	const router = useRouter();
	const [currentWorkshop,setCurrentWorkshop] = useRecoilState(currentWorkshopState);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [alertWorkshop,setAlertWorkshop] = useState('');
	const [data2,setData2] = useState([]);
	const data = [{
		image:"https://ik.imagekit.io/d3kzbpbila/webdev_Z0TfmeIWE.png?updatedAt=1687367732190",
		title:'Kickstart Web Dev',
		description:'Gain knowledge about how websites work and the basics of HTML & CSS.',
		startsAt:'24-6-23 (Saturday)',
		duration:'2 Days'
	}]

	useEffect(()=>{
		getWorkshops();
		getAllCoursesFunc();
		// createWorkshopFunction()
		// setTimeout(()=>{
		// 	document.getElementById('about').scrollIntoView({
		// 		behavior:"smooth",
		// 		block:"start",
		// 	})
		// },3000)
		// createCourseFunction();
	},[])

	const createCourseFunction = async() => {
		
		const title = 'Complete CSS Course'
		const description = 'This course covers the fundamentals, advanced techniques, and the mastery needed to create visually captivating and dynamic websites. Enhance your web development abilities and transform your creative visions into reality with the transformative power of CSS.';
		const image = '/css.jpg';
		const courseId = '110110'; 
		const locked = false;
		const videos = '67'
		const projects = '8';
		const duration = '12 Hours';
		const reqiurements = [
			'Having a basic HTML knowledge is recommended.',
		]

		const {data} = await axios.post(createCourse,{
			key:'DWjO8xwOjufFQsx7vUI7Mw==',title,content,description,image,
			courseId,locked,videos,projects,reqiurements,duration
		})
		console.log(data)
	}

	const createWorkshopFunction = async() => {
		let image = "https://ik.imagekit.io/d3kzbpbila/webdev_Z0TfmeIWE.png?updatedAt=1687367732190"
		let title = 'Kickstart Web Dev'
		let description = 'Gain knowledge about how websites work and the basics of HTML & CSS.'
		let startsAt = '24-6-23 (Saturday)'
		let duration = '2 Days'
		// const {data} = await axios.post(createWorkshop,{
		// 	title,description,image,startsAt,duration
		// })
		// console.log(data);
	}

	const getAllCoursesFunc = async() => {
		const {data} = await axios.get(getAllCourses);
		if(data.status){
			let tempData = [...data?.course,{
				image:'https://ik.imagekit.io/d3kzbpbila/python_vL9wnJgdah.jpg?updatedAt=1709396246168',
				courseId:102222,
				title:'Python Basic and Intermediate',
				description:'Learn the basics of python using real life examples and get a good understanding how an compiler and interpreter works',
				locked:true,
				videos:'20 Videos',
				projects:'5'
			},]
			setData2(tempData)
		}
	}

	const getWorkshops = async() => {
		const {data} = await axios.get(getAllWorkshops);
		//console.log(data);
		setWorkshops(data?.data?.reverse());
		const date1 = new Date();

		const temp = data?.data[0]?.startsAt?.split('(')[0]?.split(' ')[0]?.split('-')?.reverse();
		temp[0] = '20'+temp[0];
		const currentdate = new Date(temp?.join('-'))
		const date2 = new Date(currentdate?.getTime() + 15 * 60 * 60 * 1000);
		var diff = new DateDiff(date2, date1);
		if(diff?.minutes() < 1 ){

		}else{
			setAlertWorkshop(data?.data[0]);
		}
	}

	// const data2 = [{
	// 	image:'./html.png',
	// 	courseId:101001,
	// 	title:'Basics of Networking and HTML Beginner to Advanced Course',
	// 	description:'Learn web development fundamentals, covering frontend, backend, and database structures. Explore client-server dynamics, APIs, various IP types, DNS workings, and HTML essentials with an introduction to CSS for crafting interactive websites',
	// 	locked:false,
	// 	videos:'10 Videos',
	// 	projects:'2 Projects'
	// },
	// ];

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
				<div className="flex md:flex-row flex-col-reverse items-center gap-5 mt-12">
					<div className="px-5 md:px-2 text-start mt-6 md:mt-0 w-full md:w-[60%]">
						<h1 className="text-xl font-semibold text-gray-800">
							21st Skills is your online destination for learning various technologies. You will enjoy our fun and interactive video lessons, workshops and hands-on projects. No matter if you are a newbie or a pro, we will help you sharpen your skills to build amazing websites, apps, products, and more. Become part of our vibrant community of learners and express your creativity in the digital world. 
							Don't wait any longer and start your journey to success in the fascinating field of technology. <a href="#courses" className="text-sky-500 hover:underline" >Join our courses to start.</a>

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
			className="mt-10 max-w-6xl mx-auto flex flex-col px-3">
				<h1 className="text-gray-800 mx-auto lg:text-5xl md:text-3xl text-2xl underline font-semibold">Workshops</h1>
				<p className="text-gray-600 mx-auto font-semibold mt-4 text-xl">Every weekend workshops will be conducted</p>
				<div className="w-full grid grid-cols-1 mt-7 md:grid-cols-3 gap-5 ">
					{
						workshops.map((dat,l)=>(
							<WorkshopCard dat={dat} l={l} setCurrentWorkshop={setCurrentWorkshop}
							router={router} key={l}
							/>
						))
					}

				</div>

			</div>
			<div 
			id="courses"
			className="mt-[100px] max-w-6xl mx-auto flex flex-col px-3">
				<h1 className="text-gray-800 mx-auto lg:text-5xl md:text-3xl text-3xl underline font-semibold">Courses</h1>
				<div className="w-full grid grid-cols-1 mt-8 md:grid-cols-3 gap-5 ">
					{
						data2.map((dat,j)=>(
							<CourseCard dat={dat} j={j} currentUser={currentUser}
							router={router} key={j}
							/>
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
					<h1 className="text-white md:text-xl font-semibold text-md">Workshop Alert : {alertWorkshop?.title} <span className='animate-pulse'>({alertWorkshop?.startsAt?.split('(')[0].split(' ')[0]})</span> </h1>
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
