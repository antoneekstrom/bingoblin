import React from 'react'
import styled, { useTheme } from 'styled-components'
import { BASE, BORDER, DISABLED, FOCUSED } from './Base.style'
import WithLabel from './WithLabel'

export type TextFieldProps = Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'ref'> & {
   label?: string
   placeholder?: string
}

const Input = styled.input`
   ${BASE}
   ${BORDER}
   ${FOCUSED}
   ${DISABLED}
`

export default function TextField(props: TextFieldProps) {
   const { label } = props

   const { props: themeProps } = useTheme()

   return (
      <WithLabel className="input" label={label} {...themeProps}>
         <Input {...props} {...themeProps} />
      </WithLabel>
   )
}