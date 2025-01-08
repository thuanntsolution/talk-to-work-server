import express, { Request, Response } from 'express'
import 'dotenv/config'

import { config } from './config/app.config'
import connectDatabase from './databases/database'

const app = express()

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

app.listen(config.PORT, async () => {
  console.log(`Server is listening on port ${config.PORT} in ${config.NODE_ENV}`)
  await connectDatabase()
})
