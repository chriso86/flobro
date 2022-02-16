import { IStyle } from './style.interface'
import { UnitOfMeasure } from './custom-types'

export interface ICircleStyle extends IStyle {
  radius: UnitOfMeasure
}
