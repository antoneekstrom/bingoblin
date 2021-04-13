import styled, { css } from 'styled-components'
import colors from './style/colors'
import { props } from './style/index'

/**
 * 
 */
export type BingoGridStyle = {
   size: number
}

/**
 * 
 */
export type BingoGridCellStyle = {
   color: string
   textColor?: string
   selfColor?: string
   clickable?: boolean
}

/**
 * 
 */
export type BingoGridCellLabelStyle = {
   gridSize?: number
}

/**
 * 
 */
export const BingoGridLayoutContainer = styled.div`
   position: relative;
   width: 100%;
   box-sizing: border-box;

   &::before {
      content: '';
      display: block;
      padding-top: 100%;
   }
`

/**
 * 
 */
export const BingoGridLayout = styled.ol<BingoGridStyle>`
   list-style-type: none;
   margin: 0;
   padding: 0;

   height: 100%;
   width: 100%;

   position: absolute;
   top: 0;
   left: 0;
   bottom: 0;
   right: 0;

   display: grid;
   grid-template-rows: repeat(${props('size')}, minmax(0, 1fr));
   grid-template-columns: repeat(${props('size')}, minmax(0, 1fr));
   gap: clamp(2px, 2%, 30px);
`

/**
 * 
 */
export const BingoGridCell = styled.li<BingoGridCellStyle>`
   background-color: ${props('color')};
   border-radius: 20%;
   color: ${props('textColor')};

   display: grid;
   place-items: center;

   position: relative;
   box-sizing: border-box;
   
   border-width: 3px;
   border-style: solid;
   border-color: transparent;

   user-select: none;
   cursor: ${({ clickable }) => (clickable ? 'pointer' : 'unset')};

   ${({ clickable, selfColor, color }) =>
      clickable &&
      css`
         &:hover,
         &:active,
         &:focus {
            border-color: ${color == selfColor ? colors.PRIMARY : selfColor};
         }
      `}
`

/**
 * 
 */
export const BingoGridCellLabel = styled.p<BingoGridCellLabelStyle>`
   font-family: 'Nunito';
   font-weight: 700;
   color: inherit;
   text-transform: 'capitalize';
   text-align: center;
   text-overflow: ellipsis;
   
   margin: 0;

   ${props('gridSize', getCellLabelFontSize)}
`

function getCellLabelFontSize(gridSize = 0) {
   if ((gridSize) < 5) {
      return 'font-size: 16px;'
   }
   else if ((gridSize) > 8) {
      return 'font-size: 9px;'
   }
   else if ((gridSize) > 6) {
      return 'font-size: 12px;'
   }
   else {
      return 'font-size: 14px;'
   }
}