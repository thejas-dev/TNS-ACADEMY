import Image from 'next/image'
import Main from '../components/Main';
import {getProviders,getSession,useSession} from 'next-auth/react'
import {loginRoute} from '../utils/ApiRoutes';
import axios from 'axios';
import {useEffect} from 'react'
import {useRecoilState} from 'recoil'
import {currentUserState} from '../atoms/userAtom';
import {Head} from 'next/head';

export const metadata = {
  title: 'TNS-Academy',
  description: 'Learn web development and Programming stuffs in <TNS academy/>. We faciliate a wide range of courses and workshops with a lot of useful, treding, and must know topics. Join for free and Start learning today.',
}

export default function Home({providers,session2}) {

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
  	<>
  	<Head>
  		<title>TNS Academy</title>
  	</Head>
    <main className="flex min-h-screen flex-col items-center justify-between relative 
    z-0 w-full bg-[#fafafe] md:overflow-y-hidden overflow-x-hidden scroll-smooth">
      <Main/>
    </main>
    </>
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
