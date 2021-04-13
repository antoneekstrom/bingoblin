import styled from 'styled-components'

export type SettingsLayoutStyle = {
   align?: 'center' | 'start' | 'end'
}

export const BingoPage = styled.div`
   width: 100vw;
   height: 100vh;
   overflow: hidden;

   /* Splits the page into two sidebars and the main content in the center */
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