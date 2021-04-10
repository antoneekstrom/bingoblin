import React from 'react'
import styled, { css } from 'styled-components'
import useStatefulField, { UseStatefulFieldInit } from '../hooks/useStatefulField'
import colors from './style/colors'
import WithLabel from './WithLabel'

export type NumberIncrementInputProps = Omit<UseStatefulFieldInit<number>, 'parseValue'> & {
   min?: number
   max?: number
   step?: number
   disabled?: boolean
   label?: string
}

export type NumberIncrementInputStyle = unknown

const Base = css`
   color: ${colors.SECONDARY};
   background-color: ${colors.PRIMARY_DARKENED};
   padding: 0.5em 2em;
   font-size: 16px;
   border: none;
   outline: none;
   box-sizing: border-box;

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }
`

const Input = styled.input`
   ${Base}
   text-align: center;
   flex-grow: 1;
`

const Button = styled.button<{ side: 'left' | 'right' }>`
   ${Base}
   cursor: pointer;
   border-radius: ${({ side }) =>
      side == 'left' ? '100px 0 0 100px' : '0 100px 100px 0'};
`

const Form = styled.form`
   display: flex;
   flex-direction: row;
`

export default function NumberIncrementInput(props: NumberIncrementInputProps) {
   const { min, max, step, disabled, label } = props
   const { fieldProps, formProps, setValue, parsedValue } = useStatefulField<number>({
      ...props,
      parseValue: v => {
         const parsed = Number.parseInt(v)
         return clamp(min ?? 0, Number.isInteger(parsed) ? parsed : 0, max)
      },
   })

   const increment = () => setValue(clamp(min ?? 0, parsedValue + (step ?? 1), max))
   const decrement = () => setValue(clamp(min ?? 0, parsedValue - (step ?? 1), max))

   return (
      <WithLabel label={label}>
         <Form {...formProps}>
            <Button type="button" disabled={disabled} side="left" onClick={decrement}>
               -
            </Button>
            <Input disabled={disabled} {...fieldProps} size={1} />
            <Button type="button" disabled={disabled} side="right" onClick={increment}>
               +
            </Button>
         </Form>
      </WithLabel>
   )

   function clamp(min: number, value: number, max?: number) {
      return Math.max(min, max ? Math.min(value, max) : value)
   }
}
