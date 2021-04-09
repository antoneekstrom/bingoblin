import React, { useState } from 'react'
import styled from 'styled-components'

export type EditableProps = {
   el: React.ComponentType<{ as?: any } & React.HTMLProps<HTMLElement>>
   value: string
}

export type EditableStyle = unknown

const Input = styled.input`
   border: none;
`

export default function Editable({ el: El, value }: EditableProps) {
   const [isEditing, setIsEditing] = useState<boolean>(false)

   return (
      <span style={{width: "min-content"}}>
         {isEditing ? (
            <El onClick={() => setIsEditing((b) => !b)}>{value}</El>
         ) : (
            <El as={Input} onClick={() => setIsEditing((b) => !b)} value={value} />
         )}
      </span>
   )
}
