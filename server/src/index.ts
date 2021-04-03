import { Server, Socket } from 'socket.io'
import { createServer } from 'http'
import BingoStorage from './BingoStorage'
import BackendBingoModel from './BackendBingoModel'
import BingoPlayerFactory from './BingoPlayerFactory'
import BingoModel from '../../common/BingoModel'
import SocketEmitterWrapper from '../../common/SocketEmitterWrapper'
import { BingoEventMap } from '../../common/model/protocol'
import ConcreteBingoBackend from './ConcreteBingoBackend'

start(25565)

function start(port: number) {
   const io = init(port)
   const bb = new BingoStorage(id => new ConcreteBingoBackend(io, new BingoModel(), id))

   io.on('connection', socket => {
      const bs = new SocketEmitterWrapper<BingoEventMap, Socket>(socket)

      bs.on('register-user', ({name, bingoId}) => {
         const backend = bb.getById(bingoId)
         backend.connect(bs)

         const model = BackendBingoModel.from(backend.getState())
         let user = model.findPlayerById(bs.id)
         if (!user) {
            user = model.assignRole(BingoPlayerFactory.create(name, socket.id))
            model.addPlayer(user)
         }
         else {
            model.modifyPlayer(bs.id, prev => ({...prev, name}))
         }

         backend.updateState(model.getState())
         bs.emit('register-user-response', user)
      })
   })

   // [...Array(25)].map(() => `bingo${arrays.range(Math.floor(Math.random() * 3)).map(() => 'o').join('')}`).map((name, index) => ({name, index}))

   console.log(`starting bingo server on port ${port}`)
}

function init(port: number) {
   const httpServer = createServer()
   const io = new Server(httpServer, {
      cors: {
         origin: '*',
         methods: 'GET,PUT'
      }
   })
   httpServer.listen(port)
   return io
}