import React, { useEffect, useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'
import useBingoContext from '../hooks/useBingoContext'
import BingoBoardSettings from './BingoBoardSettings'
import BingoCode from './BingoCode'
import BingoPalette from './BingoPalette'
import BingoPlayerList from './BingoPlayerList'
import ButtonGroup from './ButtonGroup'
import StatefulTextField from './StatefulTextInput'
import { Flex } from './style/layout'
import { Header } from './style/typography'

export type BingoMenuProps = {
   disabled?: boolean
   bingo?: BingoFrontend
   self?: BingoPlayer
   state?: BingoState
   bingoCode: string
   setBingoCode: (code: string) => void
}

export default function BingoMenu() {
   const {
      bingo,
      state,
      bingoCodeState: [bingoCode, setBingoCode],
      self,
   } = useBingoContext()

   const [localColor, setLocalColor] = useState<string | undefined>()

   useEffect(() => {
      localColor && setColor(localColor)
   }, [bingoCode])

   return (
      <Flex
         align="center"
         justify="start"
         direction="column"
         expand
         style={{ maxWidth: '50%', paddingTop: '4rem' }}
      >
         <Header>Me</Header>
         <Flex gap="2em" direction="column">
            <BingoCode bingoCode={bingoCode} setBingoCode={setBingoCode} />

            <StatefulTextField
               label="Name"
               placeholder="Enter display name"
               initialValue={self?.name ?? ''}
               onValue={(name) => {
                  name && bingo?.register(name, bingoCode, self)
               }}
               blur
            />

            <BingoPalette
               onSetColor={setColor}
               selected={self?.color ?? localColor}
            />

            {state && <BingoPlayerList players={state?.players} />}

            {self?.role == 'owner' && <BingoBoardSettings />}
         </Flex>
      </Flex>
   )

   function setColor(color: string) {
      if (self && state) {
         bingo?.requestStateUpdate(
            FrontendBingoModel.from(state)
               .modifyPlayer(self.id, (prev) => {
                  prev.color = color
                  return prev
               })
               .getState()
         )
      } else {
         setLocalColor(color)
      }
   }
}
