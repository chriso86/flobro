import { IStyle } from './style.interface'

export interface ILinkOptions<T> {
  id?: string
  startX: number
  startY: number
  startCurveX: number
  startCurveY: number
  endCurveX: number
  endCurveY: number
  endX: number
  endY: number
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  style: IStyle
  data: T | null | undefined
}
