import { BlockFactory } from '../factory/block.factory'
import { BlockSocketFactory } from '../factory/block-socket.factory'
import { LinkSocketFactory } from '../factory/link-socket.factory'
import { LinkFactory } from '../factory/link.factory'
import { IBlock } from '../domain/interfaces/block.interface'
import { IBlockSocketOptions } from '../domain/interfaces/block-socket-options.interface'
import { IBlockSocket } from '../domain/interfaces/block-socket.interface'
import { ILinkSocket } from '../domain/interfaces/link-socket.interface'
import { IBlockOptions } from '../domain/interfaces/block-options.interface'
import { ILinkSocketOptions } from '../domain/interfaces/link-socket-options.interface'
import { ILinkOptions } from '../domain/interfaces/link-options.interface'
import { ILink } from '../domain/interfaces/link.interface'
import { UUID } from '../domain/interfaces/custom-types'
import { ISavedBlock } from '../domain/interfaces/saved-block.interface'
import { ISavedBlockSocket } from '../domain/interfaces/saved-block-socket.interface'
import { ISavedLink } from '../domain/interfaces/saved-link.interface'

export class Helper {
  public static GenerateUUID(): UUID {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c: number) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    )
  }

  public static ReduceBlockToMap(
    map: Map<UUID, IBlock<unknown>>,
    x: IBlockOptions<unknown>
  ): Map<UUID, IBlock<unknown>> {
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
  ): Map<UUID, IBlockSocket<unknown>> {
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
  ): Map<UUID, ILinkSocket<unknown>> {
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
  ): Map<UUID, ILink<unknown>> {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, LinkFactory.Create(x))
  }

  public static ReduceSavedBlockToMap(
    map: Map<UUID, ISavedBlock>,
    x: ISavedBlock
  ): Map<UUID, ISavedBlock> {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }

  public static ReduceSavedBlockSocketToMap(
    map: Map<UUID, ISavedBlockSocket>,
    x: ISavedBlockSocket
  ): Map<UUID, ISavedBlockSocket> {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a block socket options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }

  public static ReduceSavedLinkToMap(
    map: Map<UUID, ISavedLink>,
    x: ISavedLink
  ): Map<UUID, ISavedLink> {
    if (!x.id) {
      throw new Error(
        'Critical error! No ID was found for a link options in the saved state while mapping the object.'
      )
    }

    return map.set(x.id, x)
  }
}
