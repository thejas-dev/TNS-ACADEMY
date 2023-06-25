import {Head} from 'next/head';
import LoginComponent from '../components/LoginComponent'
import {getProviders,getSession,useSession} from 'next-auth/react'



export default function slideIn({providers,session2}) {
	
	const {data:session} = useSession();


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