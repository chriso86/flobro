import { BehaviorSubject } from './behavior-subject'

export class Subscription<T> {
  constructor(public parent: BehaviorSubject<T>, public key: string) {}

  unsubscribe(): void {
    this.parent.removeSubscriber(this.key)
  }
}
