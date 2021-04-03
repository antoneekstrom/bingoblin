import React, { FC } from 'react'
import styled from 'styled-components'
import BingoModel from '../common/BingoModel'
import { Bingo, BingoCell, BingoState } from '../common/model/bingo'

export type BingoGridCellProps = BingoCell & {
   onClick?: (cell: BingoCell) => void
}

export type BingoGridCellStyle = {
   color: string
}

const Cell = styled.li<BingoGridCellStyle>`
   background-color: ${props => props.color};
   display: grid;
   place-items: center;
   font-family: "Comic Sans MS";
   font-size: 1.5em;

   transition: all 100ms ease-in;
   transition-property: transform background-color;

   user-select: none;

   &:hover {
      transform: scale(1.1)
   }
`

export class BingoGridCellFactory {
   static base(setCell: (cell: BingoCell) => void): FC<BingoGridCellProps> {
      return props => <BaseBingoGridCell {...props} color={props.color || 'var(--fill2)'} onClick={setCell} />
   }
   static unavailable(): FC<BingoGridCellProps> {
      return props => <BaseBingoGridCell {...props} color={props.color ? 'var(--fill3)' : 'var(--fill2)'} />
   }
}

export function BaseBingoGridCell(props: BingoGridCellProps & Required<Pick<BingoCell, 'color'>>) {
   return (
      <Cell color={props.color} onClick={() => props.onClick?.(props)}>{props.name}</Cell>
   )
}