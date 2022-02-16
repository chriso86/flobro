import { BehaviorSubject } from './behavior-subject'
import { ISubscription } from '../domain/interfaces/subscription.interface'

export class Subscription<T> implements ISubscription {
  constructor(public parent: BehaviorSubject<T>, public key: string) {}

  unsubscribe(): void {
    this.parent.removeSubscriber(this.key)
  }
}
