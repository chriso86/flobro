import { Socket } from './socket'
import { ICoordinates } from '../interfaces/coordinates.interface'
import { ILinkSocket } from '../interfaces/link-socket.interface'
import { ILink } from '../interfaces/link.interface'
import { ILinkSocketOptions } from '../interfaces/link-socket-options.interface'

export class LinkSocket<T> extends Socket<T> implements ILinkSocket<T> {
  public position: ICoordinates
  public parent: ILink<unknown> | null = null

  constructor(options: ILinkSocketOptions<T>) {
    super({
      id: options.id,
      style: options.style,
      canDelete: options.canDelete,
      canEdit: options.canEdit,
      canView: options.canView,
      data: options.data,
    })

    this.position = options.position
  }

  public override render(): void {
    throw new Error(`Not Implemented`)
  }

  public override updateId(id: string): void {
    this.id = id
  }

  public updateParent(link: ILink<unknown>): void {
    this.parent = link
  }

  public updatePosition(position: ICoordinates): void {
    this.position = position
  }

  public override delete(): void {
    if (!this.id) {
      throw new Error(
        `No valid ID has been assigned for the link socket you're trying to delete.`
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
    this.parent.linkSockets.delete(this.id)
    this.parent = null
  }
}
