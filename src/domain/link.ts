import {
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_LINK_DATA,
  DEFAULT_LINK_ORIGIN,
  DEFAULT_LINK_SOCKETS,
  DEFAULT_LINK_STYLE,
  DEFAULT_LINK_TARGET,
} from '../utils/default.constants'
import { LinkSocket } from './link.socket'
import { LinkSocketFactory } from '../factory/link-socket.factory'
import { IStyle } from './interfaces/style.interface'
import { IBlockSocket } from './interfaces/block-socket.interface'
import { ILinkSocket } from './interfaces/link-socket.interface'
import { ILinkSocketOptions } from './interfaces/link-socket-options.interface'
import { ILink } from './interfaces/link.interface'
import { UUID } from './interfaces/custom-types'

export class Link<T> implements ILink<T> {
  constructor(
    public id: UUID,
    public startX: number,
    public startY: number,
    public startCurveX: number,
    public startCurveY: number,
    public endCurveX: number,
    public endCurveY: number,
    public endX: number,
    public endY: number,
    public style: IStyle = DEFAULT_LINK_STYLE,
    public canDelete: boolean = DEFAULT_LINK_CAN_DELETE,
    public canEdit: boolean = DEFAULT_LINK_CAN_EDIT,
    public canView: boolean = DEFAULT_LINK_CAN_VIEW,
    public data: T | null = DEFAULT_LINK_DATA,
    public origin: IBlockSocket<unknown> | null = DEFAULT_LINK_ORIGIN,
    public target: IBlockSocket<unknown> | null = DEFAULT_LINK_TARGET,
    public linkSockets: Map<UUID, ILinkSocket<unknown>> = DEFAULT_LINK_SOCKETS
  ) {}

  public render(): void {
    throw new Error('Not implemented')
  }

  public addLinkSocket<T>(options: ILinkSocketOptions<T>): LinkSocket<T> {
    const linkSocket = LinkSocketFactory.Create<T>(options)

    linkSocket.updateParent(this)
    this.linkSockets.set(linkSocket.id, linkSocket)
    this.render()

    return linkSocket
  }

  public deleteLinkSocket(id: UUID): boolean {
    const linkSocket = this.linkSockets.get(id)

    if (linkSocket) {
      linkSocket.delete()
      this.render()

      return true
    }

    return false
  }

  public updateOrigin(socket: IBlockSocket<unknown>): void {
    this.origin = socket
  }

  public updateTarget(socket: IBlockSocket<unknown>): void {
    this.target = socket
  }

  public updateData(data: T): void {
    this.data = data
  }

  public updateStyle(style: IStyle): void {
    this.style = style
  }

  public updateDeletePermission(canDelete: boolean): void {
    this.canDelete = canDelete
  }

  public updateEditPermission(canEdit: boolean): void {
    this.canEdit = canEdit
  }

  public updateViewPermission(canView: boolean): void {
    this.canView = canView
  }

  public delete(): void {
    if (!this.origin || !this.target) {
      throw new Error(
        `Critical error! Failed to find an origin or target block for link ID "${this.id}"`
      )
    }

    // The idea here is to NEVER propagate deletions to parent delete methods,
    // but handle the deletions in the "delete" IElement method implementations.
    // We delete all references to this object here and let the garbage collector take care of the rest.
    this.origin.links.delete(this.id)
    this.target.links.delete(this.id)
    this.origin = null
    this.target = null
  }
}
