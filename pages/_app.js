import '../styles/globals.css'
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head'
import { RecoilRoot } from "recoil";

export default function App({ Component, pageProps: { session, ...pageProps} }) {
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
