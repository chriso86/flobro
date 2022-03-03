//eslint-disable-next-line @typescript-eslint/ban-types
export const Sealed = (constructor: Function): void => {
  setTimeout(() => {
    Object.seal(constructor)
    Object.seal(constructor.prototype)
  })
}
