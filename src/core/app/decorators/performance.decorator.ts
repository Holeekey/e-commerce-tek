import { Result } from '../../utils/result'
import { Logger } from '../logger/logger.interface'
import { ApplicationService } from '../service/application-service.interface'

export class PerfomanceDecorator<T, R> implements ApplicationService<T, R> {
  constructor(
    private service: ApplicationService<T, R>,
    private loggers: Logger[]
  ) {}
  async execute(data: T): Promise<Result<R>> {
    const start = performance.now()

    const result = await this.service.execute(data)

    const end = performance.now()

    const duration = end - start

    for (const logger of this.loggers) {
      logger.log(
        `Execution time for ${this.service.constructor.name}: ${duration} ms`
      )
    }

    return result
  }
}
