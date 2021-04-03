import React from 'react'
import styled from 'styled-components'

export type UserProfileCircleProps = {
   name?: string
   pictureUrl?: string
}

export type UserProfileCircleStyle = unknown

const Element = styled.div`
`

export default function UserProfileCircle(props: UserProfileCircleProps) {
   return (
      <Element>{props.name}</Element>
   )
}