import styled, { css } from 'styled-components'
import { props } from './style/index'

/**
 * 
 */
export type BingoGridStyleProps = {
   size: number
}

/**
 * 
 */
export type BingoCellStyleProps = {
   color: string
   textColor?: string
   borderColor?: string
   isClickable?: boolean
   forceBorderColor?: boolean
}

/**
 * 
 */
export type BingoGridCellLabelStyleProps = {
   gridSize?: number
}

/**
 * 
 */
export const BingoGridLayoutContainerStyle = styled.div`
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
export const BingoGridLayoutStyle = styled.ol<BingoGridStyleProps>`
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
export const BingoCellStyle = styled.li<BingoCellStyleProps>`
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
   cursor: ${({ isClickable }) => (isClickable ? 'pointer' : 'unset')};

   ${({ isClickable, borderColor }) =>
      isClickable &&
      css`
         &:hover,
         &:active,
         &:focus {
            border-color: ${borderColor};
         }
      `}

   ${({ forceBorderColor, borderColor }) => forceBorderColor && css`border-color: ${borderColor};`}
`

/**
 * 
 */
export const EditableBingoCellStyle = styled(BingoCellStyle)<BingoCellStyleProps>`
   // cursor: text;
`

/**
 * 
 */
export const BingoCellLabelStyle = styled.p<BingoGridCellLabelStyleProps>`
   font-family: 'Nunito';
   font-weight: 700;
   color: inherit;
   text-transform: 'capitalize';
   text-align: center;
   text-overflow: ellipsis;
   outline: none;
   
   margin: 0;
   box-sizing: border-box;

   width: 100%;
   height: 100%;
   
   word-wrap: break-word;

   display: grid;
   place-items: center;

   ${props('gridSize', getCellLabelFontSize)}
`

/**
 * 
 * @param gridSize 
 * @returns 
 */
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