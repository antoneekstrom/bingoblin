import React, { useEffect, useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'
import useBingoContext from '../hooks/useBingoContext'
import BingoBoardSettings from './BingoBoardSettings'
import BingoCode from './BingoCode'
import BingoPalette from './BingoPalette'
import BingoPlayerList from './BingoPlayerList'
import NumberIncrementInput from './NumberIncrementInput'
import StatefulTextField from './StatefulTextField'
import { Flex } from './style/layout'
import { Header, Label } from './style/typography'
import UserProfileCircle from './UserProfileCircle'

export type BingoMenuProps = {
   disabled?: boolean
   bingo?: BingoFrontend
   self?: BingoPlayer
   state?: BingoState
   bingoCode: string
   setBingoCode: (code: string) => void
}

export function ConnectedBingoMenu() {
   const {
      bingo,
      state,
      bingoCodeState: [bingoCode, setBingoCode],
      self,
      isCardHiddenState: [isCardHidden],
   } = useBingoContext()

   return (
      <BingoMenu
         bingo={bingo}
         bingoCode={bingoCode}
         setBingoCode={setBingoCode}
         self={self}
         state={state}
         disabled={!isCardHidden}
      />
   )
}

export default function BingoMenu({
   disabled,
   bingo,
   state,
   self,
   bingoCode,
   setBingoCode,
}: BingoMenuProps) {
   const [localColor, setLocalColor] = useState<string | undefined>()

   useEffect(() => {
      localColor && setColor(localColor)
   }, [bingoCode])

   return (
      <Flex align="center" justify="start" expand style={{ maxWidth: '50%', paddingTop: '4rem' }}>
         <Header>Me</Header>
         <Flex gap="2em">
            <BingoCode bingoCode={bingoCode} setBingoCode={setBingoCode} />

            <StatefulTextField
               disabled={disabled}
               label="Name"
               initialValue={self?.name ?? ''}
               onValue={(name) => {
                  name && bingo?.register(name, bingoCode, self)
               }}
               blur
            />

            <BingoPalette
               disabled={disabled}
               onSetColor={setColor}
               selected={self?.color ?? localColor}
            />

            {state && <BingoPlayerList players={state?.players} />}

            {self?.role == 'owner' && <BingoBoardSettings/>}
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
