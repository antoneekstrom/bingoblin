import styled, { css } from 'styled-components'
import colors from './style/colors'
import { props, propsIf } from './style/index'

export type BingoGridStyle = {
   size: number
}

export type BingoCardStyle = {
   hidden?: boolean
}

export type BingoGridCellStyle = {
   color: string
   textColor?: string
   selfColor?: string
   clickable?: boolean
}

export type BingoGridCellTextStyle = {
   gridSize?: number
}

export const BingoContainer = styled.div`
   position: relative;
   width: clamp(600px, 50vw, 750px);
   height: 100%;
   display: flex;
   justify-content: center;
`

/**
 * Styles the outer-most container of the bingocard.
 * Adds a background and positions the card absolutely.
 *
 *
 */
export const BingoCardStyle = styled.div<BingoCardStyle>`
   background-color: var(--secondary);
   border-radius: 3em 3em 0 0;

   height: 100%;
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   padding: 0 4em;
   box-sizing: border-box;

   position: absolute;
   ${({ hidden }) =>
      !hidden
         ? css`
              top: 50px;
           `
         : css`
              top: calc(100% - 100px);
           `}

   transition: top 400ms ease-in-out, transform 200ms ease-out;

   /** Peek-effect when hovering mouse over the card when hidden. */
   ${propsIf(
      'hidden',
      () => css`
         cursor: pointer;
         :hover {
            transform: translateY(-20px);
         }
      `
   )}
`

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

export const BingoGridCell = styled.li<BingoGridCellStyle>`
   background-color: ${props('color')};
   color: ${props('textColor')};

   display: grid;
   place-items: center;
   user-select: none;

   border-radius: 20%;

   box-sizing: border-box;
   border-width: 3px;
   border-style: solid;
   border-color: transparent;

   position: relative;

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

export const BingoGridCellText = styled.p<BingoGridCellTextStyle>`
   font-family: 'Nunito';
   font-weight: 700;
   text-transform: 'capitalize';
   color: inherit;
   text-align: center;
   text-overflow: ellipsis;
   margin: 0;
   ${({gridSize}) => {
      if ((gridSize ?? 0) < 5) {
         return 'font-size: 16px;'
      }
      else if ((gridSize ?? 0) > 8) {
         return 'font-size: 9px;'
      }
      else if ((gridSize ?? 0) > 6) {
         return 'font-size: 12px;'
      }
      else {
         return 'font-size: 14px;'
      }
   }}
`

export const BingoTitle = styled.h1`
   font-family: 'Raleway';
   font-weight: 900;
   text-transform: uppercase;
   color: ${colors.PRIMARY};

   font-size: 36px;
   /* letter-spacing: 36px; */

   text-align: center;
   margin: 0.8em 0;

   user-select: none;
   cursor: pointer;
`
