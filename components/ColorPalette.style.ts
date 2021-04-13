import styled from "styled-components";
import colors from "./style/colors";

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
   border-radius: 2em;
   border-style: solid;
   border-width: 2px;
   border-color: ${({selected, disabled}) => selected ? (!disabled ? colors.SECONDARY : colors.SECONDARY_DISABLED) : 'transparent'};
   pointer-events: ${({disabled}) => disabled ? 'none' : 'unset'};
`

export const ColorPaletteLayout = styled.ul`
   display: grid;
   grid-auto-flow: column;
   gap: 0.2em;
   justify-content: space-between;
   padding: 0;
   width: 100%;
   margin: 0;
`