import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import { env } from './env'
import { logger } from './logger'
import { apiRouter } from './routes/api'
import bodyParser from 'body-parser'
import serveStatic from 'serve-static'
import { createServer } from 'http'
import { startSocketServer } from './socket'

const app = express()

app.use(cors())
app.use(helmet())
app.use(morgan('tiny'))
app.use(serveStatic('../frontend/build', { index: ['index.html'] }))
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)
app.use(bodyParser.json())

app.use(apiRouter)

const server = createServer(app)

startSocketServer(server)

app.listen(env.PORT, () => {
  logger.info(`Listening on *:${env.PORT}`)
})
