/**
 * 
 * General styles and definitions for frequently used layout components.
 * 
 */
import styled, { css } from "styled-components"
import { color, props, propsIf } from "."

/**
 * 
 */
export type Align = {
   align?: 'center' | 'start' | 'end'
}

/**
 * 
 */
export type Justify = {
   justify?: 'center' |'start' | 'end' | 'space-between' | 'space-around'
}

/**
 * 
 */
export type Direction = {
   direction?: 'row' | 'column'
}

/**
 * Expands the element to use the full width of its container.
 */
export type Expand = {
   expand?: boolean
}

/**
 * 
 */
export type Gap = {
   gap?: string
}

export type Side = {
   side?: 'left' | 'right'
}

/**
 * Flexbox container.
 */
export const Flex = styled.div<Align & Justify & Direction & Expand & Gap>`
   color: ${color('neutral', 'text')};

   ${propsIf('expand', () => css`
      height: 100%;
      width: 100%;
   `)}

   display: flex;
   flex-direction: ${props('direction') ?? 'column'};
   justify-content: ${props('justify') ?? 'center'};
   align-items: ${props('align') ?? 'center'};
   gap: ${props('gap') ?? '0'};
`