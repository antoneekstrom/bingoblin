import React from 'react'
import ColorPalette from './ColorPalette'
import ColorSwatch from './ColorSwatch'
import IsActive from './IsActive'

export type BingoPaletteProps = {
   onSetColor?: (color: string) => void
   color?: string
}

export default function BingoPalette(props: BingoPaletteProps) {
   return (
      <ColorPalette>
         {['red', 'yellow', 'green', 'blue', 'pink'].map(c => (
            <IsActive key={c} active={props.color == c}><ColorSwatch color={c} onClick={props.onSetColor}/></IsActive>
         ))}
      </ColorPalette>
   )
}