import { getEnv } from '../common/utils/get-env'

const appConfig = {
  NODE_ENV: getEnv('NODE_ENV', 'development'),
  APP_ORIGIN: getEnv('APP_ORIGIN', 'http://localhost:5173'),
  PORT: getEnv('PORT', '8080'),
  BASE_PATH: getEnv('BASE_PATH', '/api/v1'),
  MONGO_URI: getEnv('MONGO_URI')
}
export const config = appConfig
