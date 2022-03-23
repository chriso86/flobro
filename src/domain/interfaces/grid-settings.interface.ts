import { Decimal, HEXColor, UnitOfMeasure } from './custom-types'

export interface IGridSettings {
  size: Decimal
  useSnapping: boolean
  fillColor: HEXColor
  strokeWidth: UnitOfMeasure
  strokeColor: HEXColor
}
