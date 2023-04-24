import { Server } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { prisma } from '../db'

let io: SocketIOServer

export const startSocketServer = (server: Server) => {
  io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  io.on('connection', async socket => {
    const result = await prisma.socketSession.create({
      data: {
        socketId: socket.id,
      },
    })

    socket.on('disconnect', async () => {
      await prisma.socketSession.delete({
        where: {
          socketId: socket.id,
        },
      })
    })
  })
}
