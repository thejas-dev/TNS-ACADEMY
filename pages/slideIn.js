import {Head} from 'next/head';
import LoginComponent from '../components/LoginComponent'
import {getProviders,getSession,useSession} from 'next-auth/react'
import axios from 'axios';


export const metadata = {
  title: 'TNS-Academy',
  description: 'Learn web development and Programming stuffs in <TNS academy/>. We faciliate a wide range of courses and workshops with a lot of useful, treding, and must know topics. Join for free and Start learning today.',
}

export default function slideIn({providers,session2}) {
	// body...
	// console.log(session2,providers)
	const {data:session} = useSession();
	// console.log(session,session2);

	return (
		<>
		<Head>
	  		<title>Login to TNS Academy</title>
	  	</Head>
		<main className="w-full h-screen overflow-hidden ">
			<LoginComponent id={providers.google.id} session={session} session2={session2}/>

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