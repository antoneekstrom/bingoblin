import styled, { css } from 'styled-components'
import { propsIf } from './style'
import colors from './style/colors'

export const Input = styled.input`
   display: none;
`

export const Base = css`
   color: ${colors.SECONDARY};
   background-color: ${colors.PRIMARY_DARKENED};
   padding: 0.5em 2em;
   font-size: 16px;
   border-radius: 100px;
   border: none;
   outline: none;
   box-sizing: border-box;

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }
`

export const InnerContainer = styled.div<{disabled?: boolean}>`
   ${Base}
   flex-grow: 1;
   border-radius: 100px 0 0 100px;
   ${propsIf('disabled', () => css`
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   `)}
`

export const Button = styled.button<{ side: 'left' | 'right' }>`
   ${Base}
   cursor: pointer;
   border-radius: ${({ side }) =>
      side == 'left' ? '100px 0 0 100px' : '0 100px 100px 0'};

   display: grid;

   &:hover {
      background-color: ${colors.PRIMARY_ACTIVE};
   }
`

export const Container = styled.div<{disabled?: boolean, isDragging?: boolean, error?: boolean}>`
   display: flex;
   flex-direction: row;

   border-radius: 100px;
   border-color: ${({isDragging}) => isDragging ? 'colors.SECONDARY_DARKENED' : 'transparent'};;
   border-style: solid;
   border-width: 2px;

   &:focus-within {
      border-color: ${colors.SECONDARY_DARKENED};
   }
`
