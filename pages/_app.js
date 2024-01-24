import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'
import {useEffect} from 'react';
import { RecoilRoot } from "recoil";
import {useRouter} from 'next/navigation'

export default function App({ Component, pageProps: { session, ...pageProps} }) {
  const router = useRouter()
	
  useEffect(() => {
    // Check if the user agent indicates the Instagram in-app browser
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.includes('instagram') || userAgent.includes('linkedin.com')){
      router.push('/notallowed')
    }

    return () => {
    };
  }, []);

  return (
  <>
  <SessionProvider session={session}>
  	<RecoilRoot>
		<Component {...pageProps} />
	</RecoilRoot>
	</SessionProvider>
  </>
 )
}
