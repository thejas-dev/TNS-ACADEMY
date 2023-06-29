import {Head} from 'next/head';
import React from 'react';
import WorkshopComponent from '../components/WorkshopComponent';
import {useRouter} from 'next/navigation';
import {useRecoilState} from 'recoil'
import {currentWorkshopState,currentUserState} from '../atoms/userAtom';
import {useEffect} from 'react';
import Head from 'next/head';

export default function Workshops() {
	// body...
	const router = useRouter();
	const [currentUser,setCurrentUser] = useRecoilState(currentUserState);
	const [currentWorkshop,setCurrentWorkshop] = useRecoilState(currentWorkshopState);

	useEffect(()=>{
		if(!currentWorkshop){
			router.push('/')
		}else if(!currentUser){
			router.push('/slideIn')
		}
	},[currentUser])

	return (
		<div>
		<Head>
	  		<title>TNS Academy</title>
	  	</Head>
		<main className="w-full h-screen overflow-y-scroll scrollbar-thin scroll-smooth bg-gray-100">
			<WorkshopComponent />

		</main>
		</div>
	)
}