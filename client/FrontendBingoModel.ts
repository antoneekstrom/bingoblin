import { range, shuffle } from '../common/arrays'
import BingoModel from '../common/BingoModel'
import { BingoCell, BingoState } from '../common/model/bingo'

const NO_COLOR = undefined

export default class FrontendBingoModel extends BingoModel {
   static from(state: BingoState): FrontendBingoModel {
      return new FrontendBingoModel(state.board, state.players)
   }

   toggleCell(index: number, color: BingoCell['color']) {
      const cell = this.board.items[index]

      if (this.isCellEmpty(cell)) {
         this.setCell(index, { ...cell, index, color: color })
      } else if (cell.color == color) {
         this.setCell(index, { ...cell, index, color: NO_COLOR })
      }

      return this
   }

   setCell(index: number, state: BingoCell) {
      this.board.items[index] = state
      return this
   }

   setCellNames(names: string[]) {
      const { size } = this.board
      this.board.items = range(size * size).map((index) => ({
         name: names?.[index],
         index
      }))
      return this
   }

   shuffle() {
      this.board.items = shuffle(this.board.items)
      return this
   }

   isCellEmpty(cell: BingoCell): boolean {
      return !cell || !cell?.color
   }
}
