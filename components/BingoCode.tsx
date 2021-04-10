import React from 'react'
import styled from 'styled-components'
import useStatefulField from '../hooks/useStatefulField'
import colors from './style/colors'
import WithLabel from './WithLabel'

export type BingoCodeProps = {
   bingoCode: string
   setBingoCode?: (bingoCode: string) => void
   disabled?: boolean
}

export type BingoCodeStyle = {
   disabled?: boolean
}

const Code = styled.input<BingoCodeStyle>`
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

   &:disabled {
      color: ${colors.SECONDARY_DISABLED};
      background-color: ${colors.PRIMARY_DISABLED};
   }
`

export default function BingoCode({ bingoCode, setBingoCode, disabled }: BingoCodeProps) {
   const { fieldProps, formProps } = useStatefulField({
      blur: true,
      initialValue: bingoCode,
      onValue: code => code && setBingoCode?.(code),
      parseValue: value => value
   })

   return (
      <WithLabel as="form" label="Code" {...formProps}>
         <Code disabled={disabled} size={8} maxLength={7} {...fieldProps} />
      </WithLabel>
   )
}
