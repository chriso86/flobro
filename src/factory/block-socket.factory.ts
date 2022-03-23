import { BlockSocket } from '../domain/models/builder/block.socket'
import { Side, UUID } from '../domain/interfaces/custom-types'
import { Block } from '../domain/models/builder/block'

export class BlockSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: {
    id?: UUID
    side: Side
    parent: Block<unknown>
    data?: T
  }): BlockSocket<T> {
    return new BlockSocket<T>(options.side, options.parent, {
      id: options.id,
      data: options.data,
    })
  }
}
