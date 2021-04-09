
/**
 * A cell on the bingo board.
 */
export type BingoCell = {
   name: string
   index: number
   details?: string
   color?: string
   state?: string
}

/**
 * 
 */
export type BingoPlayerState = 'playing' | 'spectating'

/**
 * 
 */
export type BingoPlayerRole = 'guest' | 'owner'

/**
 * A bingo participant.
 */
export type BingoPlayer = {
   name?: string
   id: string
   color?: string
   state: BingoPlayerState
   role: BingoPlayerRole
}

export type BingoBoard = {
   items: BingoCell[]
   size: number
}

/**
 * How bingo looking right now.
 */
export type BingoState = {
   board: BingoBoard
   players: BingoPlayer[]
}

/**
 * Anyone who claims to be bingo must conform to this interface.
 */
export interface Bingo {
   setState(state: BingoState): void
   getState(): BingoState
}