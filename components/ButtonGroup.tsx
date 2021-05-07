import React, { PropsWithChildren } from 'react'
import ButtonGroupStyle from './ButtonGroup.style'

export type MultiButtonProps = PropsWithChildren<unknown>

export default function MultiButton({ children }: MultiButtonProps) {
   return (
      <ButtonGroupStyle>
         {children}
      </ButtonGroupStyle>
   )
}