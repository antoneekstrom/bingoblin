import { BingoState } from "../common/model/bingo";
import { BingoEvent, BingoEventData, BingoEventMap, BingoFrontend } from "../common/model/protocol";
import { Observable } from 'rxjs'
import SocketEmitterWrapper from '../common/SocketEmitterWrapper';
import { Socket } from "socket.io-client";

export default class ConcreteBingoFrontend implements BingoFrontend {

   constructor(private socket: SocketEmitterWrapper<BingoEventMap, typeof Socket>) {}

   requestStateUpdate(state: BingoState): void {
      this.emit('request-state-update', state)
   }

   observeState() {
      return new Observable<BingoState>(observer => {
         this.socket.on('update-state', state => observer.next(state))
      })
   }

   register(name: string, bingoId: string) {
      const result = this.receive('register-user-response')
      this.emit('register-user', {name, bingoId})
      return result
   }

   getState() {
      const result = this.receive('update-state')
      this.emit('get-state')
      return result
   }

   protected emit<E extends BingoEvent>(e: BingoEvent, args?: BingoEventData<E>) {
      this.socket.emit(e, args)
   }

   protected receive<E extends BingoEvent>(e: E): Promise<BingoEventData<E>> {
      return new Promise((resolve) => {
         this.socket.once(e, resolve)
      })
   }

}