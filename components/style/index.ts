import { createGlobalStyle } from 'styled-components'
import colors from './colors'

export const GlobalStyle = createGlobalStyle`
   :root {
      --primary: ${colors.PRIMARY};
      --secondary: ${colors.SECONDARY};
      --secondary-darkened: ${colors.SECONDARY_DARKENED};
   }

   body {
      background-color: var(--primary);
      padding: 0;
      margin: 0;

      width: 100vw;
      height: 100vh;
      overflow: hidden;
   }

   body, h1, h2, h3, p, a, button, input, label {
      color: var(--secondary);
      font-family: 'Nunito';
   }
`

export function props<T, P extends keyof T>(property: P, fn?: (property: T[P]) => any): (props: T) => T[P] {
   return (props: T) => fn ? fn(props[property]) : props[property]
}
