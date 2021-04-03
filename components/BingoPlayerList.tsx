import React from 'react'
import styled from 'styled-components'
import { BingoPlayer } from '../common/model/bingo'
import UserProfileCircle from './UserProfileCircle'

export type BingoPlayerListProps = {
   players: BingoPlayer[]
}

export type BingoPlayerListStyle = unknown

const Container = styled.div`
`

export default function BingoPlayerList(props: BingoPlayerListProps) {
   return (
      <Container>
         {props.players.map(p => <UserProfileCircle key={p.id} name={p.name} />)}
      </Container>
   )
}