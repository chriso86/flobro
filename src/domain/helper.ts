import { BlockFactory } from '../service/block.factory'
import { BlockSocketFactory } from '../service/block-socket.factory'
import { LinkSocketFactory } from '../service/link-socket.factory'
import { LinkFactory } from '../service/link.factory'
import { IBlock } from '../interfaces/block.interface'
import { IBlockSocketOptions } from '../interfaces/block-socket-options.interface'
import { IBlockSocket } from '../interfaces/block-socket.interface'
import { ILinkSocket } from '../interfaces/link-socket.interface'
import { IBlockOptions } from '../interfaces/block-options.interface'
import { ILinkSocketOptions } from '../interfaces/link-socket-options.interface'
import { ILinkOptions } from '../interfaces/link-options.interface'
import { ILink } from '../interfaces/link.interface'
import { UUID } from '../interfaces/custom-types'

export class Helper {
  public static GenerateUUID() {
    // Source: Stack Overflow answer by Briguy37 at http://stackoverflow.com/a/8809472/188246
    // for question "How to create a GUID / UUID"
    let d = new Date().getTime()

    if (window.performance && typeof window.performance.now === 'function') {
      d += performance.now() //use high-precision timer if available
    }

    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (d + Math.random() * 16) % 16 | 0

      d = Math.floor(d / 16)

      return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16)
    })
  }

  public static ReduceBlockToMap(
    map: Map<UUID, IBlock<unknown>>,
    x: IBlockOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, BlockFactory.Create(x))
  }

  public static ReduceBlockSocketToMap(
    map: Map<UUID, IBlockSocket<unknown>>,
    x: IBlockSocketOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block socket in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, BlockSocketFactory.Create(x))
  }

  public static ReduceLinkSocketToMap(
    map: Map<UUID, ILinkSocket<unknown>>,
    x: ILinkSocketOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link socket in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, LinkSocketFactory.Create(x))
  }

  public static ReduceLinkToMap(
    map: Map<UUID, ILink<unknown>>,
    x: ILinkOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, LinkFactory.Create(x))
  }

  public static ReduceBlockOptionsToMap(
    map: Map<UUID, IBlockOptions<unknown>>,
    x: IBlockOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }

  public static ReduceBlockSocketOptionsToMap(
    map: Map<UUID, IBlockSocketOptions<unknown>>,
    x: IBlockSocketOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block socket options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }

  public static ReduceLinkSocketOptionsToMap(
    map: Map<UUID, ILinkSocketOptions<unknown>>,
    x: ILinkSocketOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link socket options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }

  public static ReduceLinkOptionsToMap(
    map: Map<UUID, ILinkOptions<unknown>>,
    x: ILinkOptions<unknown>
  ) {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }
}
