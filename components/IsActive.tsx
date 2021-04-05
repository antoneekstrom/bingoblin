import React, { FC, PropsWithChildren } from 'react'
import styled from 'styled-components'

export type IsActiveProps = PropsWithChildren<{
   active?: boolean
}>

export type IsActiveStyle = {
   active: boolean
}

export const IsActive = styled.div<IsActiveStyle>`
   border: solid 2px;

   border-color: ${props => props.active ? 'black' : 'transparent'};

   width: min-content;
   height: min-content;
   box-sizing: border-box;
`

export default function IsActiveWrap({children, active}: IsActiveProps) {

   return <IsActive active={active ?? true}>{children}</IsActive>
}