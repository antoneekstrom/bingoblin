import React, { useRef } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoBoard, BingoCell } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import BingoGrid from './BingoGrid'
import { BingoGridCellFactory } from './BingoGridCell'
import { BingoCardStyle, BingoGridContainer } from './style/bingocard'
import { BingoTitle } from './style/typography'

export type BingoCardProps = {
   board?: BingoBoard
   hidden?: boolean
   onClickTitle?: (e: React.MouseEvent) => void
   onClick?: (e: React.MouseEvent) => void
   onClickCell?: (cell: BingoCell) => void
}

export function ConnectedBingoCard() {
   const {
      bingo,
      state,
      self,
      isCardHiddenState: [isCardHidden, setIsCardHidden],
   } = useBingoContext()
   const toggleCardHidden = () => setIsCardHidden(state => !state)

   return (
      <BingoCard
         board={state?.board}
         hidden={isCardHidden}
         onClick={toggleCardHidden}
         onClickTitle={toggleCardHidden}
         onClickCell={toggleCell}
      />
   )

   function toggleCell(cell: BingoCell) {
      self &&
         state &&
         bingo?.requestStateUpdate(
            FrontendBingoModel.from(state)
               .toggleCell(cell.index, self.color)
               .getState()
         )
   }
}

export default function BingoCard({
   board,
   hidden,
   onClickTitle,
   onClickCell,
   onClick,
}: BingoCardProps) {
   const cell = !self
      ? BingoGridCellFactory.unavailable()
      : BingoGridCellFactory.base(cell => onClickCell?.(cell) ?? (() => {}))
   const titleRef = useRef<HTMLHeadingElement | any>()

   return (
      <BingoCardStyle onClick={onClickCard} hidden={hidden}>
         <BingoTitle ref={titleRef}>BINGOBLIN</BingoTitle>
         <BingoGridContainer>
            {board ? <BingoGrid {...board} cell={cell} /> : <h1>no board 😭</h1> }
         </BingoGridContainer>
      </BingoCardStyle>
   )

   function onClickCard(e: React.MouseEvent) {
      const isTitle = e.target == titleRef.current
      if (isTitle) {
         onClickTitle?.(e)
      } else if (hidden) {
         onClick?.(e)
      }
   }
}
