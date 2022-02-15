import { IStyle } from './style.interface'
import { UnitOfMeasure } from './custom-types'

export interface IGrid {
  gridSize: UnitOfMeasure
  snapToGrid: boolean
  style: IStyle
}
