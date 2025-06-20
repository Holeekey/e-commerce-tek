import { string } from 'joi'
export interface Encryptor {
  encrypt(payload: string): string
  compare(data: { original: string; encrypted: string }): boolean
}
