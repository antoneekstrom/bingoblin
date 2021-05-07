import styled from 'styled-components'
import { BASE, DISABLED } from './Base.style'
import colors from './style/colors'

export type StyleProps = unknown

export default styled.div`
   ${BASE}
   ${DISABLED}

   display: flex;
   flex-direction: row;

   padding: 0;

   overflow: hidden;

   button {
      ${BASE}
      background: none;
      border: none;
      outline: none;

      border-radius: 0;

      cursor: pointer;

      &:hover {
         background-color: ${colors.PRIMARY_ACTIVE};
      }

      & > * {
         margin: 0;
      }
   }
`

export const E = styled.button``