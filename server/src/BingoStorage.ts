import { BingoBackend } from "../../common/model/protocol";

type BingoBackendMap<B extends BingoBackend> = {[id: string]: B}

type BingoBackendSupplier<B extends BingoBackend> = (id: string) => B

export default class BingoStorage<B extends BingoBackend> {

   private bingos: BingoBackendMap<B> = {}

   constructor(private supplier: BingoBackendSupplier<B>) {}

   getById(id: string) {
      if (this.bingos?.[id]) {
         return this.bingos[id]
      }
      else {
         return this.createBingo(id)
      }
   }

   protected createBingo(id: string) {
      this.bingos[id] = this.supplier(id)
      return this.bingos[id]
   }

}