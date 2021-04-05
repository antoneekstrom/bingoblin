import { AppProps } from 'next/app'
import Head from 'next/head'
import { RecoilRoot } from 'recoil'
import { GlobalStyle } from '../components/style'

export default function MyApp({ Component, pageProps }: AppProps) {
   return (
      <RecoilRoot>
         <Head>
            <title>Bingoblin</title>
         </Head>
         <GlobalStyle/>
         <Component {...pageProps} />
      </RecoilRoot>
   )
}
