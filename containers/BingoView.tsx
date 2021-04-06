import React, { useState } from 'react'
import useBingo from '../hooks/useBingo'
import BingoModel from '../common/BingoModel'
import { useRouter } from 'next/dist/client/router'
import { ConnectedBingoCard } from '../components/BingoCard'
import PageDropzone from '../components/PageDropzone'
import { BingoPage, Sidebar } from '../components/style/page'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { ConnectedBingoMenu } from '../components/BingoMenu'
import { BingoContext, BingoContextProvider } from '../hooks/useBingoContext'

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
            <ConnectedBingoMenu />
            <Sidebar />
            <ConnectedBingoCard />
            <PageDropzone onDrop={onDrop} />
         </BingoPage>
      </BingoContextProvider>
   )

   function SocketErrorView() {
      return <h1>error connecting to websocket</h1>
   }

   async function onDrop(e: React.DragEvent) {
      const f = e.dataTransfer.files?.[0]
      if (state && f) {
         const t = await f.text()
         bingo?.requestStateUpdate(
            FrontendBingoModel.from(state)
               .setCellNames(t.split('\n'))
               .getState()
         )
      }
   }

   function useBingoCode(initialCode: string) {
      const query = useRouter().query as { id?: string }
      return useState<string>(query.id ?? initialCode)
   }
}
