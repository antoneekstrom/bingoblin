import React from 'react'
import { BingoCell } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import { BingoCellProps } from './BingoCellFactory'
import { BingoCellLabelStyle, BingoCellStyle } from './BingoGrid.style'
import BingoCellTooltip from './BingoCellTooltip'
import colors from './style/colors'

export type ToggleableBingoCellProps = BingoCellProps & {
   toggleCell: (cell: BingoCell) => void,
   isPlaying: boolean,
   selfColor?: string
}

export default function ToggleableBingoCell(
   props: ToggleableBingoCellProps
) {
   const { state } = useBingoContext()
   const { isPlaying, toggleCell, selfColor, cell } = props
   const onClick = () => isPlaying && toggleCell(cell)

   const isClickable = isPlaying && selfColor != undefined && (!cell.color || cell.color == selfColor)
   const borderColor = cell.color == selfColor ? colors.PRIMARY : selfColor
   const color = cell.color ?? colors.SECONDARY_DARKENED
   const textColor = cell.color ? colors.SECONDARY : colors.PRIMARY

   return (
      <BingoCellStyle
         {...{ borderColor, color, textColor, onClick, isClickable }}
         className="tooltip"
      >
         <BingoCellLabelStyle gridSize={state?.board?.size}>{cell.name}</BingoCellLabelStyle>
         <BingoCellTooltip details={cell.details} />
      </BingoCellStyle>
   )
}
