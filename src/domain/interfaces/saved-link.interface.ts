import { ISavedEntity } from './saved-entity.interface'
import { UUID } from '../../utils/custom-types'

export interface ISavedLink extends ISavedEntity {
  startX: number
  startY: number
  startCurveX: number
  startCurveY: number
  endCurveX: number
  endCurveY: number
  endX: number
  endY: number
  originId: UUID
  targetId: UUID
  linkSocketIds: UUID[]
}
