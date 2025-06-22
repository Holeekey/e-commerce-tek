import { TokenGenerator } from '../../../src/core/app/token/token-generator.interface'

export class MockTokenGenerator
  implements TokenGenerator<{ id: string }, string>
{
  generate(payload: { id: string }): string {
    return payload.id
  }
}
