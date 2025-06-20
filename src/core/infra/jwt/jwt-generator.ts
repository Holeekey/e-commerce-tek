import { sign } from 'jsonwebtoken'
import envConfig from '../env/env-config'
import { TokenGenerator } from '../../app/token/token-generator.interface'
import { JwtPayload } from './payload'

export class JwtGenerator implements TokenGenerator<JwtPayload, string> {
  generate(payload: JwtPayload): string {
    return sign(payload, envConfig.jwtSecret, { expiresIn: '72h' })
  }
}
