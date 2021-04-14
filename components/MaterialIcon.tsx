import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { props } from './style'

export type MaterialIconProps = Omit<React.HTMLProps<HTMLSpanElement>, 'as' | 'ref'> & PropsWithChildren<MaterialIconStyle>

export type MaterialIconStyle = {
   size?: number
   marginSides?: string
}

export const Icon = styled.span<MaterialIconStyle>`
   color: inherit;
   margin: 0 ${props('marginSides')};
   &.md-${props('size') ?? 18} {
      font-size: ${props('size') ?? 18}px;
   }
`

export default function MaterialIcon(props: MaterialIconProps) {
   return (
      <Icon {...props} className={`material-icons-round md-${props.size}`}/>
   )
}