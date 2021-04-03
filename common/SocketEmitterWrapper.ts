import { Socket as ClientSocket } from "socket.io-client";
import { Socket as ServerSocket } from "socket.io";
import { Emitter, EmitterListener, EmitterWrapper } from "./Emitter";

export default class ConcreteEmitterWrapper<M, S extends typeof ClientSocket | ServerSocket> implements EmitterWrapper<M, S> {

   constructor(private socket: S) {}

   get id() {
      return this.inner().id
   }

   inner(): S {
      return this.socket
   }

   on<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): Emitter<M> {
      this.socket.on(event, fn as any)
      return this
   }

   once<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): Emitter<M> {
      this.socket.once(event, fn as any)
      return this
   }

   emit<E extends keyof M & string>(event: E, data?: M[E]) {
      this.socket.emit(event, data)
   }

}