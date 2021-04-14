import styled, { css } from 'styled-components'
import { BASE, BaseStyle, BORDER, DISABLED, FOCUSED } from './Base.style'
import { color } from './style'

/**
 * 
 */
export const FileInputInner = styled.input`
   ${DISABLED}
   display: none;
`

/**
 * 
 */
export const FileInputInnerContainer = styled.div<BaseStyle>`
   ${BASE}
   ${DISABLED}

   flex-grow: 1;
   border-radius: 100px 0 0 100px;
`

/**
 * 
 */
export const FileInputContainer = styled.div<{disabled?: boolean, isDragging?: boolean, error?: boolean}>`
   ${BORDER}
   ${FOCUSED}
   ${DISABLED}

   display: flex;
   flex-direction: row;

   border-radius: 100px;
   border-color: ${({isDragging}) => isDragging && css`${color('neutral', 'border')}`};
`
