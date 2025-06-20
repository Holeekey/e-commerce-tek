export enum Role {
  ADMIN = 'admin',
  CLIENT = 'client',
}

export type Credentials = {
  userId: string
  email: string
  password: string
  role: Role
}
