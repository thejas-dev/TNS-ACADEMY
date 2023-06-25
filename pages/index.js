import Image from 'next/image'
import Main from '../components/Main';
import {getProviders,getSession,useSession} from 'next-auth/react'
import {loginRoute} from '../utils/ApiRoutes';
import axios from 'axios';
import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {Head} from 'next/head';
import React from 'react';


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
			email = session2?.user.email || session.user.email
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
  	
  	
    <main className="flex min-h-screen flex-col items-center justify-between relative 
    z-0 w-full bg-[#fafafe] md:overflow-y-hidden overflow-x-hidden scroll-smooth">
	
      <Main/>
    </main>

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
