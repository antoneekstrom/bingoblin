import { createGlobalStyle, css } from 'styled-components'
import colors from './colors'

/**
 * General styling for the entire app.
 */
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

/**
 * Extracts a property from the element.
 * @param property Name of the property
 * @param fn Function which returns CSS using the property
 * @returns Value of property or optionally something else
 */
export function props<T, P extends keyof T>(
   property: P,
   fn?: (property: T[P]) => any
): (props: T) => T[P] {
   return (props: T) => (fn ? fn(props[property]) : props[property])
}

/**
 * Only returns result of the function when property is truthy
 * @param property Name of the property
 * @param fn Function which returns CSS
 * @returns Result of the function
 */
export function propsIf<T, P extends keyof T>(
   property: P,
   fn: (property: T[P]) => string | ReturnType<typeof css>
): (props: T) => string | ReturnType<typeof css> {
   return (props: T) => props[property] && fn(props[property])
}
