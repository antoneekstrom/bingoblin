import styled from 'styled-components'

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

export const SettingsLayout = styled.div`
   height: 100%;
   padding-top: 10rem;

   display: flex;
   flex-direction: column;
   align-items: center;

   div.input {
      padding: 0.5rem 0;
   }
`