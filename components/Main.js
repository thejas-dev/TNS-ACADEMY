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
		const content = [
		  {
		    title: 'Course Introduction',
		    video:'/htmlcourse/intro.m3u8',
		    duration: '0:32',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: "Welcome to the course! In this introductory module, you'll get a glimpse of what's in store. We'll outline the course structure, set expectations, and highlight the outcomes you can anticipate upon completion.",
		  },
		  {
		    title: 'Expectations & Outcomes',
		    video:'/htmlcourse/CourseOutcomes&Scope.m3u8',
		    duration: '1:21',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: "Understand the goals of this course and what you'll gain by the end. We'll discuss the skills you'll acquire, the knowledge you'll gain, and how it will benefit you in the realm of web development and networking.",
		  },
		  {
		    title: 'Web Development & Scopes',
		    video:'/htmlcourse/WebDevelopment&Scopes.m3u8',
		    duration: '8:54',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: "Explore the vast landscape of web development careers. Learn about the diverse scopes and job opportunities available in the industry, providing you with insights to shape your career path.",
		  },
		  {
		    title: 'Frontend Backend Architecture',
		    video:'/htmlcourse/FrontendBackendArchitecture.m3u8',
		    duration: '7:36',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: 'Delve into the intricacies of frontend and backend architecture. Understand how these components work together to create seamless and responsive web applications, laying the foundation for your development journey.',
		  },
		  {

		    title: 'Database',
		    video:'/htmlcourse/database.m3u8',
		    duration: '1:07',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: 'Uncover the importance of databases in web development. Learn what are the types of database available and the free cloud services providing free database for developers.',
		  },
		  {
		    title: 'IP & Types',
		    video:'/htmlcourse/ip internal & external.m3u8',
		    duration: '9:35',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: 'Navigate the world of Internet Protocol (IP) addresses. Gain a comprehensive understanding of IP types and their significance in the networking landscape.',
		  },
		  {
		    title: 'IPv4 vs IPv6',
		    video:'/htmlcourse/ipv4 vs ipv6.m3u8',
		    duration: '7:12',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: "Compare IPv4 and IPv6, the two versions of the Internet Protocol. Understand the differences and advancements that IPv6 brings to address the limitations of IPv4.",
		  },
		  {
		    title: 'Static vs Dynamic IP',
		    video:'/htmlcourse/static_vs_dynamic_ip.m3u8',
		    duration: '7:36',
		    locked:false,
		    completed: false,
		    notes:[],
		    description: "Explore the distinction between static and dynamic IP addresses. Learn how each type is assigned and its impact on network configurations.",
		  },
		  {
		  	title: 'Quiz',
		  	quiz:true,
			locked:false,
		  	completed:false,
		  	questions:[
			  	{
			  		question:'What does "frontend" refer to in web development?',
			  		options:[
			  			'The part of a website users interact with',
			  			'The server-side logic of a website',
			  			'The database management system',
			  			'The network infrastructure'
			  		],
			  		questionId:100
			  	},
			  	{
			  		question:'What is the primary role of "backend" in web development?',
			  		options:[
			  			'Managing the user interface',
			  			'Handling server-side logic and databases',
			  			'Designing responsive layouts',
			  			'Implementing frontend styles'
			  		],
			  		questionId:101
			  	},
			  	{
			  		question:'What does "IP" stand for in networking?',
			  		options:[
			  			'Internet Provider',
			  			'Internet Protocol',
			  			'Information Processing',
			  			'Interface Port'
			  		],
			  		questionId:102
			  	},
			  	{
			  		question:' What is the total range of each octet in an IPv4 address?',
			  		options:[
			  			'0-100',
			  			'0-127',
			  			'0-255',
			  			'0-64'
			  		],
			  		questionId:103
			  	},
		  	]
		  },
		  {
		    title: 'DNS',
		    video:'/htmlcourse/dns.m3u8',
		    duration: '10:11',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Dive into the Domain Name System (DNS) and unravel the process of translating domain names to IP addresses. Explore the role DNS plays in making web browsing seamless.",
		  },
		  {
		    title: 'What is API?',
		    video:'/htmlcourse/api.m3u8',
		    duration: '3:12',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Application Programming Interfaces (APIs). Understand their significance in web development, facilitating communication between different software systems.",
		  },
		  {
		    title: 'What is HTML',
		    video:'/htmlcourse/what_is_html.m3u8',
		    duration: '2:11',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Begin your journey into the core of web development with HTML. Learn the basics of structuring web content and creating the foundation for interactive websites.",
		  },
		  {
		    title: 'HTML Page Structure',
		    video:'/htmlcourse/HTML_page_structure.m3u8',
		    duration: '3:33',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Master the art of organizing your web pages. Explore HTML tags that define the structure of a webpage, providing a solid foundation for your coding endeavors.",
		  },
		  {
		  "title": "Quiz",
		  "quiz": true,
		  "locked": true,
		  "completed": false,
		  "questions": [
		    {
		      "question": "What is the primary function of DNS in web development?",
		      "options": [
		        "To design responsive user interfaces",
		        "To translate domain names to IP addresses",
		        "To manage server-side logic",
		        "To encrypt website data"
		      ],
		      "questionId": 104
		    },
		    {
		      "question": "What does 'API' stand for in web development?",
		      "options": [
		        "Advanced Programming Interface",
		        "Application Programming Interface",
		        "Automated Processing Interface",
		        "Advanced Protocol Integration"
		      ],
		      "questionId": 105
		    },
		    {
		      "question": "What is the main markup language used for creating web pages??",
		      "options": [
		        "XML",
		        "XAMPP",
		        "HTML",
		        "CSS"
		      ],
		      "questionId": 106
		    },
		    {
		      "question": "What does 'HTML' stand for?",
		      "options": [
		        "Hyper Transfer Markup Language",
		        "High-Level Text Management Language",
		        "Hyperlink and Text Management Language",
		        "HyperText Markup Language",
		      ],
		      "questionId": 107
		    }
		  	]
			},
		  {
		    title: 'Text tags',
		    video:'/htmlcourse/text_tags.m3u8',
		    duration: '18:55',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Explore the world of text manipulation in HTML. Discover tags that enhance the presentation of textual content on your web pages.",
		  },
		  {
		    title: 'List tags',
		    video:'/htmlcourse/list_tags.m3u8',
		    duration: '5:29',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Explore HTML's list tags to efficiently structure information. Learn how to create ordered and unordered lists for better content organization.",
		  },
		  {
		    title: 'Anchor tag',
		    video:'/htmlcourse/Anchor_tag.m3u8',
		    duration: '7:53',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Unlock the power of hyperlinking with the anchor tag. Understand how to connect different pages and resources within your website.",
		  },
		  {
		    title: 'Image tag',
		    video:'/htmlcourse/image_tag.m3u8',
		    duration: '6:48',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Bring visual appeal to your web pages with the image tag. Learn how to integrate images seamlessly into your HTML content.",
		  },
		  {
		    title: 'Audio & video tag',
		    video:'/htmlcourse/audio_and_video_tag.m3u8',
		    duration: '7:56',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Elevate user engagement with multimedia elements. Explore the audio and video tags to incorporate media seamlessly into your web projects.",
		  },
		  {
		    title: 'iframe & embed tag',
		    video:'/htmlcourse/iframe_and_embed_tag.m3u8',
		    duration: '7:47',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Harness the capabilities of iframe and embed tags. Understand how these tags enable the integration of external content within your web pages.",
		  },
		  {
		    title: 'Div tag',
		    video:'/htmlcourse/div_tag.m3u8',
		    duration: '3:26',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Master the versatile div tag. Learn how it acts as a container, allowing you to structure and style your HTML content effectively.",
		  },
		  {
		    title: 'Input tags',
		    video:'/htmlcourse/input_tag.m3u8',
		    duration: '14:01',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Dive into user interaction with HTML input tags. Explore various input types and understand how they enable user data input.",
		  },
		  {
		    title: 'Button tag',
		    video:'/htmlcourse/button_tag.m3u8',
		    duration: '1:43',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Elevate user experience with interactive buttons. Learn the ins and outs of the button tag and its various applications.",
		  },
		  {
		    title: 'Form part 1',
		    video:'/htmlcourse/form_tag_1.m3u8',
		    duration: '9:09',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Embark on the journey of web forms. In part one, explore the essential elements that make up a form, setting the stage for user data collection.",
		  },
		  {
		    title: 'Form part 2',
		    video:'/htmlcourse/form_tag_2.m3u8',
		    duration: '8:00',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Delve deeper into the world of web forms. In part two, learn about form validation, submission methods, and enhance the functionality of your forms.",
		  },
		  {
		    title: 'Table tag',
		    video:'/htmlcourse/table_tag.m3u8',
		    duration: '4:42',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Uncover the power of HTML tables. Learn how to structure and display data in a tabular format for improved readability.",
		  },
		  {
		    title: 'Semantic HTML - 1',
		    video:'/htmlcourse/semantic_html_1.m3u8',
		    duration: '5:13',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Embrace semantic HTML for enhanced accessibility and SEO. In part one, understand how semantic tags contribute to the meaning and structure of your content.",
		  },
		  {
		    title: 'Semantic HTML - 2',
		    video:'/htmlcourse/semantic_html_2.m3u8',
		    duration: '2:13',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Continue your journey into semantic HTML. In part two, explore additional tags that enrich the semantics of your web pages.",
		  },
		  {
		    title: 'Web Crawler',
		    video:'/htmlcourse/web_crawler.m3u8',
		    duration: '3:40',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Understand how websites are ranked to top by web crawling. Understand the fundamentals of how search engines navigate and index content across the vast web.",
		  },
		  {
			  "title": "Quiz",
			  "quiz": true,
			  "locked": true,
			  "completed": false,
			  "questions": [
			    {
			      "question": "What is the purpose of 'Text tags' in HTML?",
			      "options": [
			        "To create lists of items",
			        "To structure webpage content",
			        "To manipulate text formatting",
			        "To embed multimedia elements"
			      ],
			      "questionId": 108
			    },
			    {
			      "question": "Which HTML tags are used for creating ordered and unordered lists?",
			      "options": [
			        "<ol> and <ul>",
			        "<ul> and <li>",
			        "<list> and <item>",
			        "<order> and <item>"
			      ],
			      "questionId": 109
			    },
			    {
			      "question": "What does the 'Anchor tag' (<a>) primarily facilitate in HTML?",
			      "options": [
			        "Embedding images",
			        "Creating hyperlinks",
			        "Styling webpage elements",
			        "Inserting audio content"
			      ],
			      "questionId": 110
			    },
			    {
			      "question": "What does the term 'Web Crawler' refer to in the context of HTML?",
			      "options": [
			        "A spider-like creature",
			        "A tool for organizing files",
			        "A script for automating tasks",
			        "A program for navigating and indexing web content"
			      ],
			      "questionId": 111
			    }
			  ]
			},
		  {
		    title: 'More HTML tags',
		    video:'/htmlcourse/more_html_tags.m3u8',
		    duration: '1:39',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Expand your HTML toolkit with additional tags. Discover tags that cater to specific needs, enhancing the richness of your web pages.",
		  },
		  {
		    title: 'Project 1 - 1',
		    video:'/htmlcourse/project_1_1.m3u8',
		    duration: '7:38',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Apply your newfound HTML skills in a practical project. In part one, embark on a hands-on project to where we build a small FAQ page by using semantic HTML tags and using font awesome icons.",
		  },
		  {
		    title: 'Project 1 - 2',
		    video:'/htmlcourse/project_1_2.m3u8',
		    duration: '8:47',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Continue your project journey in part two. Apply advanced HTML concepts and solidify your skills through a comprehensive project that showcases your abilities.",
		  },
		  {
		    title: 'Project 2',
		    video:'/htmlcourse/project_2.m3u8',
		    duration: '9:05',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Level up with an in-depth project. Demonstrate your proficiency in HTML as you undertake a larger-scale project, integrating various elements learned throughout the course.",
		  },
		  {
		    title: 'Web Hosting',
		    video:'/htmlcourse/web_hosting.m3u8',
		    duration: '6:26',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Unravel the mysteries of web hosting. Learn how to take your web projects live by exploring different hosting options and understanding the basics of site configurations.",
		  },
		  {
		    title: 'CSS',
		    video:'/htmlcourse/intro_to_css.m3u8',
		    duration: '8:22',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Transition seamlessly from HTML to CSS. In this module, delve into the world of Cascading Style Sheets to add style and visual appeal to your web pages.",
		  },
		  {
			  "title": "HTML and Project Quiz",
			  "quiz": true,
			  "locked": true,
			  "completed": false,
			  "questions": [
			    {
			      "question": "In 'Project 1 - 1', what HTML semantic tags were primarily used for creating a FAQ page?",
			      "options": [
			        "<div> and <span>",
			        "<details> and <summary>",
			        "<ul> and <li>",
			        "<section> and <article>"
			      ],
			      "questionId": 112
			    },
			    {
			      "question": "In 'Project 1 - 2', how did you make an image float using HTML?",
			      "options": [
			        "Applied 'float' property in CSS",
			        "Used 'position: absolute'",
			        "Set 'display: inline-block'",
			        "Inserted a 'float' tag around the image"
			      ],
			      "questionId": 113
			    },
			    {
			      "question": "What was the focus of 'Project 2' in your HTML course?",
			      "options": [
			        "Creating an FAQ page",
			        "Designing a personal portfolio",
			        "Developing a basic app documentation",
			        "Implementing a chat application"
			      ],
			      "questionId": 114
			    },
			    {
			      "question": "What is web hosting in the context of web development?",
			      "options": [
			        "A service that allows individuals and organizations to make their websites accessible via the World Wide Web",
			        "A method of creating dynamic web pages",
			        "A technique for optimizing website performance",
			        "A module covered in the CSS section"
			      ],
			      "questionId": 115
			    }
			  ]
			},
		  {
		    title: 'Wrap up',
		    video:'/htmlcourse/wrap_up.m3u8',
		    duration: '2:07',
		    locked:true,
		    completed: false,
		    notes:[],
		    description: "Congratulations on completing the course! In this final module, recap your journey, reflect on your accomplishments, and gain insights into the next steps in your web development adventure.",
		  },
		];
		const title = 'Basics of Networking and HTML Beginner to Advanced Course'
		const description = 'Learn web development fundamentals, covering frontend, backend, and database structures. Explore client-server dynamics, APIs, various IP types, DNS workings, and HTML essentials with an introduction to CSS for crafting interactive websites';
		const image = '/html.png';
		const courseId = '101110'; 
		const locked = false;
		const videos = '35'
		const projects = '2';
		const duration = '4 Hours';
		const reqiurements = [
			'Text editor for writing HTML code',
			'Web Browser to view the output of HTML code'
		]

		// const {data} = await axios.post(createCourse,{
		// 	key:'DWjO8xwOjufFQsx7vUI7Mw==',title,content,description,image,
		// 	courseId,locked,videos,projects,reqiurements,duration
		// })
		// console.log(data)
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
				image:'./css.png',
				courseId:201011,
				title:'Dive into CSS',
				description:'Basic and Advance level of CSS,',
				locked:true,
				videos:'25 Videos',
				projects:'3'
			},{
				image:'./python.png',
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
