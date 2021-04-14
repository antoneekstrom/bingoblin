import { BingoState } from "../common/model/bingo";
import BingoFrontendFactory from "../client/BingoFrontendFactory";
import useMakeSocket from "../hooks/useMakeSocket";
import { BingoFrontend } from '../common/model/protocol';
import { useEffect, useState } from "react";
import { ClientSocketEmitterWrapper } from "../common/SocketEmitterWrapper";

export type UseBingoReturn = [
   bingo: BingoFrontend | undefined,
   state: BingoState | undefined,
   socket: ClientSocketEmitterWrapper<unknown, any> | undefined
]

export default function useBingo(bingoCode: string): UseBingoReturn {
   const [state, setState] = useState<BingoState>()
   const [bingo, setBingo] = useState<BingoFrontend>()
   let socket = useMakeSocket()

   useEffect(() => {
      if (bingoCode && socket) {
         const bingo = BingoFrontendFactory.create(socket)
         setBingo(bingo)
         
         const subscription = bingo.observeState().subscribe(updateState)
         bingo.spectate(bingoCode)
         bingo.getState(bingoCode)
         
         return () => {
            subscription.unsubscribe()
         }
      }
   }, [bingoCode, socket])


   function updateState(state: BingoState) {
      setState(old => Object.assign({}, old, state))
   }

   return [bingo, state, socket && new ClientSocketEmitterWrapper(socket)]
}