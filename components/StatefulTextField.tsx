import React from 'react'
import useStatefulField, { UseStatefulFieldInit } from '../hooks/useStatefulField'
import TextField, { TextFieldProps } from './TextField'

type InnerProps = Pick<TextFieldProps, 'onClick' | 'label' | 'disabled'>

export type StatefulTextFieldProps = InnerProps & Omit<UseStatefulFieldInit<string>, 'parseValue'>

export default function StatefulTextField(props: StatefulTextFieldProps) {
   const { onClick, label, disabled } = props
   const { fieldProps, formProps } = useStatefulField({...props, parseValue: value => value })
   const inner: InnerProps = {
      onClick,
      label,
      disabled
   }

   return (
      <form {...formProps}>
         <TextField {...fieldProps} {...inner} />
      </form>
   )
}