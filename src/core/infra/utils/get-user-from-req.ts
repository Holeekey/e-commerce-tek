import { Request } from 'express'
import { Role } from '../../../auth/app/models/credentials'

export const getUserFromReq = (req: Request) => {
  const userReq = req['user']
  return {
    id: userReq.userId as string,
    email: userReq.email as string,
    role: userReq.role as Role,
  }
}
