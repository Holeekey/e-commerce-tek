import { Result } from '../../utils/result'
import { ApplicationException as ApplicationException } from '../exception/application-exception'
import { ApplicationService } from '../service/application-service.interface'

export class ExceptionDecorator<T, R> implements ApplicationService<T, R> {
  constructor(
    private readonly decoratee: ApplicationService<T, R>,
    private readonly exceptionHandler: (exception: Error) => Error
  ) {}

  async execute(data: T): Promise<Result<R>> {
    let result
    try {
      result = await this.decoratee.execute(data)
    } catch (error) {
      console.error(error)
      throw Result.failure(new UnexpectedException()).handleError(
        this.exceptionHandler
      )
    }
    if (result.isException()) {
      throw result.handleError(this.exceptionHandler)
    }
    return result
  }
}

export class UnexpectedException extends ApplicationException {
  constructor() {
    super('UNEXPECTED', 'An unexpected exception ocurred')
  }
}
