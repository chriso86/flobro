import { BaseEntity } from './base.entity'
import { Link } from './link'
import { LinkFactory } from '../../../factory/link.factory'
import { Side, UUID } from '../../interfaces/custom-types'
import { Block } from './block'
import { CircleStyle } from '../theme/circle-style'
import { Fill } from '../theme/fill'
import { FlobroConfig } from '../config/flobro.config'
import { Stroke } from '../theme/stroke'

export class BlockSocket<T> extends BaseEntity<T> {
  public side: Side
  public parent: Block<unknown> | null
  public style: CircleStyle
  public links: Map<UUID, Link<unknown>>

  constructor(
    side: Side,
    parent: Block<unknown>,
    options: { id?: UUID; data?: T }
  ) {
    const settings = FlobroConfig.SocketGlobalSettings
    const fill = new Fill(settings.fillColor)
    const stroke = new Stroke(settings.strokeColor, settings.strokeWidth)

    super({
      id: options.id,
      canDelete: settings.canDelete,
      canEdit: settings.canEdit,
      canView: settings.canView,
      data: options.data,
    })

    this.side = side
    this.parent = parent
    this.style = new CircleStyle(settings.radius, fill, stroke)
    this.links = new Map<UUID, Link<unknown>>()
  }

  public override render(): void {
    throw new Error('Not implemented')
  }

  public updateParent(block: Block<unknown>): void {
    this.parent = block
  }

  public addLink<K>(
    options: {
      id?: UUID
      startX: number
      startY: number
      startCurveX: number
      startCurveY: number
      endCurveX: number
      endCurveY: number
      endX: number
      endY: number
      data?: K
    },
    setting: 'origin' | 'target'
  ): Link<K | null> {
    const link = LinkFactory.Create<K>({
      ...options,
      ...(setting === 'origin' ? { origin: this } : {}),
      ...(setting === 'target' ? { target: this } : {}),
    })

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

  public override delete(): void {
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
