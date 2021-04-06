
type StorageMap<T> = {[id: string]: T}
type EntrySupplier<T> = (id: string) => T

export default class StorageById<T> {

   private entries: StorageMap<T> = {}

   constructor(private supplier: EntrySupplier<T>) {}

   setById(id: string, entry: T): T {
      this.entries[id] = entry
      return entry
   }

   getById(id: string) {
      if (this.entries[id]) {
         return this.entries[id]
      }
      else {
         return this.createBingo(id)
      }
   }

   protected createBingo(id: string) {
      this.entries[id] = this.supplier(id)
      return this.entries[id]
   }

}