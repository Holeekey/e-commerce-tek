export class Result<T> {
  private constructor(private value?: T, private exception?: Error) {
    if (value !== undefined && exception !== undefined)
      throw new Error('Value and error not to be definined same time')
    if (value === undefined && exception === undefined)
      throw new Error('Value and error not to be undefinined same time')
  }

  unwrap(): T {
    if (this.exception) throw this.exception
    return this.value!
  }

  isException() {
    return Boolean(this.exception)
  }

  getException() {
    if (!this.isException())
      throw new Error(`Can't get exception without an exception`)
    return this.exception!
  }

  handleError<R>(handler: (e: Error) => R) {
    if (!this.isException())
      throw new Error(`Can't handle without an exception`)
    return handler(this.exception!)
  }

  handleValue<R>(handler: (v: Result<T>) => R) {
    if (this.isException()) throw new Error(`Can't handle without a value`)
    return handler(this)
  }

  convertToOther<T>() {
    if (!this.isException())
      throw new Error(`Can't convert to other without an exception`)
    return Result.failure<T>(this.exception!)
  }

  static success<T>(value: T) {
    return new Result(value, undefined)
  }

  static failure<T>(error: Error) {
    return new Result<T>(undefined, error)
  }
}
