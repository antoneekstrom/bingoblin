import React, { FC } from 'react'
import * as arrays from '../common/arrays'
import { uniqueKey } from '../common/key'
import { BingoBoard } from '../common/model/bingo'
import { BingoGridLayoutStyle } from './BingoGrid.style'
import { BingoCellProps } from './BingoCellFactory'

export type BingoGridProps = BingoBoard & {
   cell: FC<BingoCellProps>
}

export default function BingoGrid(props: BingoGridProps) {
   const { items, size, cell: Cell } = props

   return (
      <BingoGridLayoutStyle size={size}>
      {
         arrays.range(size*size, 0).map(i => {
            const cell = items.find(item => item?.index == i) ?? {index: i, name: ''}
            return (
               <Cell cell={cell} key={uniqueKey()} />
            )
         })
      }
      </BingoGridLayoutStyle>
   )
}