import { Socket } from './socket'
import {
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_VIEW,
  DEFAULT_SOCKET_DATA,
  DEFAULT_SOCKET_PARENT,
  DEFAULT_SOCKET_STYLE,
} from './default.constants'
import { ICoordinates } from '../interfaces/coordinates.interface'
import { ILinkSocket } from '../interfaces/link-socket.interface'
import { ICircleStyle } from '../interfaces/circle-style.interface'
import { ILink } from '../interfaces/link.interface'
import { UUID } from '../interfaces/custom-types'

export class LinkSocket<T> extends Socket<T> implements ILinkSocket<T> {
  constructor(
    public id: UUID,
    public position: ICoordinates,
    public style: ICircleStyle = DEFAULT_SOCKET_STYLE,
    public canDelete: boolean = DEFAULT_SOCKET_CAN_DELETE,
    public canEdit: boolean = DEFAULT_LINK_CAN_EDIT,
    public canView: boolean = DEFAULT_SOCKET_CAN_VIEW,
    public data: T | null = DEFAULT_SOCKET_DATA,
    public parent: ILink<unknown> | null = DEFAULT_SOCKET_PARENT
  ) {
    super(id, style, canDelete, canEdit, canView, data)
  }

  public render(): void {}

  public updateParent(link: ILink<unknown>): void {
    this.parent = link
  }

  public updatePosition(position: ICoordinates): void {
    this.position = position
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
    this.parent.linkSockets.delete(this.id)
    this.parent = null
  }
}
