import express from 'express'
import { authRouter } from './auth/infra/routes/auth.router'
import envConfig from './core/infra/env/env-config'
import mongoose from 'mongoose'
import { userRouter } from './user/infra/routes/user.router'

console.log('Connecting to database...')

mongoose
  .connect(envConfig.mongoUri)
  .then(() => {
    console.log('Connected succesfully to database!')

    const app = express()

    app.use(express.json())

    app.use('/auth', authRouter)

    app.use('/user', userRouter)

    app.get('/', (_req, res) => {
      res.send('Welcome to E-Commerce-Tek!')
    })

    app.listen(envConfig.port, () => {
      console.log(`Listening on port http://localhost:${envConfig.port}`)
    })
  })
  .catch((err) => {
    console.error(err)
  })
