import { Link } from '../domain/models/builder/link'
import { UUID, Vector2d } from '../domain/interfaces/custom-types'
import { BlockSocket } from '../domain/models/builder/block.socket'

export class LinkFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: {
    id?: UUID
    start: Vector2d
    startCurve: Vector2d
    endCurve: Vector2d
    end: Vector2d
    origin?: BlockSocket<unknown>
    target?: BlockSocket<unknown>
    data?: T
  }): Link<T | null> {
    return new Link<T>(
      options.start,
      options.startCurve,
      options.endCurve,
      options.end,
      {
        id: options.id,
        data: options.data,
        origin: options.origin,
        target: options.target,
      }
    )
  }
}
