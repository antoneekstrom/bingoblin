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
   'get-state': never
   'update-state': BingoState
   'request-state-update': BingoState
   'register-user': { name: string, bingoId: string }
   'register-user-response': BingoPlayer
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
   getState(): Promise<BingoState>

   /**
    * Creates an object which listens to incoming state changes.
    * @returns Observable which will notify its observers anytime the state changes
    */
   observeState(): Observable<BingoState>

   /**
    * Registers the user as a player in the bingo.
    * @param name Name of the player
    * @param bingoId Identifies the bingo game
    * @returns Response from the server with playerdata
    */
   register(name: string, bingoId: string): Promise<BingoPlayer>
}

/**
 * Protocol through which the backend communicates with the bingo frontend.
 */
export interface BingoBackend {
   updateState(state: BingoState): void
   getState(): BingoState
}