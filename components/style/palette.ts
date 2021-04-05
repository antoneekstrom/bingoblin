import styled from "styled-components";
import colors from "./colors";

export type ColorSwatchStyle = {
   color: string
   selected?: boolean
   disabled?: boolean
}

export const ColorSwatch = styled.div<ColorSwatchStyle>`
   width: 2em;
   height: 2em;
   background-color: ${({color, disabled}) => disabled ? colors.PRIMARY_DISABLED : color};
   cursor: pointer;
   border-radius: 12px;
   border-style: solid;
   border-width: 3px;
   border-color: ${({selected: active}) => active ? colors.SECONDARY : 'transparent'};
   pointer-events: ${({disabled}) => disabled ? 'none' : 'unset'};
`

export const ColorPaletteLayout = styled.ul`
   display: grid;
   grid-auto-flow: column;
   gap: 0.2em;
   justify-content: space-between;
   padding: 0;
`