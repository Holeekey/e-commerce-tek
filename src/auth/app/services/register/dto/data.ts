import { Role } from '../../../models/credentials'

export interface RegisterData {
  email: string
  password: string
  role: Role
}
