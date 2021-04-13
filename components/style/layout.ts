import styled, { css } from "styled-components"
import { props, propsIf } from "."

export type Align = {
   align?: 'center' | 'start' | 'end'
}

export type Justify = {
   justify?: 'center' |'start' | 'end'
}

export type Axis = {
   axis?: 'horizontal' | 'vertical'
}

export type Expand = {
   expand?: boolean
}

export type Gap = {
   gap?: string
}

export const Flex = styled.div<Align & Justify & Axis & Expand & Gap>`
   ${propsIf('expand', () => css`
      height: 100%;
      width: 100%;
   `)}

   display: flex;
   flex-direction: ${props('axis', axisToFlexDirection)};
   justify-content: ${props('justify') ?? 'center'};
   align-items: ${props('align') ?? 'center'};
   gap: ${props('gap') ?? '0'};
`

function axisToFlexDirection(axis: Axis['axis']) {
   switch (axis) {
      default:
      case 'vertical':
         return 'column'
      case 'horizontal':
         return 'row'
   }
}