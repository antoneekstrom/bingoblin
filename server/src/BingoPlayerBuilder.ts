import { BingoPlayer } from "../../common/model/bingo";

export default class BingoPlayerBuilder {

   private player: Omit<BingoPlayer, 'role'>

   constructor(name: string, id: string) {
      this.player = BingoPlayerBuilder.default(name, id)
   }

   setColor(color: string) {
      this.player.color = color
   }

   setName(name: string) {
      this.player.name = name
   }

   addMissing(partial?: Partial<BingoPlayer>) {
      this.player = { ...partial, ...this.deleteUndefinedEntries(this.player) }
   }

   create(): Omit<BingoPlayer, 'role'> {
      return { ...this.player }
   }

   static default(name: string, id: string, color?: string): Omit<BingoPlayer, 'role'> {
      return { name, id, color, state: 'spectating' }
   }

   private deleteUndefinedEntries<T>(obj: T): T {
      return Object.entries(obj).reduce<T>((r, [key, value]) => value ? {...r, [key]: value} : r, {} as T)
   }

}