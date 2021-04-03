import React from 'react'
import styled from 'styled-components'

export type ColorSwatchProps = {
   onClick?: (color: string) => void
   color: string
}

export type ColorSwatchStyle = {
   color: string
}

const Element = styled.div<ColorSwatchStyle>`
   width: 2em;
   height: 2em;
   background-color: ${props => props.color};
   cursor: pointer;
`

export default function ColorSwatch(props: ColorSwatchProps) {
   const { color, onClick } = props

   return (
      <Element color={color} onClick={() => onClick?.(color)}/>
   )
}