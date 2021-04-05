import React, { useRef } from 'react'
import { BingoBoard } from '../common/model/bingo'
import BingoGrid from './BingoGrid'
import { BingoGridCellFactory } from './BingoGridCell'
import { BingoCardStyle, BingoGridContainer } from './style/bingocard'
import { BingoTitle } from './style/typography'

export type BingoCardProps = {
   board: BingoBoard,
   hidden?: boolean,
   onClickTitle?: (e: React.MouseEvent) => void,
   onClick?: (e: React.MouseEvent) => void
}

export default function BingoCard({ board, onClickTitle, hidden, onClick }: BingoCardProps) {
   const cell = !self ? BingoGridCellFactory.unavailable() : BingoGridCellFactory.base(() => {})
   const titleRef = useRef<HTMLHeadingElement | any>()

   return (
      <BingoCardStyle onClick={onClickCard} hidden={hidden}>
         <BingoTitle ref={titleRef}>BINGOBLIN</BingoTitle>
         <BingoGridContainer>
            <BingoGrid {...board} cell={cell} />
         </BingoGridContainer>
      </BingoCardStyle>
   )

   function onClickCard(e: React.MouseEvent) {
      const isTitle = e.target == titleRef.current
      if (isTitle) {
         onClickTitle?.(e)
      }
      else if (hidden) {
         onClick?.(e)
      }
   }

}