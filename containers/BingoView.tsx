import React, { useState } from 'react'
import useBingo from '../hooks/useBingo'
import BingoModel from '../common/BingoModel'
import { useRouter } from 'next/dist/client/router'
import BingoCard from '../components/BingoCard'
import PageDropzone from '../components/PageDropzone'
import { Header } from '../components/style/typography'
import { BingoPage, SettingsLayout, Sidebar } from '../components/style/page'
import BingoPalette from '../components/BingoPalette'
import StatefulTextField from '../components/StatefulTextField'

export default function BingoView() {
   const router = useRouter()
   const bingoId = (router.query as any).id
   const [bingo, state, socket] = useBingo(bingoId)
   const [isCardHidden, setIsCardHidden] = useState(true)
   const toggleCardHidden = () => setIsCardHidden(state => !state)

   if (!socket) {
      return <h1>error connecting to websocket</h1>
   }

   const self =
      state && BingoModel.from(state).findPlayerById(socket?.inner().id)

   return (
      <BingoPage onDragOver={(e) => e.preventDefault()}>
         <Sidebar />
         <SettingsLayout>
            <Header>Me</Header>
            <StatefulTextField
               disabled={!isCardHidden}
               label="Name"
               initialValue={self?.name}
               onValue={(name) => {
                  bingo?.register(name, bingoId)
               }}
            />
            <BingoPalette disabled={!isCardHidden} onSetColor={setColor} selected={self?.color} />
         </SettingsLayout>
         <Sidebar />
         {state && (
            <BingoCard
               board={state.board}
               hidden={isCardHidden}
               onClick={toggleCardHidden}
               onClickTitle={toggleCardHidden}
            />
         )}

         <PageDropzone onDrop={onDrop} />
      </BingoPage>
   )

   function setColor(color: string) {
      if (self && state) {
         bingo?.requestStateUpdate(
            BingoModel.from(state)
               .modifyPlayer(self.id, (prev) => {
                  prev.color = color
                  return prev
               })
               .getState()
         )
      } else {
         console.error('setColor - self or state is undefined')
      }
   }

   async function onDrop(e: React.DragEvent) {
      const f = e.dataTransfer.files?.[0]
      if (state && f) {
         const t = await f.text()
         bingo?.requestStateUpdate(
            BingoModel.from(state).setCellNames(t.split('\n')).getState()
         )
      }
   }
}
