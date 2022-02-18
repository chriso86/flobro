import { IStyle } from './style.interface'
import { UUID } from './custom-types'

export interface IElement<T> {
  id?: UUID
  canView: boolean
  canEdit: boolean
  canDelete: boolean
  style: IStyle
  data?: T | null

  render(): void
  updateId(id: string): void
  updateViewPermission(canView: boolean): void
  updateEditPermission(canEdit: boolean): void
  updateDeletePermission(canDelete: boolean): void
  updateStyle(style: IStyle): void
  updateData(data: T): void
  delete(): void
}
