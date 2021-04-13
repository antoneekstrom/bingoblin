import React from 'react'
import styled from 'styled-components'
import { BingoPlayer } from '../common/model/bingo'
import { props } from './style'
import { Label } from './style/typography'

export type UserProfileCircleProps = Pick<BingoPlayer, 'name' | 'color' | 'imgUrl'>

type ProfileImageStyle = {
   url: string
   color?: string
}

const Container = styled.div`
   display: flex;
   align-items: center;
   justify-content: start;
   flex-direction: column;
   width: min-content;
   height: min-content;
`

const ProfileImage = styled.div<ProfileImageStyle>`
   background-image: url("${props('url')}");
   background-size: cover;
   border-radius: 50px;
   width: 50px;
   height: 50px;

   border-color: ${props('color') ?? 'transparent'};
   border-width: 2px;
   border-style: solid;
`

export const Name = styled(Label)`
   white-space: normal;
`

export default function UserProfileCircle({ name, color, imgUrl }: UserProfileCircleProps) {
   return (
      <Container>
         <ProfileImage url={imgUrl ?? 'goblin.png'} color={color} />
         <Name style={{color}}>{name}</Name>
      </Container>
   )
}