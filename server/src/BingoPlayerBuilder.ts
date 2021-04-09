import { BingoPlayer, BingoPlayerState } from "../../common/model/bingo";

export default class BingoPlayerBuilder {

   private player: Omit<BingoPlayer, 'role'>

   constructor(name: string, id: string) {
      this.player = BingoPlayerBuilder.default(name, id)
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

   addMissing(partial?: Partial<BingoPlayer>) {
      this.player = { ...partial, ...this.deleteUndefinedEntries(this.player) }
      return this
   }

   create(): Omit<BingoPlayer, 'role'> {
      return { ...this.player }
   }

   static spectator(id: string): Omit<BingoPlayer, 'role'> {
      return { id, state: 'spectating' }
   }

   static default(name: string, id: string, color?: string): Omit<BingoPlayer, 'role'> {
      return { name, id, color, state: 'playing' }
   }

   private deleteUndefinedEntries<T>(obj: T): T {
      return Object.entries(obj).reduce<T>((r, [key, value]) => value ? {...r, [key]: value} : r, {} as T)
   }

}