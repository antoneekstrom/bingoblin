import React from 'react'
import styled from 'styled-components'
import colors from './style/colors'
import WithLabel from './WithLabel'

export type TextFieldProps = Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'ref'> & {
   label?: string
}

export type TextFieldStyle = unknown

const Input = styled.input`
   background-color: ${colors.PRIMARY_DARKENED};
   outline: none;
   padding: 0.5em 2em;
   border-radius: 100px;
   font-size: 16px;

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }

   border-color: transparent;
   border-style: solid;
   border-width: 2px;
   &:focus {
      border-color: ${colors.SECONDARY_DARKENED};
   }
`

export default function TextField(props: TextFieldProps) {
   const { label, disabled } = props

   return (
      <WithLabel className="input" label={label} disabled={disabled}>
         <Input {...props} />
      </WithLabel>
   )
}