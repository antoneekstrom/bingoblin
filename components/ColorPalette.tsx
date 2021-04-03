import React, { PropsWithChildren } from 'react'
import styled from 'styled-components'

export type ColorPaletteProps = PropsWithChildren<unknown>

export type ColorPaletteStyle = unknown

const Element = styled.ul`
   display: grid;
   grid-auto-flow: column;
   grid-template-rows: 1;
   gap: 0.2em;
`

export default function ColorPalette(props: ColorPaletteProps) {
   return (
      <Element>{props.children}</Element>
   )
}