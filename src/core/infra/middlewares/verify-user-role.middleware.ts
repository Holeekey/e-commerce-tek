import { Role } from '../../../auth/app/models/credentials'
import { getUserFromReq } from '../../../core/infra/utils/get-user-from-req'

export const verifyUserRole = (role: Role) => {
  return async (req, res, next) => {
    const user = getUserFromReq(req)
    if (user.role !== role) {
      return res.status(403).json({ message: 'Forbidden access' })
    }
    next()
  }
}
