import React, { PropsWithChildren } from 'react'
import { DefaultTheme, ThemeProvider } from 'styled-components'
import colors from './style/colors'

export const DEFAULT_THEME: DefaultTheme = {
   props: {
      disabled: false
   },
   colors: {
      neutral: {
         text: colors.SECONDARY,
         background: colors.PRIMARY_DARKENED,
         border: colors.SECONDARY
      },
      disabled: {
         text: colors.SECONDARY_DISABLED,
         background: colors.PRIMARY_DISABLED,
         border: colors.SECONDARY_DISABLED
      }
   }
}

export default function DefaultThemeProvider({
   children,
}: PropsWithChildren<unknown>) {
   return <ThemeProvider theme={DEFAULT_THEME}>{children}</ThemeProvider>
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