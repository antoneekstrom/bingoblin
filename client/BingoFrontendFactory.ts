import { Socket } from "socket.io-client";
import { BingoFrontend } from "../common/model/protocol";
import SocketEmitterWrapper from "../common/SocketEmitterWrapper";
import ConcreteBingoFrontend from "./ConcreteBingoFrontend";

export default class BingoFrontendFactory {

   static create(socket: typeof Socket): BingoFrontend {
      return new ConcreteBingoFrontend(new SocketEmitterWrapper(socket))
   }
   
}