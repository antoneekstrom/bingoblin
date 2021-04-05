import React, { FC } from 'react'
import { BingoCell } from '../common/model/bingo'
import { BingoGridCellStyle } from './style/bingocard'
import { BingoCellText } from './style/typography'

export type BingoGridCellProps = BingoCell & {
   onClick?: (cell: BingoCell) => void
}

export class BingoGridCellFactory {
   static base(setCell: (cell: BingoCell) => void): FC<BingoGridCellProps> {
      return props => <BaseBingoGridCell {...props} color={props.color || 'var(--secondary-darkened)'} onClick={setCell} />
   }
   static unavailable(): FC<BingoGridCellProps> {
      return props => <BaseBingoGridCell {...props} color="var(--secondary-darkened)" />
   }
}

export function BaseBingoGridCell(props: BingoGridCellProps & Required<Pick<BingoCell, 'color'>>) {
   return (
      <BingoGridCellStyle color={props.color} onClick={() => props.onClick?.(props)}>
         <BingoCellText>{props.name}</BingoCellText>
      </BingoGridCellStyle>
   )
}