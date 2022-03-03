import { IStyle } from './style.interface'
import { UnitOfMeasure } from '../../utils/custom-types'

export interface IBlockStyle extends IStyle {
  width: UnitOfMeasure
  height: UnitOfMeasure
}
