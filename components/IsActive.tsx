import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

export type IsActiveProps = PropsWithChildren<{
   active?: boolean
}>

export type IsActiveStyle = {
   active: boolean
}

const Element = styled.div<IsActiveStyle>`
   border: solid 2px;

   border-color: ${props => props.active ? 'black' : 'transparent'};

   width: min-content;
   height: min-content;
   box-sizing: border-box;
`

export default function IsActive({children, active}: IsActiveProps) {
   return <Element active={active ?? true}>{children}</Element>
}