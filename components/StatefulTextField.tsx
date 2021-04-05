import React, { useState } from 'react'
import TextField, { TextFieldProps } from './TextField'

type InnerProps = Pick<TextFieldProps, 'onClick' | 'value' | 'onChange' | 'label' | 'disabled'>

export type StatefulTextFieldProps = InnerProps & {
   onValue?: (value: string) => void | string
   initialValue?: string
}

export default function StatefulTextField(props: StatefulTextFieldProps) {
   const [value, setValue] = useState(props.initialValue ?? '');
   const { onClick, label, disabled } = props
   const inner: InnerProps = {
      onClick,
      value,
      onChange,
      label,
      disabled
   }

   return (
      <form onSubmit={onSubmit}>
         <TextField {...inner} />
      </form>
   )

   function onSubmit(e: React.FormEvent<HTMLFormElement>) {
      e.preventDefault()
      const replace = props.onValue?.(value)
      if (replace)
         setValue(replace)
   }

   function onChange(e: React.FormEvent<HTMLInputElement>) {
      setValue(e.currentTarget.value)
   }
}