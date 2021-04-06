import { BingoState } from "../common/model/bingo";
import BingoFrontendFactory from "../client/BingoFrontendFactory";
import useMakeSocket from "../hooks/useMakeSocket";
import { BingoFrontend } from '../common/model/protocol';
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export type UseBingoReturn = [
   bingo: BingoFrontend | undefined,
   state: BingoState | undefined,
   socket: typeof Socket | undefined
]

export default function useBingo(bingoCode: string): UseBingoReturn {
   const [state, setState] = useState<BingoState>()
   const [bingo, setBingo] = useState<BingoFrontend>()
   const socket = useMakeSocket()

   useEffect(() => {
      if (bingoCode && socket) {
         const bingo = BingoFrontendFactory.create(socket)
         setBingo(bingo)
         
         const subscription = bingo.observeState().subscribe(updateState)
         bingo.getState(bingoCode)
         
         return () => {
            console.log("cleanup")
            subscription.unsubscribe()
         }
      }
   }, [bingoCode, socket])


   function updateState(state: BingoState) {
      console.log(state)
      setState(old => Object.assign({}, old, state))
   }

   return [bingo, state, socket]
}