import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'
import {useEffect} from 'react';
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps: { session, ...pageProps} }) {

  useEffect(() => {
    // Check if the user agent indicates the Instagram in-app browser
    const userAgent = window.navigator.userAgent.toLowerCase();
    if(userAgent.includes('instagram')){
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
