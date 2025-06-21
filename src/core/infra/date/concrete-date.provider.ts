import { DateProvider } from '../../app/date/date-provider.interface'

export class ConcreteDateProvider implements DateProvider {
  currentDate: Date = new Date()

  now(): Date {
    return this.currentDate
  }
}
