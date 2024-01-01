
import Head from 'next/head';

import LoginComponent from '../components/LoginComponent'
import {getProviders,getSession,useSession} from 'next-auth/react'
import React from 'react';


export default function SlideIn({providers,session2}) {
	
	const {data:session} = useSession()


	return (
		
		<main className="w-full h-screen overflow-hidden ">
		  	<Head>
		  		<title>Login</title>
		  		<link rel="icon" href="/favicon.ico" sizes="any" />
		  		<meta property="og:url" content="https://tnsacademy.vercel.app" key="ogurl" />
				<meta property="og:image" content="https://ik.imagekit.io/d3kzbpbila/thejashari_2s7bX4H_h" key="ogimage" />
				<meta property="og:site_name" content="TNS-ACADEMY" key="ogsitename" />
				<meta property="og:title" content="TNS-ACADEMY" key="ogtitle" />
				<meta property="og:description" content="TNS academy is your online destination for learning various technologies. You will enjoy our fun and interactive video lessons, workshops and hands-on projects. No matter if you are a newbie or a pro, we will help you sharpen your skills to build amazing websites, apps, products, and more. Become part of our vibrant community of learners and express your creativity in the digital world. 
								Don't wait any longer and start your journey to success in the fascinating field of technology." key="ogdesc" />
		  	</Head>

			<LoginComponent id={providers.google.id} session={session} session2={session2}/>
		</main>
		


	)
}

export async function getServerSideProps(context){
	const providers = await getProviders();
	const session2 = await getSession(context);
	return{
		props: {
			providers,session2
		}
	}

}