import { BingoPlayer, BingoPlayerState } from '../../common/model/bingo'
import { omitUndefined } from '../../common/obj'

export default class BingoPlayerBuilder {
   private player: Omit<BingoPlayer, 'role'>

   private constructor(player: Omit<BingoPlayer, 'role'>) {
      this.player = player
   }

   setState(state: BingoPlayerState) {
      this.player.state = state
      return this
   }

   setColor(color: string) {
      this.player.color = color
      return this
   }

   setName(name: string) {
      this.player.name = name
      return this
   }

   setImageUrl(url: string) {
      this.player.imgUrl = url
      return this
   }

   addMissing(partial?: Partial<BingoPlayer>) {
      this.player = { ...partial, ...omitUndefined(this.player) }
      return this
   }

   create(): Omit<BingoPlayer, 'role'> {
      return { ...this.player }
   }

   static spectator(id: string) {
      return new BingoPlayerBuilder({id, state: 'spectating'})
   }

   static default(
      name: string,
      id: string,
      color?: string
   ) {
      return new BingoPlayerBuilder({ name, id, color, state: 'playing' })
   }
}
