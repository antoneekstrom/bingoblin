import { useEffect, useState } from 'react'
import io, { Socket } from 'socket.io-client'
import urls from '../urls.json'

type SocketConsumer = (socket: typeof Socket) => void

export default function useMakeSocket(
   init?: SocketConsumer,
   deinit?: SocketConsumer
): typeof Socket | undefined {
   const [socket, setSocket] = useState<typeof Socket>()

   useEffect(() => {
      const socket = io.connect(urls.client.socketUrl, {path: urls.client.wsPath});
      setSocket(socket)
      init?.(socket)

      return () => {
         deinit?.(socket)
         socket?.close()
      }
   }, [])

   return socket
}
