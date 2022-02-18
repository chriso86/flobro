import { Socket } from './socket'
import {
  DEFAULT_BLOCK_SOCKET_LINKS,
  DEFAULT_SOCKET_PARENT,
} from '../utils/default.constants'
import { Link } from './link'
import { LinkFactory } from '../factory/link.factory'
import { IBlock } from './interfaces/block.interface'
import { IBlockSocket } from './interfaces/block-socket.interface'
import { ILinkOptions } from './interfaces/link-options.interface'
import { ILink } from './interfaces/link.interface'
import { Side, UUID } from './interfaces/custom-types'
import { IBlockSocketOptions } from './interfaces/block-socket-options.interface'

export class BlockSocket<T> extends Socket<T> implements IBlockSocket<T> {
  public side: Side
  public parent: IBlock<unknown> | null = DEFAULT_SOCKET_PARENT
  public links: Map<UUID, ILink<unknown>> = DEFAULT_BLOCK_SOCKET_LINKS

  constructor(options: IBlockSocketOptions<T>) {
    super({
      id: options.id,
      style: options.style,
      canDelete: options.canDelete,
      canEdit: options.canEdit,
      canView: options.canView,
      data: options.data,
    })

    this.side = options.side
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public updateParent(block: IBlock<unknown>): void {
    this.parent = block
  }

  public addLink<K>(options: ILinkOptions<K>): Link<K> {
    const link = LinkFactory.Create<K>(options)

    if (!link.id) {
      throw new Error(
        `Critical error. The ID for the link was not set in the factory`
      )
    }

    link.updateOrigin(this)
    this.links.set(link.id, link)

    return link
  }

  public deleteLink(id: UUID): boolean {
    const link = this.links.get(id)

    if (link) {
      link.delete()
      this.render()

      return true
    }

    return false
  }

  public delete(): void {
    if (!this.id) {
      throw new Error(
        `No valid ID has been assigned for the block socket you're trying to delete.`
      )
    }

    if (!this.parent) {
      throw new Error(
        `Critical error! Failed to find a parent for block socket ID "${this.id}"`
      )
    }

    // The idea here is to NEVER propagate deletions to parent delete methods,
    // but handle the deletions in the "delete" IElement method implementations.
    // We delete all references to this object here and let the garbage collector take care of the rest.
    if (this.side === 'in') {
      this.parent.inSockets.delete(this.id)
    }

    if (this.side === 'out') {
      this.parent.outSockets.delete(this.id)
    }

    this.parent = null
  }
}
