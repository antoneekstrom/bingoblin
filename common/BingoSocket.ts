import { BingoEvent, BingoEventData } from "./model/protocol";

export default interface BingoSocket {

   to<E extends BingoEvent>(e: E, data: BingoEventData<E>): BingoSocket

   all<E extends BingoEvent>(e: E, data: BingoEventData<E>): BingoSocket

}