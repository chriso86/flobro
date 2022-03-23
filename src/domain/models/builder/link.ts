import { LinkSocket } from './link.socket'
import { LinkSocketFactory } from '../../../factory/link-socket.factory'
import { Vector2d, UUID } from '../../interfaces/custom-types'
import { BlockSocket } from './block.socket'
import { LineStyle } from '../theme/line-style'
import { BaseEntity } from './base.entity'
import { FlobroConfig } from '../config/flobro.config'
import { Stroke } from '../theme/stroke'

export class Link<T> extends BaseEntity<T> {
  public start: Vector2d
  public startCurve: Vector2d
  public endCurve: Vector2d
  public end: Vector2d
  public style: LineStyle
  public linkSockets: Map<string, LinkSocket<unknown>>
  public origin: BlockSocket<unknown> | null
  public target: BlockSocket<unknown> | null

  constructor(
    start: Vector2d,
    startCurve: Vector2d,
    endCurve: Vector2d,
    end: Vector2d,
    options: {
      id?: UUID
      data?: T
      origin?: BlockSocket<unknown>
      target?: BlockSocket<unknown>
    }
  ) {
    const settings = FlobroConfig.LinkGlobalSettings
    const stroke = new Stroke(settings.strokeColor, settings.strokeWidth)

    super({
      id: options.id,
      data: options.data,
      canDelete: settings.canDelete,
      canEdit: settings.canEdit,
      canView: settings.canView,
    })

    this.start = start
    this.startCurve = startCurve
    this.endCurve = endCurve
    this.end = end
    this.style = new LineStyle(stroke)
    this.linkSockets = new Map<string, LinkSocket<unknown>>()
    this.origin = options.origin ?? null
    this.target = options.target ?? null
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public addLinkSocket<K>(options: {
    id?: UUID
    position: Vector2d
    data?: K
  }): LinkSocket<K> {
    const linkSocket = LinkSocketFactory.Create<K>({
      ...options,
      parent: this,
    })

    if (!linkSocket.id) {
      throw new Error(
        `Critical error. The ID for the link socket was not set in the factory`
      )
    }

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

  public updateOrigin(socket: BlockSocket<unknown>): void {
    this.origin = socket
  }

  public updateTarget(socket: BlockSocket<unknown>): void {
    this.target = socket
  }

  public updateStyle(style: LineStyle): void {
    this.style = style
  }

  public delete(): void {
    if (!this.id) {
      throw new Error(
        `No valid ID has been assigned for the link you're trying to delete.`
      )
    }

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
