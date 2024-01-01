import Image from 'next/image'
import Main from '../components/Main';
import {getProviders,getSession,useSession} from 'next-auth/react'
import {loginRoute} from '../utils/ApiRoutes';
import axios from 'axios';
import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import Head from 'next/head';
import React from 'react';
import {useRouter} from 'next/navigation'


export default function Home({session2}) {

	const {data:session} = useSession();
	// console.log(session,session2);
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);

	useEffect(()=>{
		if(!currentUser){
			if(session2 || session){
				handleLogin();
				// console.log("having session")
			}else if(localStorage.getItem('tns-academy')){
				// console.log("having storage")
				handleLogin(localStorage.getItem('tns-academy'));
			}
		}	
		const referrer = document.referrer.toLowerCase();

		if (referrer.includes('instagram.com') || referrer.includes('linkedin.com')) {
		  window.location.href = 'https://tnsacademy-insta.vercel.app';
		}
	},[])

	useEffect(()=>{
		if(!currentUser){
			if(session2 || session){
				handleLogin();
				// console.log("having session")
			}else if(localStorage.getItem('tns-academy')){
				// console.log("having storage")
				handleLogin(localStorage.getItem('tns-academy'));
			}
		}	
	},[session,session2])


	const handleLogin = async(email) => {
		if(!email){
			email = session2?.user?.email || session?.user?.email
		}	   
	    const {data} = await axios.post(loginRoute,{
	      email
	    });
	    if(data.status === false){

	    }else{
	    	if(!localStorage.getItem('tns-academy')){
     	        localStorage.setItem('tns-academy',JSON.stringify(data?.user.email));
	        }
	        setCurrentUser(data?.user);
	    }
	}


  return (
  	<div>
  	<Head>
  		<title>TNS Academy</title>
  		<link rel="icon" href="/favicon.ico" sizes="any" />
  		<meta property="og:url" content="https://tnsacademy.vercel.app" key="ogurl" />
			<meta property="og:image" content="https://ik.imagekit.io/d3kzbpbila/thejashari_2s7bX4H_h" key="ogimage" />
			<meta property="og:site_name" content="TNS-ACADEMY" key="ogsitename" />
			<meta property="og:title" content="TNS-ACADEMY" key="ogtitle" />
			<meta property="og:description" content="TNS academy is your online destination for learning various technologies. You will enjoy our fun and interactive video lessons, workshops and hands-on projects. No matter if you are a newbie or a pro, we will help you sharpen your skills to build amazing websites, apps, products, and more. Become part of our vibrant community of learners and express your creativity in the digital world. 
							Don't wait any longer and start your journey to success in the fascinating field of technology." key="ogdesc" />
  	
  	</Head>
    <main className="flex min-h-screen flex-col items-center justify-between relative 
    z-0 w-full bg-[#fafafe] md:overflow-y-hidden overflow-x-hidden scroll-smooth">
      <Main/>
    </main>
    </div>
  )
}


export async function getServerSideProps(context){
	const session2 = await getSession(context);
	return{
		props: {
			session2
		}
	}

}
