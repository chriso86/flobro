import { ISavedEntity } from './saved-entity.interface'
import { ICircleStyle } from './circle-style.interface'
import { ICoordinates } from './coordinates.interface'

export interface ISavedLinkSocket extends ISavedEntity {
  position: ICoordinates
  style: ICircleStyle
}
