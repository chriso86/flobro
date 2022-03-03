import { IEventService } from '../interfaces/event.service.interface'
import { FlobroEvent } from '../../enums/flobro-event.enum'
import { ISubscription } from '../interfaces/subscription.interface'
import { IBehaviorSubject } from '../interfaces/behavior-subject.interface'
import { BehaviorSubject } from '../../utils/behavior-subject'

export class EventService implements IEventService {
  private _eventBehaviorSubjects: Map<FlobroEvent, IBehaviorSubject<unknown>>
  private _subscriptions: ISubscription[]

  constructor() {
    this._eventBehaviorSubjects = new Map<
      FlobroEvent,
      IBehaviorSubject<unknown>
    >()
    this._subscriptions = []
  }

  public dispatch(event: FlobroEvent, payload: unknown): void {
    this.ensureBehaviorSubjectExists(event)

    const eventBehaviorSubject = this._eventBehaviorSubjects.get(event)

    if (!eventBehaviorSubject) {
      throw new Error(
        `Critical error. Failed to initialize BehaviorSubject for event "${event}"`
      )
    }

    eventBehaviorSubject.next(payload)
  }

  public on(
    event: FlobroEvent,
    callback: (value: unknown) => void
  ): ISubscription {
    return this.getEventBehaviorSubject(event).subscribe(callback)
  }

  public purge(): void {
    this._subscriptions.forEach((s: ISubscription) => s.unsubscribe())
  }

  public getEventBehaviorSubject(
    event: FlobroEvent
  ): IBehaviorSubject<unknown> {
    this.ensureBehaviorSubjectExists(event)

    const eventBehaviorSubject = this._eventBehaviorSubjects.get(event)

    if (!eventBehaviorSubject) {
      throw new Error(
        `Critical error. Failed to initialize BehaviorSubject for event "${event}"`
      )
    }

    return eventBehaviorSubject
  }

  private ensureBehaviorSubjectExists(event: FlobroEvent): void {
    const eventBehaviorSubject = this._eventBehaviorSubjects.get(event)

    if (!eventBehaviorSubject) {
      this._eventBehaviorSubjects.set(event, new BehaviorSubject<unknown>(null))
    }
  }
}
