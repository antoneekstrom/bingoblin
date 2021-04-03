import React, { FC } from 'react'
import styled from 'styled-components'
import * as arrays from '../common/arrays'
import { uniqueKey } from '../common/key'
import { BingoBoard } from '../common/model/bingo'
import { BingoGridCellProps } from './BingoGridCell'

export type BingoGridProps = BingoBoard & {
   cell: FC<BingoGridCellProps>
}

export type BingoGridStyle = {
   size: number
}

const Board = styled.ol<BingoGridStyle>`
   list-style-type: none;
   margin: 0;
   padding: 0;

   height: 100%;
   width: 100%;

   display: grid;
   grid-template-rows: repeat(${props => props.size}, 1fr);
   grid-template-columns: repeat(${props => props.size}, 1fr);
   gap: 2%;
`

export default function BingoGrid(props: BingoGridProps) {
   const { items, size, cell: Cell } = props

   return (
      <Board size={size}>
      {
         arrays.range(size*size, 0).map(i => {
            const cell = items?.[i] ?? {index: i}
            return (
               <Cell {...cell} key={uniqueKey()} />
            )
         })
      }
      </Board>
   )
}