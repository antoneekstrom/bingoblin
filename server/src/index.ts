import { Server } from 'socket.io'
import { createServer } from 'http'
import BingoBackendFactory from './BingoBackendFactory'
import BackendBingoModel from './BackendBingoModel'
import BingoPlayerBuilder from './BingoPlayerBuilder'
import StorageById from './StorageById'
import BingoModel from '../../common/BingoModel'

start(25565)

function start(port: number) {
   const io = init(port)
   const backend = BingoBackendFactory.create(io)
   const storage = new StorageById(() => new BingoModel().getState())

   const onRegisterUser = backend.observeClientEvent('register-user')
   const onGetState = backend.observeClientEvent('get-state')
   const onRequestStateUpdate = backend.observeClientEvent(
      'request-state-update'
   )

   const update = (bingoCode: string, model: BingoModel) =>
      backend.broadcast(
         bingoCode,
         'update-state',
         storage.setById(bingoCode, model.getState())
      )

   onRegisterUser.subscribe(
      ({ client, data: { bingoCode, name, current } }) => {
         if (bingoCode) {
            const model = BackendBingoModel.from(storage.getById(bingoCode))
            const pb = new BingoPlayerBuilder(name, client.getClientId())
            pb.addMissing(current)

            model.addPlayer(model.assignRole(pb.create()))
            client.setBingoCode(bingoCode)

            update(bingoCode, model)
         }
      }
   )

   onGetState.subscribe(({ client, data: bingoCode }) => {
      if (bingoCode) {
         const model = BackendBingoModel.from(
            storage.getById(bingoCode ?? client.getBingoCode())
         )
         client.send('update-state', model.getState())
      }
   })

   onRequestStateUpdate.subscribe(({ data, client }) => {
      const bingoCode = client.getBingoCode()

      if (bingoCode) {
         const model = BackendBingoModel.from(storage.getById(bingoCode))
         model.setState(data)
         update(bingoCode, model)
      }
   })

   backend.onDisconnect((client) => {
      const bingoCode = client.getBingoCode()

      if (bingoCode) {
         const model = BackendBingoModel.from(storage.getById(bingoCode))
         const player = model.findPlayerById(client.getClientId())

         if (player) {
            model.removePlayer(player)
            update(bingoCode, model)
         }
      }
   })

   console.log(`starting bingo server on port ${port}`)
}

function init(port: number) {
   const httpServer = createServer()
   const io = new Server(httpServer, {
      cors: {
         origin: '*',
         methods: 'GET,PUT',
      },
   })
   httpServer.listen(port)
   return io
}
