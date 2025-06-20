import { sha256 } from 'js-sha256'
import { Encryptor } from '../../../app/encrypt/encryptor.interface'

export class Sha256Encryptor implements Encryptor {
  encrypt(payload: string): string {
    return sha256(payload)
  }
  compare(data: { original: string; encrypted: string }): boolean {
    return sha256(data.original) === data.encrypted
  }
}
