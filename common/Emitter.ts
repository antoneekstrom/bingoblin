
/**
 * 
 */
export type EmitterListener<T> = (...args: T[]) => void

/**
 * Copies some methods from Socket.io definitions, because they are wack
 */
export interface Emitter<M> {

   /**
    * 
    */
   readonly id: string

   /**
    * Adds a listener for a particular event. Calling multiple times will add
    * multiple listeners
    * @param event The event that we're listening for
    * @param fn The function to call when we get the event. Parameters depend on the
    * event in question
    * @return This Emitter
    */
   on<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): Emitter<M>

   /**
    * Adds a listener for a particular event that will be invoked
    * a single time before being automatically removed
    * @param event The event that we're listening for
    * @param fn The function to call when we get the event. Parameters depend on
    * the event in question
    * @return This Emitter
    */
   once<E extends keyof M & string>(event: E, fn: EmitterListener<M[E]>): Emitter<M>
 
   /**
    * Emits 'event' with the given args
    * @param event The event that we want to emit
    * @param args Optional arguments to emit with the event
    * @return This Emitter
    */
   emit<E extends keyof M & string>(event: E, data?: M[E]): any

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