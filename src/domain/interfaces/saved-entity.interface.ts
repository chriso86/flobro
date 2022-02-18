import { UUID } from './custom-types'
import { IStyle } from './style.interface'

export interface ISavedEntity {
  id: UUID
  style: IStyle
  canDelete: boolean
  canEdit: boolean
  canView: boolean
  data: unknown
}
