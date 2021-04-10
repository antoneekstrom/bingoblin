import React, { FC } from 'react'
import { BingoCell } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import { BingoGridCell, BingoGridCellStyle } from './style/bingocard'
import colors from './style/colors'
import { Tooltip } from './style/tooltip'
import { BingoCellText, Label } from './style/typography'

export type BingoGridCellProps = BingoCell & {
   onClick?: (cell: BingoCell) => void
}

export class BingoGridCellFactory {
   static base(
      onClick: ((cell: BingoCell) => void) | undefined,
      clickable: ((cell: BingoCell) => boolean) | undefined
   ): FC<BingoGridCellProps> {
      return (props) => (
         <BaseBingoGridCell
            {...props}
            onClick={(cell) => onClick?.(cell)}
            clickable={clickable?.(props)}
         />
      )
   }
   static unavailable(): FC<BingoGridCellProps> {
      return (props) => (
         <BaseBingoGridCell
            {...props}
            color={colors.SECONDARY_DARKENED}
            clickable={false}
         />
      )
   }
}

export function BaseBingoGridCell(
   props: BingoGridCellProps &
      Pick<BingoCell, 'color'> &
      Partial<BingoGridCellStyle>
) {
   const { self } = useBingoContext()
   return (
      <BingoGridCell
         {...props}
         color={props.color ?? colors.SECONDARY_DARKENED}
         textColor={props.color ? colors.SECONDARY : colors.PRIMARY}
         onClick={() => props.onClick?.(props)}
         className="tooltip"
         selfColor={self?.color}
      >
         <BingoCellText>{props.name}</BingoCellText>
         {props.details && (
            <Tooltip>
               <Label as="p">{props.details}</Label>
            </Tooltip>
         )}
      </BingoGridCell>
   )
}
