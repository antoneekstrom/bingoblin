import {
   BingoClient,
   BingoClientEvent,
   BingoClientEventInfo,
   BingoEventData,
   BingoEventMap,
} from '../../common/model/protocol'
import { ServerEmitter } from '../../common/Emitter'
import { fromEventPattern, Observable } from 'rxjs'

export default class EmitterBingoClient implements BingoClient {
   constructor(
      private emitter: ServerEmitter<BingoEventMap>,
      private bingoCode?: string
   ) {}

   get id() {
      return this.emitter.id
   }

   getClientId(): string {
      return this.id
   }

   getBingoCode() {
      return this.bingoCode
   }

   setBingoCode(code?: string): void {
      if (this.bingoCode) {
         this.emitter.leave(this.bingoCode)
      }
      if (code && code.length > 0) {
         this.emitter.join(code)
      }
      this.bingoCode = code
   }

   observe(): Observable<BingoClientEventInfo<'get-state' | 'request-state-update' | 'register-user'>> {
      return this.makeClientObservable()
   }

   send<E extends keyof BingoEventMap>(e: E, data: BingoEventData<E>): void {
      this.emitter.emit(e, data)
   }

   private makeClientObservable<E extends BingoClientEvent>() {
      return fromEventPattern<BingoClientEventInfo<E>>(
         handler => this.emitter.onAny((e, data) => handler({e, data, client: this})),
         handler => this.emitter.offAny((e, data) => handler({e, data, client: this}))
      )
   }
}
