import { Socket } from './socket'
import {
  DEFAULT_BLOCK_SOCKET_LINKS,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_VIEW,
  DEFAULT_SOCKET_DATA,
  DEFAULT_SOCKET_PARENT,
  DEFAULT_SOCKET_STYLE,
} from './default.constants'
import { Link } from './link'
import { LinkFactory } from '../service/link.factory'
import { IBlock } from '../interfaces/block.interface'
import { IBlockSocket } from '../interfaces/block-socket.interface'
import { ICircleStyle } from '../interfaces/circle-style.interface'
import { ILinkOptions } from '../interfaces/link-options.interface'
import { ILink } from '../interfaces/link.interface'
import { Side, UUID } from '../interfaces/custom-types'

export class BlockSocket<T> extends Socket<T> implements IBlockSocket<T> {
  constructor(
    public id: UUID,
    public side: Side,
    public style: ICircleStyle = DEFAULT_SOCKET_STYLE,
    public canDelete: boolean = DEFAULT_SOCKET_CAN_DELETE,
    public canEdit: boolean = DEFAULT_LINK_CAN_EDIT,
    public canView: boolean = DEFAULT_SOCKET_CAN_VIEW,
    public data: T | null = DEFAULT_SOCKET_DATA,
    public parent: IBlock<unknown> | null = DEFAULT_SOCKET_PARENT,
    public links: Map<UUID, ILink<unknown>> = DEFAULT_BLOCK_SOCKET_LINKS
  ) {
    super(id, style, canDelete, canEdit, canView, data)
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public updateParent(block: IBlock<unknown>): void {
    this.parent = block
  }

  public addLink<T>(options: ILinkOptions<T>): Link<T> {
    const link = LinkFactory.Create<T>(options)

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
