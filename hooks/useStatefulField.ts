import { useState } from 'react'

export type UseStatefulFieldInit<T> = {
   onValue?: (value: T | undefined) => void
   parseValue: (value: string) => T
   initialValue: T
   blur?: boolean
}

export default function useStatefulField<T>({
   blur,
   initialValue,
   onValue,
   parseValue
}: UseStatefulFieldInit<T>) {
   const [value, setValue] = useState<string>(`${initialValue}`)
   const parsedValue = parseValue(value)

   function onBlur(_: React.FocusEvent<unknown>) {
      if (blur) {
         onValue?.(parseValue(value))
      }
   }

   function onSubmit(e: React.FormEvent<unknown>) {
      e.preventDefault()
      onValue?.(parseValue(value))
   }

   function onChange(e: React.FormEvent<HTMLInputElement>) {
      setValue(e.currentTarget.value)
   }

   return {
      value,
      parsedValue,
      setValue: (v: T) => setValue(`${v}`),
      fieldProps: { onChange, onBlur, value },
      formProps: { onSubmit },
   }
}
