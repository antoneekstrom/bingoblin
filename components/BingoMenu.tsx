import React, { useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'
import useBingoContext from '../hooks/useBingoContext'
import BingoPalette from './BingoPalette'
import StatefulTextField from './StatefulTextField'
import { SettingsLayout } from './style/page'
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

   return (
      <SettingsLayout>
         <Header>Me</Header>
         <StatefulTextField
            disabled={disabled}
            label="Name"
            initialValue={self?.name}
            onValue={(name) => {
               name && bingo?.register(name, bingoCode, self)
            }}
            blur
         />
         <StatefulTextField
            disabled={disabled}
            label="Bingo Code"
            initialValue={bingoCode}
            onValue={(code) => {
               code && setBingoCode(code)
            }}
            blur
         />
         <BingoPalette
            disabled={disabled}
            onSetColor={setColor}
            selected={self?.color ?? localColor}
         />

         <Label>Players</Label>
         {state?.players.map((p) => (
            <UserProfileCircle name={p.name} key={p.id} color={p.color} />
         ))}

         {self?.role == 'owner' && (
            <>
               <Header>Bingo Settings</Header>
            </>
         )}
      </SettingsLayout>
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
