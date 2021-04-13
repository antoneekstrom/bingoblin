import React, { FC } from 'react'
import * as arrays from '../common/arrays'
import { uniqueKey } from '../common/key'
import { BingoBoard } from '../common/model/bingo'
import { BingoGridCellProps } from './BingoGridCell'
import { BingoGridLayout } from './BingoGrid.style'

export type BingoGridProps = BingoBoard & {
   cell: FC<BingoGridCellProps>
}

export default function BingoGrid(props: BingoGridProps) {
   const { items, size, cell: Cell } = props

   return (
      <BingoGridLayout size={size}>
      {
         arrays.range(size*size, 0).map(i => {
            const cell = items?.[i] ?? {index: i}
            return (
               <Cell {...cell} key={uniqueKey()} />
            )
         })
      }
      </BingoGridLayout>
   )
}