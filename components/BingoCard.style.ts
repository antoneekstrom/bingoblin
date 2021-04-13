import styled, { css } from 'styled-components'
import colors from './style/colors'
import { propsIf } from './style/index'

/**
 * 
 */
export type BingoCardStyle = {
   hidden?: boolean
}

/**
 * Contains the bingocard and also the menu behind the card.
 */
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
 */
export const BingoCardContainer = styled.div<BingoCardStyle>`
   background-color: var(--secondary);
   border-radius: 3em 3em 0 0;

   display: flex;
   flex-direction: column;
   align-items: center;

   height: 100%;
   width: 100%;
   padding: 0 4em;
   box-sizing: border-box;
   position: absolute;

   transition: top 400ms ease-in-out, transform 200ms ease-out;

   /* Positions the card based on the 'hidden' property */
   ${({ hidden }) => css`top: ${hidden ? 'calc(100% - 100px)' : '50px'};`}

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

/**
 *
 */
export const BingoCardTitle = styled.h1`
   text-transform: uppercase;
   color: ${colors.PRIMARY};
   font-family: 'Raleway';
   font-weight: 900;
   font-size: 36px;

   text-align: center;
   margin: 0.8em 0;

   user-select: none;
   cursor: pointer;
`
