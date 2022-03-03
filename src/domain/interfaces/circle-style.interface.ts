import { IStyle } from './style.interface'
import { UnitOfMeasure } from '../../utils/custom-types'

export interface ICircleStyle extends IStyle {
  radius: UnitOfMeasure
}
