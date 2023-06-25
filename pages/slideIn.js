import {Head} from 'next/head';
import LoginComponent from '../components/LoginComponent'
import {getProviders,getSession,useSession} from 'next-auth/react'
import React from 'react';


export default function SlideIn({providers,session2}) {
	
	const {data:session} = useSession()


	return (
		
		<main className="w-full h-screen overflow-hidden ">
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