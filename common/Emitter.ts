
/**
 * 
 */
export type EmitterListener<T> = (...args: T[]) => void

/**
 * 
 */
export type EmitterListenerAny<T, E> = (e: E, ...args: T[]) => void

/**
 * 
 */
export interface Emitter<M> {

   /**
    * 
    */
   readonly id: string

   /**
    * 
    * @param event 
    * @param fn 
    */
   on<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): void

   /**
    * 
    * @param event 
    * @param fn 
    */
   once<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): void

   /**
    * 
    * @param event 
    * @param fn 
    */
   off<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): void
 
   /**
    * 
    * @param event 
    * @param data 
    */
   emit<E extends keyof M & string>(event: E, data?: M[E]): void

   /**
    * 
    * @param fn 
    */
   onAny<E extends keyof M & string>(fn: EmitterListenerAny<M[E], E>): void

   /**
    * 
    * @param fn 
    */
   offAny<E extends keyof M & string>(fn: EmitterListenerAny<M[E], E>): void

   /**
    * 
    * @param id 
    */
   join(id: string): void

   /**
    * 
    * @param id 
    */
   leave(id: string): void

}

/**
 * Wraps an emitter to provide typesafe emitter interaction.
 */
export interface EmitterWrapper<M, T> extends Emitter<M> {

   /**
    * @return The emitter which is wrapped
    */
   inner(): T

}