import { ISubscription } from './subscription.interface'
import { FlobroEvent } from '../../enums/flobro-event.enum'
import { IBehaviorSubject } from './behavior-subject.interface'

export interface IEventService {
  dispatch(event: FlobroEvent, payload: unknown): void
  on(event: FlobroEvent, callback: (value: unknown) => void): ISubscription
  purge(): void
  getEventBehaviorSubject(event: FlobroEvent): IBehaviorSubject<unknown>
}
