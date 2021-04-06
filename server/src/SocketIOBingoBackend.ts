import { Server } from 'socket.io'
import {
   BingoBackend,
   BingoClientEventInfo,
   BingoClient,
   BingoClientEvent,
   BingoEventData,
   BingoEventMap,
} from '../../common/model/protocol'
import { Observable, Subject } from 'rxjs'
import EmitterBingoClient from './EmitterBingoClient'
import { ServerSocketEmitterWrapper } from '../../common/SocketEmitterWrapper'

export default class SocketIOBingoBackend implements BingoBackend {
   private eventSubject = new Subject<BingoClientEventInfo<BingoClientEvent>>()
   private disconnectSubject = new Subject<BingoClient>()
   private connectSubject = new Subject<BingoClient>()

   constructor(private server: Server) {
      server.on('connection', (socket) => {
         console.log(`socket connected ${socket.id}`)

         const client = new EmitterBingoClient(new ServerSocketEmitterWrapper(socket))
         const disconnect = this.connect(client)

         socket.on('disconnect', () => {
            disconnect()
            this.disconnectSubject.next(client)
         })

         this.connectSubject.next(client)
      })
   }

   onConnect(fn: (client: BingoClient) => void) {
      const sub = this.connectSubject.subscribe(fn)
      return () => sub.unsubscribe()
   }

   onDisconnect(fn: (client: BingoClient) => void) {
      const sub = this.disconnectSubject.subscribe(fn)
      return () => sub.unsubscribe()
   }

   observeClientEvent<E extends BingoClientEvent>(
      e: E
   ): Observable<BingoClientEventInfo<E>> {
      return this.eventSubject.pipe(
         (source) =>
            new Observable((observer) => {
               source.subscribe((srcInfo) => {
                  if (srcInfo.e == e) {
                     observer.next(srcInfo as any)
                  }
               })
            })
      )
   }

   broadcast<E extends keyof BingoEventMap>(
      bingoCode: string,
      e: E,
      data: BingoEventData<E>
   ): void {
      this.server.to(bingoCode).emit(e, data)
   }

   connect(client: BingoClient) {
      console.log(`client connected to backend ${client.getClientId()}`)
      const clientObservable = client.observe()
      const subscription = clientObservable.subscribe(this.eventSubject)
      return () => subscription.unsubscribe()
   }
}
