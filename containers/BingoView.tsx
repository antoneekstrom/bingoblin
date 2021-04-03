import React, { useState } from 'react'
import styled from 'styled-components'
import { BingoCell } from "../common/model/bingo"
import BingoGrid from "../components/BingoGrid"
import { BingoGridCellFactory } from '../components/BingoGridCell'
import useBingo from '../hooks/useBingo'
import BingoModel from '../common/BingoModel'
import BingoPalette from '../components/BingoPalette'
import BingoPlayerList from '../components/BingoPlayerList'
import PageDropzone from '../components/PageDropzone'
import { useRouter } from 'next/dist/client/router'

export type BingoViewStyle = unknown

const View = styled.div`
   width: 100vw;
   height: 100vh;
   overflow: hidden;

   display: grid;
   place-items: center;
   grid-template-columns: 1fr auto 1fr;
`

const BingoContainer = styled.div`
   width: 90vmin;
   height: 90vmin;
`

const Sidebar = styled.div`
   width: 100%;
   height: 100%;
   display: grid;
   place-items: center;
`

export default function BingoView() {
   const [name, setName] = useState('bingomannen123')
   const bingoId = (useRouter().query as any).id
   const [bingo, state, socket] = useBingo(bingoId)

   if (!socket) {
      return <h1>error connecting to websocket</h1>
   }

   if (!state) {
      return <h1>loading..</h1>
   }

   const self = BingoModel.from(state).findPlayerById(socket?.inner().id)

   return (
      <View onDrop={console.log} onDragOver={e => e.preventDefault()}>
         <Sidebar>
            <div>
               <p>bingoId: {bingoId}</p>
               <form onSubmit={e => {
                  e.preventDefault()
                  bingo?.register(name, bingoId)
               }}>
                  <label>Name:</label>
                  <input type="text" onChange={e => setName(e.target.value)} value={name} />
                  <input type="submit" value="set" />
               </form>
               {self && <BingoPalette color={self?.color} onSetColor={setColor}/>}
               <BingoPlayerList players={state.players} />
            </div>
         </Sidebar>

         <BingoContainer>
            <BingoGrid {...state.board} cell={!self ? BingoGridCellFactory.unavailable() : BingoGridCellFactory.base(c => setCell(c))} />
         </BingoContainer>

         <PageDropzone onDrop={onDrop} />

         <Sidebar>
         </Sidebar>
      </View>
   )

   function setCell(cell: BingoCell) {
      if (self && state) {
         console.log("setCell", {color: self.color, cell})
         bingo?.requestStateUpdate(BingoModel.from(state).toggleCell(cell.index, self.color).getState())
      }
      else {
         console.error("setCell - self or state is undefined")
      }
   }

   function setColor(color: string) {
      if (self && state) {
         bingo?.requestStateUpdate(BingoModel.from(state).modifyPlayer(self.id, (prev) => {
            prev.color = color
            return prev
         }).getState())
      }
      else {
         console.error("setColor - self or state is undefined")
      }
   }

   async function onDrop(e: React.DragEvent) {
      const f = e.dataTransfer.files?.[0]
      if (state && f) {
         const t = await f.text()
         bingo?.requestStateUpdate(BingoModel.from(state).setCellNames(t.split('\n')).getState())
      }
   }
}