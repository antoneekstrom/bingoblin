import React from 'react'
import useStatefulField, {
   UseStatefulFieldInit,
} from '../hooks/useStatefulField'
import { ButtonHalf } from './Input.style'
import {
   NumberIncrementInputForm,
   NumberIncrementInputInner,
} from './IncrementInput.style'
import WithLabel from './WithLabel'
import { useTheme } from 'styled-components'

export type NumberIncrementInputProps = Omit<
   UseStatefulFieldInit<number>,
   'parseValue'
> & {
   min?: number
   max?: number
   step?: number
   label?: string
}

export default function NumberIncrementInput(props: NumberIncrementInputProps) {
   const { min, max, step, label } = props
   const {
      fieldProps,
      formProps,
      setValue,
      parsedValue,
   } = useStatefulField<number>({
      ...props,
      parseValue: (v) => {
         const parsed = Number.parseInt(v)
         return clamp(min ?? 0, Number.isInteger(parsed) ? parsed : 0, max)
      },
   })
   const { props: themeProps } = useTheme()

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
            <ButtonHalf
               {...themeProps}
               type="button"
               side="left"
               onClick={decrement}
            >
               -
            </ButtonHalf>
            <NumberIncrementInputInner
               {...fieldProps}
               {...themeProps}
               size={1}
            />
            <ButtonHalf
               {...themeProps}
               type="button"
               side="right"
               onClick={increment}
            >
               +
            </ButtonHalf>
         </NumberIncrementInputForm>
      </WithLabel>
   )

   function clamp(min: number, value: number, max?: number) {
      return Math.max(min, max ? Math.min(value, max) : value)
   }
}
