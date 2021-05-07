import React, { useContext } from 'react'
import { BingoPlayer, BingoState } from '../common/model/bingo'
import { BingoFrontend } from '../common/model/protocol'

export type BingoContext = {
   state?: BingoState
   bingo?: BingoFrontend
   self?: BingoPlayer
   isCardHiddenState: [
      isHidden: boolean,
      setIsCardHidden: React.Dispatch<React.SetStateAction<boolean>>
   ]
   bingoCodeState: [
      code: string,
      setBingoCode: React.Dispatch<React.SetStateAction<string>>
   ],
   isEditingState: [
      isEditing: boolean,
      setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
   ],
}

const bingoContext = React.createContext<BingoContext>({
   bingoCodeState: ['NO_CONTEXT', () => console.log("NO_CONTEXT")],
   isCardHiddenState: [true, () => console.log("NO_CONTEXT")],
   isEditingState: [false, () => console.log("NO_CONTEXT")],
})

bingoContext.displayName = 'BingoContext'

export const BingoContextConsumer = bingoContext.Consumer
export const BingoContextProvider = bingoContext.Provider

export default function useBingoContext() {
   return useContext(bingoContext)
}
