import 'styled-components'

export type ThemePalette = {
   text: string
   background: string
   border: string
}

export type BaseTheme = {
   colors: {
      neutral: ThemePalette
      disabled: ThemePalette
   }
}

export type StateTheme = {
   props: {
      disabled: boolean
   }
}

declare module 'styled-components' {
   export interface DefaultTheme extends BaseTheme, StateTheme {}
}
