import { Entity } from '../entity/entity'
import { ValueObject } from '../value-object/value-object'
import { DomainEvent } from '../event/domain-event'

export abstract class AggregateRoot<
  T extends ValueObject<T>
> extends Entity<T> {
  private events: DomainEvent[] = []

  protected constructor(id: T) {
    super(id)
  }

  protected abstract validateState(): void

  pullEvents(): DomainEvent[] {
    const events = this.events
    this.events = []
    return events
  }

  pushEvent(event: DomainEvent) {
    this.events.push(event)
  }
}
