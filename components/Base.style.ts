import { css } from 'styled-components'
import { color } from './style'

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
export const BASE = css`
   border: none;
   outline: none;

   color: ${color('neutral', 'text')}; // colors.SECONDARY
   background-color: ${color('neutral', 'background')}; // colors.PRIMARY_DARKENED
   border-radius: 100px;
   font-size: 16px;

   padding: 0.5em 2em;
   box-sizing: border-box;
`

export const BORDER = css`
   border-color: transparent;
   border-style: solid;
   border-width: 2px;
`

export const DISABLED = css`
   ${({ theme }) => theme.props.disabled && css`
      color: ${color('disabled', 'text')}; // colors.SECONDARY_DISABLED
      background-color: ${color('disabled', 'background')}; // colors.PRIMARY_DISABLED

      &:focus, &:focus-within {
         border-color: ${color('disabled', 'border')}; // colors.SECONDARY_DARKENED
      }
   `}
`

export const FOCUSED = css`
   &:focus, &:focus-within {
      border-color: ${color('neutral', 'border')}; // colors.SECONDARY_DARKENED
   }
`