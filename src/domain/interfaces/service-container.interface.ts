export interface IServiceContainer {
  GetService<T>(Service: Class<T>, ...args: unknown[]): T
}

export interface Class<T> {
  new (...args: unknown[]): T
}
