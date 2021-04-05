import { Server } from "socket.io";
import { BingoBackend } from "../../common/model/protocol";
import SocketIOBingoBackend from "./SocketIOBingoBackend";

export default class BingoBackendFactory {

   static create(server: Server): BingoBackend {
      return new SocketIOBingoBackend(server)
   }

}