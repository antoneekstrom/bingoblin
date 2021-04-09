import React, { useState } from 'react'
import styled from 'styled-components'
import colors from './style/colors'
import WithLabel from './WithLabel'

export type BingoCodeProps = {
   bingoCode: string
   setBingoCode?: (bingoCode: string) => void
}

export type BingoCodeStyle = unknown

const Code = styled.input`
   background-color: ${colors.PRIMARY_DARKENED};
   padding: 0.25em 0.6em;
   align-items: center;
   font-size: 28px;
   border-radius: 10px;
   font-family: 'Nunito';
   font-weight: 700;
   text-transform: uppercase;
   margin: 0;

   border: none;
   outline: 0;
   max-width: min-content;

   text-align: center;
`

export default function BingoCode({ bingoCode, setBingoCode }: BingoCodeProps) {
   const [value, setValue] = useState(bingoCode)

   return (
      <WithLabel label="Code">
         <Code
            size={8}
            maxLength={7}
            value={value.length > 3 ? `${value.slice(0, 3)} ${value.slice(4, 6)}` : value}
            onChange={(e) => setValue(e.target.value.length > 3 ? value.slice(0, 3) + value.slice(4, 6) : e.target.value)}
         />
      </WithLabel>
   )
}
