export class FlyweightFactory<T> {
  private _flyweights: Map<string, IFlyweight<T>> = new Map<string, IFlyweight<T>>();

  constructor(initialState: T[]) {
    initialState.forEach(state => {
      const key = this.getKey(state);

      this._flyweights.set(key, new Flyweight<T>(state));
    });
  }

  /***
   * Get the existing flyweight or return a new one
   */
  public getFlyweight(state: T) {
    const key = this.getKey(state);

    if (!(key in this._flyweights.keys())) {
      this._flyweights.set(key, new Flyweight<T>(state));
    }
  }

  private getKey(state: T) {
    return Object.keys(state).reduce((key: string, property: string) => {
      const value: any = (state as any)[property];

      if (typeof value === 'object') {
        throw new Error('Please don\'t nest objects in the state object passed to the getFlyweight method. It only supports shallow object without other objects nested.');
      }

      return key += `_${key}_${value.toString()}`
    }, '');
  }
}

class Flyweight<T> implements IFlyweight<T> {
  private readonly _state: T;

  public get state(): T {
    return this._state;
  }

  constructor(state: T) {
    this._state = state;
  }

  execute(predicate: (internalState: T) => unknown, thisArg?: any): unknown {
    return predicate.call(thisArg ?? this, this._state);
  }
}

export interface IFlyweight<T> {
  execute(predicate: (internalState: T) => unknown, thisArg?: any): unknown;
}
