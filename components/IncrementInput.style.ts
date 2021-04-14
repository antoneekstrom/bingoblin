import styled from 'styled-components'
import { BASE, BORDER, DISABLED, FOCUSED } from './Base.style'

export const NumberIncrementInputInner = styled.input`
   ${BASE}
   ${DISABLED}
   text-align: center;
   border-radius: 0;

   flex-grow: 1;
`

export const NumberIncrementInputForm = styled.form`
   ${BORDER}
   ${FOCUSED}
   ${DISABLED}

   display: flex;
   flex-direction: row;

   border-radius: 100px;
`
