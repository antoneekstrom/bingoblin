import { Server } from "socket.io";
import { Socket } from "socket.io";
import { Bingo, BingoState } from "../../common/model/bingo";
import { BingoBackend, BingoEvent, BingoEventData, BingoEventMap } from "../../common/model/protocol";
import { EmitterListener, EmitterWrapper } from "../../common/Emitter";
import BackendBingoModel from "./BackendBingoModel";

const DEFAULT_ID = 'default'

export type BingoEmitter = EmitterWrapper<BingoEventMap, Socket>

export default class ConcreteBingoBackend implements BingoBackend {

   constructor(private server: Server, private bingo: Bingo, private id = DEFAULT_ID) {}

   connect(socket: BingoEmitter) {
      this.onConnect(socket)
      socket.inner().on('disconnect', () => this.onDisconnect(socket))
   }

   updateState(state: BingoState): void {
      this.bingo.setState(state)
      this.emit('update-state', state)
   }

   getState() {
      return this.bingo.getState()
   }

   protected onDisconnect(socket: BingoEmitter) {
      socket.inner().leave(this.id)
      const bingo = BackendBingoModel.from(this.bingo.getState())
      const player = bingo.findPlayerById(socket.id)
      
      if (player && bingo.removePlayer(player)) {
         this.updateState(bingo.getState())
      }
   }
   
   protected onConnect(socket: BingoEmitter) {
      socket.inner().join(this.id)
      this.listen(socket, 'get-state', () => {
         this.updateState(this.bingo.getState())
      })
      this.listen(socket, 'request-state-update', (state: BingoState) => {
         const bingo = BackendBingoModel.from(this.bingo.getState())
         if (bingo.findPlayerById(socket.id)) {
            this.updateState(state)
         }
      })
   }

   protected emitSocket<E extends BingoEvent>(socket: BingoEmitter, e: E, data: BingoEventData<E>) {
      socket.emit(e, data)
   }

   protected emit<E extends BingoEvent>(e: E, data: BingoEventData<E>) {
      this.server.to(this.id).emit(e, data)
   }

   protected listen<E extends BingoEvent>(socket: BingoEmitter, e: E, fn: EmitterListener<BingoEventData<E>>) {
      socket.on(e, (args: any) => fn(args))
   }

}