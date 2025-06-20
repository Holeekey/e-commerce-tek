import { Result } from '../../utils/result'
import { Logger } from '../logger/logger.interface'
import { ApplicationService } from '../service/application-service.interface'

export class LoggerDecorator<T, R> implements ApplicationService<T, R> {
  constructor(
    private service: ApplicationService<T, R>,
    private loggers: Logger[]
  ) {}
  async execute(data: T): Promise<Result<R>> {
    try {
      for (const logger of this.loggers) {
        logger.log('INPUT:', JSON.stringify(data))
      }
      const result = await this.service.execute(data)
      if (result.isException()) {
        for (const logger of this.loggers) {
          logger.error(JSON.stringify(result.handleError((e) => e)))
        }
      }
      if (!result.isException() && result.unwrap()) {
        for (const logger of this.loggers) {
          logger.log('RESULT:', JSON.stringify(result.unwrap()))
        }
      }
      return result
    } catch (error: any) {
      for (const logger of this.loggers) {
        logger.exception(JSON.stringify(error?.stack))
      }
      throw error
    }
  }
}
