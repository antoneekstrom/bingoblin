import React from 'react'

export type EditableContentProps = {
   value?: string
   onChange?: (value: string | undefined) => void
   onBlur?: (value: string | undefined) => void
   el: React.ElementType<Pick<React.HTMLProps<HTMLElement>, 'onInput' | 'onBlur' | 'contentEditable'>>
}

export default function EditableContent({ value, onChange, onBlur, el: Content }: EditableContentProps) {
   return (
      <Content
         onInput={(e: any) => onChange?.(e.currentTarget.textContent)}
         onBlur={(e: any) => onBlur?.(e.currentTarget.textContent)}
         contentEditable={true}
         suppressContentEditableWarning={true}
      >{value}</Content>
   )
}