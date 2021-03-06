import { LinkSocket } from '../domain/models/builder/link.socket'
import { Vector2d, UUID } from '../domain/interfaces/custom-types'
import { Link } from '../domain/models/builder/link'

export class LinkSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: {
    id?: UUID
    position: Vector2d
    parent: Link<unknown>
    data?: T
  }): LinkSocket<T> {
    return new LinkSocket<T>(options.position, options.parent, {
      id: options.id,
      data: options.data,
    })
  }
}
