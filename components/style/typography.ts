import styled from 'styled-components'
import colors from './colors'

export type LabelStyle = {
   disabled?: boolean
}

export const Header = styled.h2`
   font-family: "Raleway";
   font-weight: 700;
   text-transform: "capitalize";
   color: ${colors.SECONDARY};
   font-size: 36px;
`

export const Label = styled.label<LabelStyle>`
   font-family: "Nunito";
   font-weight: 600;
   text-transform: "capitalize";
   color: ${({disabled}) => disabled ? colors.SECONDARY_DISABLED : colors.SECONDARY};
   font-size: 16px;
`