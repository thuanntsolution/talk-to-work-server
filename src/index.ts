import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import 'dotenv/config'

import { config } from './config/app.config'
import connectDatabase from './databases/database'
import { errorHandler } from './middlewares/errorHandler'
import authRoutes from './modules/auth/auth.routes'

const app = express()
const BASE_PATH = config.BASE_PATH

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({ origin: config.APP_ORIGIN, credentials: true }))

app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <html>
      <head>
        <title>About Page</title>
        <style>
          body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            font-family: Arial, sans-serif;
          }
        </style>
      </head>
      <body>
        <h1>Talk to work</h1>
        <p>thuan.nguyenthanh.contact@gmail.com</p>
      </body>
    </html>
  `)
})

app.use(`${BASE_PATH}/auth`, authRoutes)

app.use(errorHandler)

app.listen(config.PORT, async () => {
  console.log(`Server is listening on port ${config.PORT} in ${config.NODE_ENV}`)
  await connectDatabase()
})
