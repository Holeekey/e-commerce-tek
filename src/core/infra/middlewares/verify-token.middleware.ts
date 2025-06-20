import { verify } from 'jsonwebtoken'
import envConfig from '../env/env-config'
import { CredentialsRepository } from '../../../auth/app/repositories/credentials.repository'

export const verifyToken = (credentialsRepo: CredentialsRepository) => {
  return async (req, res, next) => {
    const header = req.header('Authorization') || ''
    const token = header.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Token not provided' })
    }
    try {
      const payload = verify(token, envConfig.jwtSecret)
      const userId = payload['id']
      if (userId === undefined) {
        throw new Error('User ID not found in JWT')
      }
      const userResult = await credentialsRepo.findOne(userId)
      if (userResult.isEmpty()) {
        throw new Error('User not found')
      }
      req.user = userResult.get()
      next()
    } catch (error) {
      console.log(error)
      return res.status(403).json({ message: 'Token not valid' })
    }
  }
}
