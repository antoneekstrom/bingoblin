import styled from 'styled-components'
import { Base } from './Base.style'
import colors from './style/colors'

export const NumberIncrementInputInner = styled.input`
   ${Base}
   text-align: center;
   border-radius: 0;

   flex-grow: 1;
`

export const NumberIncrementInputForm = styled.form`
   display: flex;
   flex-direction: row;

   border-radius: 100px;
   border-color: transparent;
   border-style: solid;
   border-width: 2px;

   &:focus-within {
      border-color: ${colors.SECONDARY_DARKENED};
   }
`
