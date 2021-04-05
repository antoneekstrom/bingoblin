import React from 'react'
import { ColorPaletteLayout, ColorSwatch } from './style/palette'

export type BingoPaletteProps = {
   onSetColor?: (color: string) => void
   selected?: string
   disabled?: boolean
}

export const BINGO_PALETTE_COLORS = [
   '#FFB800',
   '#34B460',
   '#FF7A00',
   '#FF2E00',
   '#FF00A8',
]

export default function BingoPalette(props: BingoPaletteProps) {
   return (
      <ColorPaletteLayout>
         {BINGO_PALETTE_COLORS.map((c) => (
            <ColorSwatch
               disabled={props.disabled}
               key={c}
               color={c}
               selected={props.selected == c}
               onClick={() => props.onSetColor?.(c)}
            />
         ))}
      </ColorPaletteLayout>
   )
}
