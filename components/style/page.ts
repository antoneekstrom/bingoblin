import styled from 'styled-components'
import { props } from '.'

export type SettingsLayoutStyle = {
   align?: 'center' | 'start' | 'end'
}

export const BingoPage = styled.div`
   width: 100vw;
   height: 100vh;
   overflow: hidden;

   display: grid;
   place-items: center;
   grid-template-columns: 1fr auto 1fr;
`

export const Sidebar = styled.div`
   width: 100%;
   height: 100%;
   display: grid;
   place-items: center;
`

export const SettingsLayout = styled.div<SettingsLayoutStyle>`
   height: 100%;

   display: flex;
   flex-direction: column;
   align-items: ${props('align') ?? 'center'};

   div.input {
      padding: 0.5rem 0;
   }
`
