import React from 'react'
import { BingoPlayer } from '../common/model/bingo'
import UserProfileCircle from './UserProfileCircle'
import WithLabel from './WithLabel'
import styled from 'styled-components'

export type BingoPlayerListProps = {
   players: BingoPlayer[]
}

export const List = styled.ul`
   margin: 0;
   padding: 0;

   display: grid;
   justify-content: space-between;
   grid-template-columns: repeat(auto-fill, 50px);
   gap: 0.5rem;
`

export default function BingoPlayerList({ players }: BingoPlayerListProps) {
   return (
      <WithLabel label="Players">
         <List>
            {players
               .filter((p) => p.state != 'spectating')
               .map((p) => (
                  <UserProfileCircle key={p.id} {...p} />
               ))}
         </List>
      </WithLabel>
   )
}
