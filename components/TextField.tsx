import React from 'react'
import styled from 'styled-components'
import colors from './style/colors'
import { Label } from './style/typography'

export type TextFieldProps = Omit<React.HTMLProps<HTMLInputElement>, 'as' | 'ref'> & {
   label?: string
}

export type TextFieldStyle = unknown

const Input = styled.input`
   background-color: ${colors.PRIMARY_DARKENED};
   border: none;
   outline: none;
   padding: 0.5em 2em;
   border-radius: 100px;
   font-size: 16px;

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }
`

export const Container = styled.div`
   display: flex;
   flex-direction: column;
   display: grid;
   gap: 7px;
`

export default function TextField(props: TextFieldProps) {
   const { label, disabled } = props

   return (
      <Container className="input">
         {label && <Label disabled={disabled}>{label}</Label>}
         <Input {...props} />
      </Container>
   )
}