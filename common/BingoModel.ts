import { Bingo, BingoBoard, BingoPlayer, BingoState } from "./model/bingo";

export default class BingoModel implements Bingo {

   constructor(
      protected board: BingoBoard = {items: [], size: 5},
      protected players: BingoPlayer[] = [],
   ) {}

   static from(state: BingoState): BingoModel {
      return new BingoModel(state.board, state.players)
   }

   modifyPlayer(id: string, fn: (prev: BingoPlayer) => BingoPlayer) {
      this.players = this.players.map(p => (p.id == id) ? fn(p) : p)
      return this
   }

   findPlayerById(id: string) {
      return this.players.find(p => p.id == id)
   }

   setSize(size: number) {
      this.board.size = size
      return this
   }

   getState() {
      const { board, players } = this
      return {
         board, players
      }
   }

   setState(state: BingoState) {
      Object.assign(this, state)
      return this
   }

   protected compareToPlayer(p: BingoPlayer) {
      return (other: BingoPlayer) => this.playersEqual(p, other)
   }

   protected playersEqual(p1: BingoPlayer, p2: BingoPlayer) {
      return p1.id == p2.id
   }

}