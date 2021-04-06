import React, { useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoCell, BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'
import BingoCard from './BingoCard'

export type StatefulBingoCardProps = {
   state: BingoState
   frontend: BingoFrontend
   self: BingoPlayer | undefined
}

export default function StatefulBingoCard({ frontend, state, self }: StatefulBingoCardProps) {
   const model = FrontendBingoModel.from(state)

   const [isCardHidden, setIsCardHidden] = useState(true)
   const toggleCardHidden = () => setIsCardHidden((state) => !state)
   const toggleCell = (cell: BingoCell) => self && frontend.requestStateUpdate(model.toggleCell(cell.index, self.color).getState())

   return (
      <BingoCard
         board={state.board}
         hidden={isCardHidden}
         onClick={toggleCardHidden}
         onClickTitle={toggleCardHidden}
         onClickCell={toggleCell}
      />
   )
}