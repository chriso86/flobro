import { HEXColor, UnitOfMeasure } from './custom-types'

export interface ILinkGlobalSettings {
  strokeWidth: UnitOfMeasure
  strokeColor: HEXColor
  canDelete: boolean
  canEdit: boolean
  canView: boolean
}
