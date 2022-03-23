import { HEXColor, UnitOfMeasure } from './custom-types'

export interface IBlockGlobalSettings {
  fillColor: HEXColor
  strokeWidth: UnitOfMeasure
  strokeColor: HEXColor
  width: UnitOfMeasure
  height: UnitOfMeasure
  canDelete: boolean
  canEdit: boolean
  canView: boolean
}
