export type Key = string
export type UUID = string
export type HTML = string
export type HEXColor = string
export type Url = string
export type Decimal = number
export type UnitOfMeasure = number | string // number is for "px"
export type Side = 'in' | 'out'
export type Vector2d = { x: number; y: number }
export type Class<T> = {
  new (...args: unknown[]): T
}
