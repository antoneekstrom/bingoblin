import React from 'react'
import styled from 'styled-components'
import { BingoPlayer } from '../common/model/bingo'
import { props } from './style'
import { Label } from './style/typography'

export type UserProfileCircleProps = Pick<
   BingoPlayer,
   'name' | 'color' | 'imgUrl' | 'role'
>

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
   background-image: url('${props('url')}');
   background-size: cover;
   border-radius: 50px;
   width: 50px;
   height: 50px;

   border-color: ${props('color') ?? 'transparent'};
   border-width: 2px;
   border-style: solid;
`

export const Name = styled(Label)`
   width: 50px;
   font-size: 14px;
   margin: 0;

   /* for ellipsis to work */
   white-space: normal;
   overflow: hidden;
   text-overflow: ellipsis;
   display: inline-block;

   /* limit name to 2 lines */
   display: -webkit-box;
   -webkit-line-clamp: 2;
   -webkit-box-orient: vertical;
`

export default function UserProfileCircle({
   name,
   color,
   imgUrl,
}: UserProfileCircleProps) {
   return (
      <Container>
         <ProfileImage url={imgUrl ?? 'goblin.png'} color={color} />
         <Name as="p" style={{ color }}>
            {name}
         </Name>
      </Container>
   )
}
