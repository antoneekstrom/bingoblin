import { Socket as ClientSocket } from "socket.io-client";
import { Socket as ServerSocket } from "socket.io";
import { ClientEmitterWrapper, EmitterListener, EmitterListenerAny, ServerEmitterWrapper } from "./Emitter";

export class ClientSocketEmitterWrapper<M, S extends typeof ClientSocket | ServerSocket> implements ClientEmitterWrapper<M, S> {

   constructor(private socket: S) {}

   get id() {
      return this.inner().id
   }

   inner(): S {
      return this.socket
   }

   on<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>) {
      this.inner().on(event, fn as any)
   }

   once<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>) {
      this.inner().once(event, fn as any)
   }

   off<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>) {
      this.inner().off(event, fn)
   }

   emit<E extends keyof M & string>(event: E, data?: M[E]) {
      this.inner().emit(event, data)
   }

}

export class ServerSocketEmitterWrapper<M, S extends ServerSocket> extends ClientSocketEmitterWrapper<M, S> implements ServerEmitterWrapper<M, S> {

   constructor(socket: S) {
      super(socket)
   }

   join(id: string): void {
      this.inner().join(id)
   }

   leave(id: string): void {
      this.inner().leave(id)
   }

   onAny<E extends keyof M & string>(fn: EmitterListenerAny<M[E], E>) {
      this.inner().onAny(fn)
   }

   offAny<E extends keyof M & string>(fn: EmitterListenerAny<M[E], E>) {
      this.inner().offAny(fn)
   }

}