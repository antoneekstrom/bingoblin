import React, { useEffect, useState } from 'react'
import FrontendBingoModel from '../client/FrontendBingoModel'
import { BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'
import useBingoContext from '../hooks/useBingoContext'
import BingoCode from './BingoCode'
import BingoPalette from './BingoPalette'
import NumberIncrementInput from './NumberIncrementInput'
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

   useEffect(() => {
      localColor && setColor(localColor)
   }, [bingoCode])

   return (
      <SettingsLayout align="center" style={{ paddingTop: '10rem' }}>
         <Header>Me</Header>
         <SettingsLayout>
            
            <BingoCode
               bingoCode={bingoCode}
               setBingoCode={setBingoCode}
               disabled={disabled}
            />

            <StatefulTextField
               disabled={disabled}
               label="Name"
               initialValue={self?.name ?? ''}
               onValue={(name) => {
                  name && bingo?.register(name, bingoCode, self)
               }}
               blur
            />

            <NumberIncrementInput
               disabled={disabled}
               min={2}
               max={10}
               initialValue={state?.board.size ?? 5}
               label="Size"
               onValue={size => {
                  state && size && bingo?.requestStateUpdate(FrontendBingoModel.from(state).setSize(size).getState())
               }}
            />

            <BingoPalette
               disabled={disabled}
               onSetColor={setColor}
               selected={self?.color ?? localColor}
            />

            <div style={{ paddingTop: '2rem', display: 'flex', flexDirection: 'column' }}>
               <Label>Players</Label>
               {state?.players
                  .filter((p) => p.state != 'spectating')
                  .map((p) => (
                     <UserProfileCircle name={p.name} key={p.id} color={p.color} />
                  ))}
            </div>

         </SettingsLayout>
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
