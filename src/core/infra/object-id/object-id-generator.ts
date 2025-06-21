import mongoose from 'mongoose'
import { IdGenerator } from '../../app/id-generator/id-generator.interfaces'

export class ObjectIdGenerator implements IdGenerator<string> {
  generate(): string {
    return new mongoose.Types.ObjectId().toString()
  }
}
