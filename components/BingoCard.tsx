import React, { useRef } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoBoard, BingoCell, BingoPlayer } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import BingoGrid from './BingoGrid'
import { BingoGridCellFactory } from './BingoGridCell'
import { BingoCardContainer, BingoCardTitle } from './BingoCard.style'
import { BingoGridLayoutContainer } from './BingoGrid.style'
import BingoCardIconMenu from './BingoCardIconMenu'
import { Disabled } from './ThemeProvider'

export type BingoCardProps = {
   board?: BingoBoard
   hidden?: boolean
   onClickTitle?: (e: React.MouseEvent) => void
   onClick?: (e: React.MouseEvent) => void
   onClickCell?: (cell: BingoCell) => void
   self?: BingoPlayer
}

export default function BingoCard() {
   const {
      bingo,
      state,
      self,
      isCardHiddenState: [isCardHidden, setIsCardHidden],
   } = useBingoContext()
   const board = state?.board

   const cell = BingoGridCellFactory.base(
      (cell) => self?.state == 'playing' && toggleCell(cell),
      (cell) => self?.state == 'playing' && (!cell.color || cell.color == self?.color)
   )
   const titleRef = useRef<HTMLHeadingElement | any>()
   
   return (
      <BingoCardContainer onClick={onClickCard} hidden={isCardHidden}>
         <BingoCardTitle ref={titleRef}>BINGOBLIN</BingoCardTitle>
         <BingoGridLayoutContainer>
            {board ? (
               <BingoGrid {...board} cell={cell} />
            ) : (
               <h1>no board 😭</h1>
            )}
         </BingoGridLayoutContainer>
         <Disabled state={!isCardHidden}>
            <BingoCardIconMenu/>
         </Disabled>
      </BingoCardContainer>
   )

   function toggleCardHidden() {
      setIsCardHidden((state) => !state)
   }

   function onClickCard(e: React.MouseEvent) {
      const isTitle = e.target == titleRef.current
      if (isTitle || isCardHidden) {
         toggleCardHidden()
      }
   }

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
