import 'reflect-metadata'
import express from 'express'
import { authRouter } from './auth/infra/routes/auth.router'
import envConfig from './core/infra/env/env-config'
import mongoose from 'mongoose'
import { userRouter } from './user/infra/routes/user.router'
import { RegisterService } from './auth/app/services/register/register.service'
import { MongoCredentialsRepository } from './auth/infra/repository/mongo/credentials.repository'
import { Sha256Encryptor } from './core/infra/encryptors/sha-256/sha256-encryptor'
import { JwtGenerator } from './core/infra/jwt/jwt-generator'
import { Role } from './auth/app/models/credentials'
import { ExceptionDecorator } from './core/app/decorators/exception.decorator'
import { productRouter } from './product/infra/routes/product.router'
import { ObjectIdGenerator } from './core/infra/object-id/object-id-generator'
import { shoppingCartRouter } from './shopping-cart/infra/routes/shopping-cart.routes'
import { orderRouter } from './order/infra/routes/order.router'

console.log('Connecting to database...')

const credentialsRepo = new MongoCredentialsRepository()

const createAdmin = async () => {
  const registerService = new RegisterService(
    new ObjectIdGenerator(),
    new JwtGenerator(),
    new Sha256Encryptor(),
    credentialsRepo
  )
  await new ExceptionDecorator(registerService, () => {
    return new Error('Failed to create admin user')
  }).execute({
    email: envConfig.adminEmail,
    password: envConfig.adminPassword,
    role: Role.ADMIN,
  })
}

mongoose
  .connect(envConfig.mongoUri)
  .then(async () => {
    console.log('Connected succesfully to database!')

    const credentialsCount = await credentialsRepo.count()

    if (credentialsCount === 0) {
      console.log('Creating admin user...')
      await createAdmin()
      console.log('Admin user created successfully!')
    }

    const app = express()

    app.use(express.json())

    app.use('/auth', authRouter)

    app.use('/user', userRouter)

    app.use('/product', productRouter)

    app.use('/cart', shoppingCartRouter)

    app.use('/order', orderRouter)

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
