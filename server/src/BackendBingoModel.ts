import BingoModel from '../../common/BingoModel'
import { BingoPlayer, BingoPlayerRole, BingoState } from '../../common/model/bingo';

export default class BackendBingoModel extends BingoModel {

   static from(state: BingoState): BackendBingoModel {
      return new BackendBingoModel(state.board, state.players)
   }

   addPlayer(player: BingoPlayer) {
      let index: number
      if ((index = this.players.findIndex(this.compareToPlayer(player))) != -1) {
         this.players[index] = player
      }
      else {
         this.players.push(player)
      }
   }

   removePlayer(player: BingoPlayer) {
      const lenBefore = this.players.length
      this.players = this.players.filter(p => !this.playersEqual(p, player))
      return lenBefore != this.players.length
   }

   assignRole(noRole: Omit<BingoPlayer, 'role'>): BingoPlayer {
      const role: BingoPlayerRole = this.players.length == 0 ? 'owner' : 'guest'
      return { ...noRole, role }
   }

}