import { Server } from "socket.io";
import { Bingo } from "../../common/model/bingo";
import { BingoBackend } from "../../common/model/protocol";
import ConcreteBingoBackend from "./ConcreteBingoBackend";

export default class BingoBackendFactory {

   static create(server: Server, state: Bingo, id: string): BingoBackend {
      return new ConcreteBingoBackend(server, state, id)
   }

}