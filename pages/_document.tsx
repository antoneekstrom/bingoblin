import Document, {
   DocumentContext,
   Head,
   Html,
   Main,
   NextScript,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'

export default class MyDocument extends Document {
   static async getInitialProps(context: DocumentContext) {
      const sheet = new ServerStyleSheet()
      const originalRenderPage = context.renderPage

      try {
         context.renderPage = () =>
            originalRenderPage({
               enhanceApp: (App) => (props) =>
                  sheet.collectStyles(<App {...props} />),
            })

         const initialProps = await Document.getInitialProps(context)
         return {
            ...initialProps,
            styles: (
               <>
                  {initialProps.styles}
                  {sheet.getStyleElement()}
               </>
            ),
         }
      } finally {
         sheet.seal()
      }
   }

   render() {
      return (
         <Html>
            <Head>
               <link rel="preconnect" href="https://fonts.gstatic.com" />
               <link
                  href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700&family=Raleway:wght@700;900&display=swap"
                  rel="stylesheet"
               />
               <link
                  href="https://fonts.googleapis.com/icon?family=Material+Icons+Round"
                  rel="stylesheet"
               />
               <link rel="icon" href="/icon.png" />
            </Head>
            <body>
               <Main />
               <NextScript />
            </body>
         </Html>
      )
   }
}
