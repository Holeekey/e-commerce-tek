import dotenv from 'dotenv'
import Joi from 'joi'

dotenv.config()

const envSchema = Joi.object({
  PORT: Joi.string().default('5000'),
  MONGO_URI: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().required(),
  ADMIN_EMAIL: Joi.string().email().required(),
  ADMIN_PASSWORD: Joi.string().min(6).required(),
}).unknown()

const { error, value: envVars } = envSchema.validate(process.env, {
  abortEarly: false,
})

if (error) {
  console.error('Config validation error(s):')
  error.details.forEach((detail) => {
    console.error(`- ${detail.message}`)
  })
  throw new Error('Environment variables validation failed.')
}

const envConfig = {
  port: Number(envVars.PORT),
  mongoUri: envVars.MONGO_URI,
  jwtSecret: envVars.JWT_SECRET,
  adminEmail: envVars.ADMIN_EMAIL,
  adminPassword: envVars.ADMIN_PASSWORD,
}

export default envConfig
