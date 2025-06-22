import { Encryptor } from '../../../src/core/app/encrypt/encryptor.interface'

export class MockEncryptor implements Encryptor {
  encrypt(payload: string): string {
    return payload
  }
  compare(data: { original: string; encrypted: string }): boolean {
    return data.original === data.encrypted
  }
}
