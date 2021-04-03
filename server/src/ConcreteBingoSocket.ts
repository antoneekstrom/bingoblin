import { Socket as ServerSocket } from "socket.io"
import { Socket as ClientSocket } from "socket.io-client"
import { Emitter, EmitterListener } from "../../common/Emitter"
import BingoSocket from "../../common/BingoSocket"
import { BingoEvent, BingoEventData, BingoEventMap } from "../../common/model/protocol"

/**
 * 
 */
 export default class ConcreteBingoSocket implements BingoSocket {

   constructor(private emitter: Emitter<any>) {}

    to<E extends keyof BingoEventMap>(e: E, data: BingoEventData<E>): BingoSocket {
       throw new Error("Method not implemented.")
    }

    all<E extends keyof BingoEventMap>(e: E, data: BingoEventData<E>): BingoSocket {
       throw new Error("Method not implemented.")
    }

}