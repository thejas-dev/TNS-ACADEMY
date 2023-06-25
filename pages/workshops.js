import {Head} from 'next/head';
import WorkshopComponent from '../components/WorkshopComponent';
import {useRouter} from 'next/router';
import {useRecoilState} from 'recoil'
import {currentWorkshopState,currentUserState} from '../atoms/userAtom';
import {useState,useEffect} from 'react';

export const metadata = {
  title: 'TNS-Academy',
  description: 'Learn web development and Programming stuffs in <TNS academy/>. We faciliate a wide range of courses and workshops with a lot of useful, treding, and must know topics. Join for free and Start learning today.',
}

export default function workshops() {
	// body...
	const router = useRouter();
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [currentWorkshop,setCurrentWorkshop] = useRecoilState(currentWorkshopState);

	useEffect(()=>{
		if(!currentUser || !currentWorkshop){
			router.push('/')
		}
	},[currentUser])

	return (
	<>
		<Head>
	  		<title>Workshops</title>
	  	</Head>
		<main className="w-full h-screen overflow-y-scroll scrollbar-thin scroll-smooth bg-gray-100">
			<WorkshopComponent />

		</main>
	</>
	)
}