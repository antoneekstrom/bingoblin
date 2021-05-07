import React, { FC } from 'react'
import { BingoCell } from '../common/model/bingo'
import EditableBingoCell from './EditableBingoCell'
import ToggleableBingoCell from './ToggleableBingoCell'

export type BingoCellProps = {
   cell: BingoCell
}

export default class BingoCellFactory {
   static base(
      toggleCell: (cell: BingoCell) => void,
      isPlaying: boolean,
      selfColor?: string
   ): FC<BingoCellProps> {
      return (props) => (
         <ToggleableBingoCell
            {...props}
            {...{ toggleCell, isPlaying, selfColor }}
         />
      )
   }
   static editable(): FC<BingoCellProps> {
      return (props) => (
         <EditableBingoCell {...props} />
      )
   }
}
