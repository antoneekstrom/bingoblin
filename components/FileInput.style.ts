import styled, { css } from 'styled-components'
import { Base, BaseStyle } from './Base.style'
import { propsIf } from './style'
import colors from './style/colors'

/**
 * 
 */
export const FileInputInner = styled.input`
   display: none;
`

/**
 * 
 */
export const FileInputInnerContainer = styled.div<BaseStyle>`
   ${Base}
   flex-grow: 1;
   border-radius: 100px 0 0 100px;
   ${propsIf('disabled', () => css`
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   `)}
`

/**
 * 
 */
export const FileInputContainer = styled.div<{disabled?: boolean, isDragging?: boolean, error?: boolean}>`
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
