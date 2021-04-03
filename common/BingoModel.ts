import { shuffle } from "./arrays";
import { Bingo, BingoBoard, BingoCell, BingoPlayer, BingoState } from "./model/bingo";

const NO_COLOR = undefined

export { BingoModel }

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

   setCellNames(names: string[]) {
      this.board.items = this.board.items.map((item, i) => ({...item, name: names?.[i]}))
      return this
   }

   shuffle() {
      this.board.items = shuffle(this.board.items)
      return this
   }

   isCellEmpty(cell: BingoCell): boolean {
      return !cell?.color
   }

   toggleCell(index: number, color: BingoCell['color']) {
      const cell = this.board.items[index]

      console.log("toggleCell", {index, color})

      if (this.isCellEmpty(cell)) {
         this.setCell(index, {...cell, color: color})
      }
      else if (cell.color == color) {
         this.setCell(index, {...cell, color: NO_COLOR})
      }

      return this
   }

   setCell(index: number, state: BingoCell) {
      this.board.items[index] = state
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