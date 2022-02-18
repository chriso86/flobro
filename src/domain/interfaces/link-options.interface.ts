import { IElementOptions } from './element-options.interface'

export interface ILinkOptions<T> extends IElementOptions<T> {
  startX: number
  startY: number
  startCurveX: number
  startCurveY: number
  endCurveX: number
  endCurveY: number
  endX: number
  endY: number
}
