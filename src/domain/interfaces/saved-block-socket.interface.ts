import { Side, UUID } from '../../utils/custom-types'
import { ISavedEntity } from './saved-entity.interface'
import { ICircleStyle } from './circle-style.interface'

export interface ISavedBlockSocket extends ISavedEntity {
  side: Side
  style: ICircleStyle
  linkIds: UUID[]
}
