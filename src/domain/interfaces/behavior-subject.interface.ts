import { ISubscription } from './subscription.interface'

export interface IBehaviorSubject<T> {
  value: T
  subscribe(predicate: (value: T) => void): ISubscription
  next(value: T): void
  removeSubscriber(key: string): void
  getValue(): T
}
