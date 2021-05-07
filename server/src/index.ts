import { Server } from 'socket.io'
import { createServer } from 'http'
import BingoBackendFactory from './BingoBackendFactory'
import BackendBingoModel from './BackendBingoModel'
import BingoPlayerBuilder from './BingoPlayerBuilder'
import StorageById from './StorageById'
import BingoModel from '../../common/BingoModel'
import express, { Response } from 'express'
import fetch from 'node-fetch'
import urls from '../../urls.json'

start(3001)

function start(port: number) {
   const { io, app } = init(port)
   const backend = BingoBackendFactory.create(io)
   const storage = new StorageById(() => new BingoModel().getState())
   const profileImages: {[id: string]: Buffer} = {}

   const onRegisterUser = backend.observeClientEvent('register-user')
   const onGetState = backend.observeClientEvent('get-state')
   const onRequestStateUpdate = backend.observeClientEvent(
      'request-state-update'
   )
   const onSpectate = backend.observeClientEvent('spectate')

   const update = (bingoCode: string, model: BingoModel) =>
      backend.broadcast(
         bingoCode,
         'update-state',
         storage.setById(bingoCode, model.getState())
      )

   onRegisterUser.subscribe(
      ({ client, data: { bingoCode, name, current } }) => {
         if (name.length > 24) {
            return
         }
         if (bingoCode) {
            const model = BackendBingoModel.from(storage.getById(bingoCode))
            const pb = BingoPlayerBuilder.default(
               name,
               client.getClientId()
            ).addMissing(current)
            const player = model.assignRole(pb.create(), current)

            model.addPlayer(player)
            client.setBingoCode(bingoCode)

            client.send('register-user-response', player)

            update(bingoCode, model)
         }
      }
   )

   onSpectate.subscribe(({ client, data: bingoCode }) => {
      if (bingoCode) {
         const model = BackendBingoModel.from(storage.getById(bingoCode))
         const id = client.getClientId()
         const imgUrl = `${new URL(urls.server.profileImagePath, urls.server.fetchUrl).href}?id=${id}`
         const player = model.assignRole(
            BingoPlayerBuilder.spectator(id)
               .setImageUrl(imgUrl)
               .create()
         );

         model.addPlayer(player)
         client.setBingoCode(bingoCode)

         client.send('spectate-response', player)

         update(bingoCode, model)
      }
   })

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
      
      const id = client.getClientId()
      delete profileImages[id]

      if (bingoCode) {
         const model = BackendBingoModel.from(storage.getById(bingoCode))
         const player = model.findPlayerById(client.getClientId())

         if (player) {
            model.removePlayer(player)
            update(bingoCode, model)
         }

         client.setBingoCode(undefined)
      }
   })

   app.get(urls.server.profileImagePath, async (req, res) => {
      const id = req.query['id'] as string | unknown

      if (typeof(id) != 'string' || id.length == 0) {
         res.sendStatus(404)
         return
      }

      let buffer = profileImages[id]

      if (!buffer) {
         buffer = await fetchImage(getProfileImageUrl(id))
         profileImages[id] = buffer
      }

      sendImage(res, buffer)
   })

   console.log(`starting bingo server on port ${port}`)
}

function init(port: number) {
   const app = express()
   const httpServer = createServer(app)
   const io = new Server(httpServer, {
      cors: {
         origin: '*',
         methods: ['GET', 'PUT'],
      },
   })
   httpServer.listen(port)
   return { io, app }
}

function sendImage(res: Response, img: Buffer) {
   res.writeHead(200, {
      'Content-Type': 'image/png',
      'Content-Length': img.length
   })
   res.end(img)
}

async function fetchImage(url: string) {
   const data = await (await fetch(url)).arrayBuffer()
   return Buffer.from(data)
}

function getProfileImageUrl(id: string) {
   return `https://thiscatdoesnotexist.com/?id=${id?.replace(/[^a-zA-Z]/, '')}`
}

// function getWaifu(seed: string) {
//    const rand = new Chance(seed)
//    const num = rand.integer({min: 0, max:99999})
//    return `https://www.thiswaifudoesnotexist.net/example-${num}.jpg`
// }