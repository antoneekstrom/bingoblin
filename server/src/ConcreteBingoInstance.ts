import { BingoInstance } from "../../common/model/protocol";

export default class ConcreteBingoInstance implements BingoInstance {
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