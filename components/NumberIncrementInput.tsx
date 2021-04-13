import React from 'react'
import useStatefulField, { UseStatefulFieldInit } from '../hooks/useStatefulField'
import { ButtonHalf } from './Input.style'
import { NumberIncrementInputForm, NumberIncrementInputInner } from './NumberIncrementInput.style'
import WithLabel from './WithLabel'

export type NumberIncrementInputProps = Omit<UseStatefulFieldInit<number>, 'parseValue'> & {
   min?: number
   max?: number
   step?: number
   disabled?: boolean
   label?: string
}

export default function NumberIncrementInput(props: NumberIncrementInputProps) {
   const { min, max, step, disabled, label } = props
   const { fieldProps, formProps, setValue, parsedValue } = useStatefulField<number>({
      ...props,
      parseValue: v => {
         const parsed = Number.parseInt(v)
         return clamp(min ?? 0, Number.isInteger(parsed) ? parsed : 0, max)
      },
   })

   const increment = () => {
      const value = clamp(min ?? 0, parsedValue + (step ?? 1), max)
      setValue(value)
      props.onValue?.(value)
   }
   const decrement = () => {
      const value = clamp(min ?? 0, parsedValue - (step ?? 1), max)
      setValue(value)
      props.onValue?.(value)
   }

   return (
      <WithLabel label={label}>
         <NumberIncrementInputForm {...formProps}>
            <ButtonHalf type="button" disabled={disabled} side="left" onClick={decrement}>
               -
            </ButtonHalf>
            <NumberIncrementInputInner disabled={disabled} {...fieldProps} size={1} />
            <ButtonHalf type="button" disabled={disabled} side="right" onClick={increment}>
               +
            </ButtonHalf>
         </NumberIncrementInputForm>
      </WithLabel>
   )

   function clamp(min: number, value: number, max?: number) {
      return Math.max(min, max ? Math.min(value, max) : value)
   }
}
