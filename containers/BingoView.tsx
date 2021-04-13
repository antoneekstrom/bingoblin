import React, { useState } from 'react'
import useBingo from '../hooks/useBingo'
import BingoModel from '../common/BingoModel'
import { useRouter } from 'next/dist/client/router'
import { ConnectedBingoCard } from '../components/BingoCard'
import PageDropzone from '../components/PageDropzone'
import { BingoPage, Sidebar } from '../components/BingoView.style'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { ConnectedBingoMenu } from '../components/BingoMenu'
import { BingoContext, BingoContextProvider } from '../hooks/useBingoContext'
import { BingoBoard, BingoCell } from '../common/model/bingo'
import { shuffle } from '../common/arrays'
import { BingoContainer } from '../components/BingoCard.style'

export default function BingoView() {
   const [bingoCode, setBingoCode] = useBingoCode('bongo')
   const [bingo, state, socket] = useBingo(bingoCode)

   const [isCardHidden, setIsCardHidden] = useState(true)

   if (!socket) {
      return <SocketErrorView />
   }

   const self = state && BingoModel.from(state).findPlayerById(socket?.id)
   const bingoContext: BingoContext = {
      bingo,
      state,
      self,
      bingoCodeState: [bingoCode, setBingoCode],
      isCardHiddenState: [isCardHidden, setIsCardHidden]
   }

   return (
      <BingoContextProvider value={bingoContext}>
         <BingoPage
            onDragOver={(e) => e.preventDefault()}
            onWheel={(e) => setIsCardHidden(e.deltaY > 0)}
         >
            <Sidebar />
            <BingoContainer>
               <ConnectedBingoMenu />
               <ConnectedBingoCard />
            </BingoContainer>
            <Sidebar />
         </BingoPage>
      </BingoContextProvider>
   )

   function SocketErrorView() {
      return <h1>error connecting to websocket</h1>
   }

   async function onDrop(e: React.DragEvent) {
      const f = e.dataTransfer.files?.[0]
      if (state && f) {
         const t = (JSON.parse(await f.text()) as BingoBoard)
         t.items = shuffle(t.items).map((item, index) => ({...item, index} as BingoCell))
         bingo?.requestStateUpdate(
            new FrontendBingoModel(t, state.players)
               .getState()
         )
      }
   }

   function useBingoCode(initialCode: string) {
      const query = useRouter().query as { id?: string }
      return useState<string>(query.id ?? initialCode)
   }
}
