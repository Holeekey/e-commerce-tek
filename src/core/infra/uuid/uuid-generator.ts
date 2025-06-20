import crypto from 'node:crypto'
import { IdGenerator } from '../../app/id-generator/id-generator.interfaces'

export class UuidGenerator implements IdGenerator<string> {
  generate(): string {
    return crypto.randomUUID()
  }
}
