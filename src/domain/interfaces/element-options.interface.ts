import { IStyle } from './style.interface'
import { UUID } from '../../utils/custom-types'

export interface IElementOptions<T> {
  id?: UUID
  canView?: boolean
  canEdit?: boolean
  canDelete?: boolean
  style?: IStyle
  data?: T | null
}
