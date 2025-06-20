export interface TokenGenerator<T, R> {
  generate(payload: T): R
}
