import React, { useRef } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoBoard, BingoCell, BingoPlayer } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import BingoGrid from './BingoGrid'
import { BingoGridCellFactory } from './BingoGridCell'
import { BingoCardContainer, BingoCardTitle } from './BingoCard.style'
import { BingoGridLayoutContainer } from './BingoGrid.style'

export type BingoCardProps = {
   board?: BingoBoard
   hidden?: boolean
   onClickTitle?: (e: React.MouseEvent) => void
   onClick?: (e: React.MouseEvent) => void
   onClickCell?: (cell: BingoCell) => void
   self?: BingoPlayer
}

export function ConnectedBingoCard() {
   const {
      bingo,
      state,
      self,
      isCardHiddenState: [isCardHidden, setIsCardHidden],
   } = useBingoContext()
   const toggleCardHidden = () => setIsCardHidden((state) => !state)

   return (
      <BingoCard
         board={state?.board}
         hidden={isCardHidden}
         onClick={toggleCardHidden}
         onClickTitle={toggleCardHidden}
         onClickCell={toggleCell}
         self={self}
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
   self,
}: BingoCardProps) {
   const cell = BingoGridCellFactory.base(
      (cell) => self?.state == 'playing' && onClickCell?.(cell),
      (cell) => self?.state == 'playing' && (!cell.color || cell.color == self?.color)
   )
   const titleRef = useRef<HTMLHeadingElement | any>()
   
   return (
      <BingoCardContainer onClick={onClickCard} hidden={hidden}>
         <BingoCardTitle ref={titleRef}>BINGOBLIN</BingoCardTitle>
         <BingoGridLayoutContainer>
            {board ? (
               <BingoGrid {...board} cell={cell} />
            ) : (
               <h1>no board 😭</h1>
            )}
         </BingoGridLayoutContainer>
      </BingoCardContainer>
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
