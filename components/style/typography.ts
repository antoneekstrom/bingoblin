/**
 * Typography components.
 */
import styled from 'styled-components'

/**
 * 
 */
export type LabelStyle = {
   disabled?: boolean
}

/**
 * 
 */
export const Header = styled.h2`
   font-family: "Raleway";
   font-weight: 700;
   text-transform: "capitalize";
   color: inherit;
   font-size: 36px;
`

/**
 * 
 */
export const Label = styled.label<LabelStyle>`
   font-family: "Nunito";
   font-weight: 600;
   text-transform: "capitalize";
   color: inherit;
   font-size: 16px;

   display: flex;
   flex-direction: row;
   align-items: center;
`