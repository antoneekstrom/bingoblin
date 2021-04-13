import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'
import { props } from './style'

export type MaterialIconProps = PropsWithChildren<MaterialIconStyle>

export type MaterialIconStyle = {
   size?: 18 | 22 | 24 | 36 | 48
}

export const Icon = styled.span<MaterialIconStyle>`
   &.md-${props('size') ?? 18} {
      font-size: ${props('size') ?? 18}px;
   }
`

export default function MaterialIcon({ size, children }: MaterialIconProps) {
   return (
      <Icon className={`material-icons-outlined md-${size}`} size={size}>{children}</Icon>
   )
}