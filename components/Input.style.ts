import styled from 'styled-components'
import { Base } from './Base.style'
import colors from './style/colors'
import { Side } from './style/layout'

/**
 * 
 */
export type ButtonHalfStyle = Side

/**
 * 
 */
export const ButtonHalf = styled.button<ButtonHalfStyle>`
   ${Base}

   display: grid;

   cursor: pointer;
   border-radius: ${({ side }) => side == 'left' ? '100px 0 0 100px' : '0 100px 100px 0'};

   &:hover {
      background-color: ${colors.PRIMARY_ACTIVE};
   }
`
