import { FlobroEvent } from '../../enums/flobro-event.enum'
import { BehaviorSubject } from '../models/event/behavior-subject'
import { Subscription } from '../models/event/subscription'

export class EventService {
  private _eventBehaviorSubjects: Map<FlobroEvent, BehaviorSubject<unknown>>
  private _subscriptions: Subscription<unknown>[]

  constructor() {
    this._eventBehaviorSubjects = new Map<
      FlobroEvent,
      BehaviorSubject<unknown>
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
  ): Subscription<unknown> {
    return this.getEventBehaviorSubject(event).subscribe(callback)
  }

  public purge(): void {
    this._subscriptions.forEach((s: Subscription<unknown>) => s.unsubscribe())
  }

  public getEventBehaviorSubject(event: FlobroEvent): BehaviorSubject<unknown> {
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
