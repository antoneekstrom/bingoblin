import { useEffect, useState } from "react";
import io, { Socket } from "socket.io-client";

type SocketConsumer = (socket: typeof Socket) => void

export default function useMakeSocket(init?: SocketConsumer, deinit?: SocketConsumer): typeof Socket | undefined {
   const [socket, setSocket] = useState<typeof Socket>()

   useEffect(() => {
      const socket = io(`ws://158.174.76.130:25565`);
      setSocket(socket)
      init?.(socket)

      return () => {
         deinit?.(socket)
         socket?.close()
      }
   }, [])
   
   return socket
}