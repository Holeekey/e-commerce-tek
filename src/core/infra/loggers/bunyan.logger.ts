import { Logger as ILogger } from '../../app/logger/logger.interface'
import { createLogger } from 'bunyan'

export class BunyanLogger implements ILogger {
  private logger: ReturnType<typeof createLogger>

  constructor(title: string) {
    this.logger = createLogger({
      name: title,
    })
  }
  log(...data: string[]): void {
    this.logger.info(data.join(' '))
  }
  warn(...data: string[]): void {
    this.logger.warn(data.join(' '))
  }
  exception(...data: string[]): void {
    this.logger.error('EXCEPTION: ' + data.join(' '))
  }
  error(...data: string[]): void {
    this.logger.error('ERROR: ' + data.join(' '))
  }
}
