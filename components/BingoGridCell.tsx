import React, { FC } from 'react'
import { BingoCell } from '../common/model/bingo'
import { BingoGridCell } from './style/bingocard'
import colors from './style/colors'
import { BingoCellText } from './style/typography'

export type BingoGridCellProps = BingoCell & {
   onClick?: (cell: BingoCell) => void
}

export class BingoGridCellFactory {
   static base(onClick: (cell: BingoCell) => void): FC<BingoGridCellProps> {
      return (props) => (
         <BaseBingoGridCell
            {...props}
            color={props.color || colors.SECONDARY_DARKENED}
            onClick={cell => onClick?.(cell)}
         />
      )
   }
   static unavailable(): FC<BingoGridCellProps> {
      return (props) => (
         <BaseBingoGridCell {...props} color={colors.SECONDARY_DARKENED} />
      )
   }
}

export function BaseBingoGridCell(
   props: BingoGridCellProps & Required<Pick<BingoCell, 'color'>>
) {
   return (
      <BingoGridCell
         color={props.color}
         onClick={() => props.onClick?.(props)}
      >
         <BingoCellText>{props.name}</BingoCellText>
      </BingoGridCell>
   )
}
