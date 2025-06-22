import { Credentials, Role } from '../../src/auth/app/models/credentials'

export const mockCredentialId1 = '685788d2f9cebe15c308db00'
export const mockCredentialId2 = '68578594f9cebe15c308daf9'

export const mockCredentials: Credentials[] = [
  {
    userId: mockCredentialId1,
    email: 'lionelmessi10@gmail.com',
    password: 'password123',
    role: Role.CLIENT,
  },
]
