"use client"
import { useRouter } from 'next/router'
import Header2 from '../../components/Header2';
import Head from 'next/head';
import {useState} from 'react';
import MainCourseComponent from '../../components/courseComponents/MainCourseComponent';
export default function Home(){
	const router = useRouter();
	const [courseName,setCourseName] = useState('TNS-Academy');

	return (
		<div className="w-full h-screen overflow-y-auto bg-[#180A0A]">
		  	<Head>
		  		<title>{courseName}</title>
		  		<link rel="icon" href="/favicon.ico" sizes="any" />
		  		<meta property="og:url" content="https://tnsacademy.vercel.app" key="ogurl" />
				<meta property="og:image" content="https://ik.imagekit.io/d3kzbpbila/thejashari_QSsM9TGJP" key="ogimage" />
				<meta property="og:site_name" content="TNS-ACADEMY" key="ogsitename" />
				<meta property="og:title" content="TNS-ACADEMY" key="ogtitle" />
				<meta property="og:description" content="TNS academy is your online destination for learning various technologies. You will enjoy our fun and interactive video lessons, workshops and hands-on projects. No matter if you are a newbie or a pro, we will help you sharpen your skills to build amazing websites, apps, products, and more. Become part of our vibrant community of learners and express your creativity in the digital world. 
								Don't wait any longer and start your journey to success in the fascinating field of technology." key="ogdesc" />
		  	</Head>
			
			<MainCourseComponent id={router.query.id} setCourseName={setCourseName} />

		</div>
	)
}