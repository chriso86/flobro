import { HTML, UUID } from './custom-types'
import { ICoordinates } from './coordinates.interface'
import { IBlockStyle } from './block-style.interface'
import { ISavedEntity } from './saved-entity.interface'

export interface ISavedBlock extends ISavedEntity {
  title: string
  content: HTML
  position: ICoordinates
  style: IBlockStyle
  inSocketIds: UUID[]
  outSocketIds: UUID[]
}
