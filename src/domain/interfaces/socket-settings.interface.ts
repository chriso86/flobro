import { Decimal, HEXColor, UnitOfMeasure } from './custom-types'

export interface ISocketGlobalSettings {
  fillColor: HEXColor
  strokeWidth: UnitOfMeasure
  strokeColor: HEXColor
  radius: Decimal
  canDelete: boolean
  canEdit: boolean
  canView: boolean
}
