import styled, { css } from 'styled-components'
import { props } from './index'

export type BingoGridStyle = {
   size: number
}

export type BingoCardStyle = {
   hidden?: boolean
}

export type BingoGridCellStyle = {
   color: string
   clickable?: boolean
}

export const BingoCardStyle = styled.div<BingoCardStyle>`
   background-color: var(--secondary);

   height: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;

   border-radius: 50px 50px 0 0;

   transition: top 400ms ease-in-out, transform 200ms ease-out;
   position: absolute;
   top: ${({hidden}) => hidden ? 'calc(100% - 6em)' : '40px'};

   ${({hidden}) => hidden && css`
      cursor: pointer;
      :hover {
         transform: translateY(-20px);
      }
   `}
`

export const BingoGridContainer = styled.div`
   width: 65vmin;
   height: 65vmin;
   padding: 0 50px;
`

export const BingoGridLayout = styled.ol<BingoGridStyle>`
   list-style-type: none;
   margin: 0;
   padding: 0;

   height: 100%;
   width: 100%;

   display: grid;
   grid-template-rows: repeat(${props('size')}, 1fr);
   grid-template-columns: repeat(${props('size')}, 1fr);
   gap: 30px;
`

export const BingoGridCell = styled.li<BingoGridCellStyle>`
   background-color: ${props('color')};
   
   display: grid;
   place-items: center;
   user-select: none;

   border-radius: 20px;

   cursor: ${({clickable}) => clickable ? 'pointer' : 'unset'};
`