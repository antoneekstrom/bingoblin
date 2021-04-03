import { BingoPlayer } from "../../common/model/bingo";

export default class BingoPlayerFactory {

   static create(name: string, id: string, color?: string): Omit<BingoPlayer, 'role'> {
      return { name, id, color, state: 'spectating' }
   }

}