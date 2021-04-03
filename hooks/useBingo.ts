import { BingoState } from "../common/model/bingo";
import BingoFrontendFactory from "../client/BingoFrontendFactory";
import useMakeSocket from "../hooks/useMakeSocket";
import { BingoEventMap, BingoFrontend } from '../common/model/protocol';
import SocketEmitterWrapper from '../common/SocketEmitterWrapper';
import { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

export type UseBingoReturn = [
   bingo: BingoFrontend | undefined,
   state: BingoState | undefined,
   socket: SocketEmitterWrapper<BingoEventMap, typeof Socket> | undefined
]

export default function useBingo(bingoId: string): UseBingoReturn {
   const [state, setState] = useState<BingoState>()
   const [bingo, setBingo] = useState<BingoFrontend>()

   const socket = useMakeSocket()

   useEffect(() => {
      if (bingoId && socket) {
         const bingo = BingoFrontendFactory.create(socket)
         setBingo(bingo)
   
         bingo.observeState().subscribe(updateState)
         bingo.register('bingomannen2', bingoId)
      }
   }, [bingoId, socket])


   function updateState(state: BingoState) {
      console.log(state)
      setState(old => Object.assign({}, old, state))
   }

   return [bingo, state, socket && new SocketEmitterWrapper(socket)]
}