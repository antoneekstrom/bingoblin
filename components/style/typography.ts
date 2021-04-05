import styled from 'styled-components'
import colors from './colors'

export type LabelStyle = {
   disabled?: boolean
}

export const BingoTitle = styled.h1`
   font-family: "Raleway";
   font-weight: 900;
   text-transform: uppercase;
   color: ${colors.PRIMARY};
   font-size: 36px;
   letter-spacing: 36px;
   text-align: center;
   margin: 1em;
   user-select: none;
   cursor: pointer;
`

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

export const BingoCellText = styled.p`
   font-family: "Nunito";
   font-weight: 700;
   text-transform: "capitalize";
   color: ${colors.PRIMARY};
   font-size: 16px;
   text-align: center;
   text-overflow: ellipsis;
`