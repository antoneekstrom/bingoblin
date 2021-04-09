import { BingoPlayer, BingoState } from './bingo';
import { Observable } from 'rxjs'

/**
 * 
 */
export type BingoEvent = keyof BingoEventMap

/**
 * 
 */
export type BingoEventData<E extends BingoEvent> = BingoEventMap[E]

/**
 * 
 */
export type BingoEventMap = {
   'get-state'?: string
   'update-state': BingoState
   'request-state-update': BingoState
   'register-user': { name: string, bingoCode: string, current?: Partial<BingoPlayer> }
   'register-user-response': BingoPlayer
   'spectate': string,
   'spectate-response': BingoPlayer
}

/**
 * 
 */
export type BingoClientEvent = keyof Pick<BingoEventMap, 'get-state' | 'request-state-update' | 'register-user' | 'spectate'>

/**
 * 
 */
export type BingoClientEventInfo<E extends BingoClientEvent> = {
   e: E
   data: BingoEventData<E>
   client: BingoClient
}

/**
 * Protocol through which the frontend communicates with the bingo backend.
 */
export interface BingoFrontend {
   /**
    * Sends a request to the server to update the state.
    * @param state New state
    */
   requestStateUpdate(state: BingoState): void

   /**
    * Fetches the state from the server.
    * @returns Promise with the current state
    */
   getState(bingoCode?: string): Promise<BingoState>

   /**
    * Creates an object which listens to incoming state changes.
    * @returns Observable which will notify its observers anytime the state changes
    */
   observeState(): Observable<BingoState>

   /**
    * Registers the user as a player in the bingo.
    * @param name Name of the player
    * @param bingoCode Identifies the bingo game
    * @returns Response from the server with playerdata
    */
   register(name: string, bingoCode: string, current?: Partial<BingoPlayer>): Promise<BingoPlayer>

   /**
    * Spectates the bingo game.
    * @param bingoCode
    */
   spectate(bingoCode: string): Promise<BingoPlayer>
}

/**
 * Protocol through which the backend communicates with the bingo frontend.
 */
export interface BingoBackend {
   broadcast<E extends BingoEvent>(bingoCode: string | undefined, e: E, data: BingoEventData<E>): void
   connect(client: BingoClient): () => void
   onDisconnect(fn: (client: BingoClient) => void): () => void
   onConnect(fn: (client: BingoClient) => void): () => void
   observeClientEvent<E extends BingoClientEvent>(e: E): Observable<BingoClientEventInfo<E>>
}

/**
 * 
 */
export interface BingoClient {
   getBingoCode(): string | undefined
   setBingoCode(code?: string): void
   getClientId(): string
   send<E extends BingoEvent>(e: E, data: BingoEventData<E>): void
   observe(): Observable<BingoClientEventInfo<BingoClientEvent>>
}

/**
 * 
 */
export interface BingoInstance {

}