import path from 'path'
import { createLogger, format, transports } from 'winston'

const fileBasePath = path.resolve(__dirname, 'logs')

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: path.join(fileBasePath, 'error.log'),
      level: 'error',
    }),
    new transports.File({
      filename: path.join(fileBasePath, 'combined.log'),
    }),
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.simple(),
        format.timestamp(),
      ),
    }),
  ],
})
