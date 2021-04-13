import React from 'react'
import { ColorPaletteLayout, ColorSwatch } from './ColorPalette.style'
import WithLabel from './WithLabel'

export type BingoPaletteProps = {
   onSetColor?: (color: string) => void
   selected?: string
   disabled?: boolean
}

export const BINGO_PALETTE_COLORS = [
   '#93e9ff',
   '#34B460',
   '#ffcf32',
   '#ff7b00',
   '#FF2E00',
   '#ff4db5',
   '#ab2eff',
]

export default function BingoPalette(props: BingoPaletteProps) {
   return (
      <WithLabel label="Colors" style={{width: "100%"}}>
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
      </WithLabel>
   )
}
