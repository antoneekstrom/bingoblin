import { css } from 'styled-components'
import colors from './style/colors'

/**
 * 
 */
export type Disabled = {
   disabled?: boolean
}

/**
 * 
 */
export type BaseStyle = Disabled

/**
 * 
 */
export const Base = css`
   border: none;
   outline: none;

   color: ${colors.SECONDARY};
   background-color: ${colors.PRIMARY_DARKENED};
   border-radius: 100px;
   font-size: 16px;

   padding: 0.5em 2em;
   box-sizing: border-box;

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }
`