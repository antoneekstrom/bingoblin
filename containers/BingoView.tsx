import React, { useState } from 'react'
import useBingo from '../hooks/useBingo'
import BingoModel from '../common/BingoModel'
import BingoCard from '../components/BingoCard'
import { BingoPage, Sidebar } from '../components/BingoView.style'
import BingoMenu from '../components/BingoMenu'
import { BingoContext, BingoContextProvider } from '../hooks/useBingoContext'
import { BingoContainer } from '../components/BingoCard.style'
import useBingoCode from '../hooks/useBingoCode'
import { ClientSocketEmitterWrapper } from '../common/SocketEmitterWrapper'
import { BingoState } from '../common/model/bingo'
import DefaultThemeProvider, { Disabled } from '../components/ThemeProvider'

export default function BingoView() {
   const [bingoCode, setBingoCode] = useBingoCode('bongo')
   const [bingo, state, socket] = useBingo(bingoCode)
   const [isCardHidden, setIsCardHidden] = useState(true)

   if (!socket) {
      return <SocketErrorView />
   }

   const self = state && getSelf(state, socket)
   const bingoContext = getBingoContext()

   return (
      <DefaultThemeProvider>
         <BingoContextProvider value={bingoContext}>
            <BingoPage
               onDragOver={(e) => e.preventDefault()}
               onWheel={(e) => setIsCardHidden(e.deltaY > 0)}
            >
               <Sidebar />
               <BingoContainer>
                  <Disabled state={!isCardHidden}>
                     <BingoMenu />
                  </Disabled>
                  <BingoCard />
               </BingoContainer>
               <Sidebar />
            </BingoPage>
         </BingoContextProvider>
      </DefaultThemeProvider>
   )

   function SocketErrorView() {
      return <h1>error connecting to websocket</h1>
   }

   function getSelf(state: BingoState, socket: ClientSocketEmitterWrapper<unknown, any>) {
      return BingoModel.from(state).findPlayerById(socket?.id)  
   }

   function getBingoContext(): BingoContext {
      return {
         bingo,
         state,
         self,
         bingoCodeState: [bingoCode, setBingoCode],
         isCardHiddenState: [isCardHidden, setIsCardHidden]
      }
   }
}
