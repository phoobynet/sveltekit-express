import { cleanEnv, str } from 'envalid'
import { config } from 'dotenv'

config()

export const env = cleanEnv(process.env, {
  PORT: str({ default: '3000' }),
})
