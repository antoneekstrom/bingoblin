import { useEffect } from 'react'
import { Socket } from 'socket.io-client'

type Listener = (...args: any[]) => void

/**
 * 
 */
export default function useSocket(event: string, listener: Listener, socket: Socket) {

   useEffect(() => {
      socket.on(event, listener)

      return () => {
         socket.off(event, listener)
      }
   }, [event, listener])

   return socket
}