import { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { createGlobalStyle } from 'styled-components'

const AppStyle = createGlobalStyle`
:root {
  --fill0: #FFFFFF;
  --fill1: #C4C4C4;
  --fill2: #E9E9E9;
  --fill3: #444444;
}
body {
  background-color: var(--fill0);
  padding: 0;
  margin: 0;
}
`

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <AppStyle/>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}