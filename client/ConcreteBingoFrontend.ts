import { BingoPlayer, BingoState } from '../common/model/bingo'
import {
   BingoEvent,
   BingoEventData,
   BingoEventMap,
   BingoFrontend,
} from '../common/model/protocol'
import { Observable } from 'rxjs'
import { ClientEmitter } from '../common/Emitter'

export default class ConcreteBingoFrontend implements BingoFrontend {
   constructor(private socket: ClientEmitter<BingoEventMap>) {}

   requestStateUpdate(state: BingoState): void {
      this.emit('request-state-update', state)
   }

   observeState() {
      const { socket } = this
      return new Observable<BingoState>((observer) => {
         function observe(state: BingoState) {
            observer.next(state)
         }
         const unobserve = () => {
            socket.off('update-state', observe)
            console.log("UNOBSERVE")
         }
         socket.on('update-state', observe)
         return unobserve
      })
   }

   spectate(bingoCode: string): Promise<BingoPlayer> {
      const result = this.receive('spectate-response')
      this.emit('spectate', bingoCode)
      return result
   }

   register(name: string, bingoCode: string, current?: Partial<BingoPlayer>) {
      const result = this.receive('register-user-response')
      this.emit('register-user', { name, bingoCode: bingoCode, current })
      return result
   }

   getState(bingoCode?: string) {
      const result = this.receive('update-state')
      this.emit('get-state', bingoCode)
      return result
   }

   protected emit<E extends BingoEvent>(
      e: BingoEvent,
      args?: BingoEventData<E>
   ) {
      this.socket.emit(e, args)
   }

   protected receive<E extends BingoEvent>(e: E): Promise<BingoEventData<E>> {
      return new Promise((resolve) => {
         this.socket.once(e, resolve)
      })
   }
}
