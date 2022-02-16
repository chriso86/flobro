import { Subscription } from './subscription'
import { IBehaviorSubject } from '../domain/interfaces/behavior-subject.interface'

export class BehaviorSubject<T> implements IBehaviorSubject<T> {
  private _subscribers: Map<string, (value: T) => void> = new Map<
    string,
    (value: T) => void
  >()
  private _value: T

  public get value(): T {
    return this._value
  }

  constructor(value: T) {
    this._value = value
  }

  public subscribe(predicate: (value: T) => void): Subscription<T> {
    const index = Array.from(this._subscribers.keys()).length
    const key = index.toString()

    this._subscribers.set(key, predicate)

    return new Subscription<T>(this, key)
  }

  public next(value: T): void {
    this._value = value

    this._subscribers.forEach((predicate: (v: T) => void) => {
      predicate(value)
    })
  }

  public getValue(): T {
    return this._value
  }

  public removeSubscriber(key: string): void {
    if (!this._subscribers.has(key)) {
      throw new Error(
        `Could not locate a subscriber on BehaviorSubject with key "${key}".`
      )
    }

    this._subscribers.delete(key)
  }
}
