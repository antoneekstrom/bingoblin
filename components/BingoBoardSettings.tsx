import React, { useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { shuffle } from '../common/arrays'
import { BingoBoard, BingoCell } from '../common/model/bingo'
import useBingoContext from '../hooks/useBingoContext'
import FileInput, { FileTypes } from './FileInput'
import NumberIncrementInput from './IncrementInput'
import { Flex } from './style/layout'
import { Header } from './style/typography'
import WithLabel from './WithLabel'

export type BingoBoardSettingsProps = {}

export default function BingoBoardSettings({}: BingoBoardSettingsProps) {
   const {
      state,
      bingo,
   } = useBingoContext()

   const [bingoFile, setBingoFile] = useState<File>()

   return (
      <Flex align="center" justify="start" direction="column">
         <Header style={{marginTop: 0}}>Board</Header>

         <Flex gap="2em" expand direction="column">
            <NumberIncrementInput
               min={2}
               max={10}
               initialValue={state?.board.size ?? 5}
               label="Size"
               blur
               onValue={(size) => {
                  state &&
                     size &&
                     bingo?.requestStateUpdate(
                        FrontendBingoModel.from(state).setSize(size).getState()
                     )
               }}
            />

            <WithLabel label="Board State">
               <FileInput
                  file={bingoFile}
                  onFile={onBingoFile}
                  type={[FileTypes.json, FileTypes.text]}
               />
            </WithLabel>
         </Flex>
      </Flex>
   )

   async function onBingoFile(f: File) {
      console.log(f)
      if (state && f) {
         const t = (JSON.parse(await f.text()) as BingoBoard)
         t.items = shuffle(t.items).map((item, i) => ({...item, index: item.index ?? i} as BingoCell))
         bingo?.requestStateUpdate(
            new FrontendBingoModel(t, state.players)
               .getState()
         )
         setBingoFile(f)
      }
   }
}
