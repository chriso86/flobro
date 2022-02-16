import { IStyle } from './style.interface'
import { UnitOfMeasure } from './custom-types'

export interface IBlockStyle extends IStyle {
  width: UnitOfMeasure
  height: UnitOfMeasure
}
