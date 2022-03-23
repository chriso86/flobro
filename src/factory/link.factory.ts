import { Link } from '../domain/models/builder/link'
import { UUID } from '../domain/interfaces/custom-types'
import { BlockSocket } from '../domain/models/builder/block.socket'

export class LinkFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: {
    id?: UUID
    startX: number
    startY: number
    startCurveX: number
    startCurveY: number
    endCurveX: number
    endCurveY: number
    endX: number
    endY: number
    origin?: BlockSocket<unknown>
    target?: BlockSocket<unknown>
    data?: T
  }): Link<T | null> {
    return new Link<T>(
      options.startX,
      options.startY,
      options.startCurveX,
      options.startCurveY,
      options.endCurveX,
      options.endCurveY,
      options.endX,
      options.endY,
      {
        id: options.id,
        data: options.data,
        origin: options.origin,
        target: options.target,
      }
    )
  }
}
