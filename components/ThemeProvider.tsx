import React, { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import { ThemePalette } from '..'
import colors from './style/colors'

export const PRIMARY_PALETTE: ThemePalette = {
   text: colors.SECONDARY,
   background: colors.PRIMARY_DARKENED,
   border: colors.SECONDARY
} 

export const SECONDARY_PALETTE: ThemePalette = {
   text: colors.PRIMARY,
   background: colors.SECONDARY,
   border: colors.PRIMARY
}

export const DISABLED_PALETTE: ThemePalette = {
   text: colors.SECONDARY_DISABLED,
   background: colors.PRIMARY_DISABLED,
   border: colors.SECONDARY_DISABLED
}

export const DEFAULT_THEME: DefaultTheme = {
   props: {
      disabled: false
   },
   colors: {
      neutral: PRIMARY_PALETTE,
      disabled: DISABLED_PALETTE
   }
}

export default function DefaultThemeProvider({
   children,
}: PropsWithChildren<unknown>) {
   return <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>
}

export function NeutralThemeProvider({ palette, children}: PropsWithChildren<{palette: ThemePalette}>) {
   return (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
   )
   
   function theme(theme: DefaultTheme): DefaultTheme {
      return {
         ...theme,
         colors: {
            ...theme.colors,
            neutral: palette
         }
      }
   }
}

export function Disabled({ state, children }: PropsWithChildren<{state: boolean}>) {
   return (
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
   )

   function theme(theme: DefaultTheme): DefaultTheme {
      return {
         ...theme,
         props: {
            disabled: state
         }
      }
   }
}