import { IElementOptions } from './element-options.interface'
import { UUID } from './custom-types'

export interface ILinkOptions<T> extends IElementOptions<T> {
  startX: number
  startY: number
  startCurveX: number
  startCurveY: number
  endCurveX: number
  endCurveY: number
  endX: number
  endY: number
  originId?: UUID | null
  targetId?: UUID | null
  linkSocketIds?: UUID[]
}
