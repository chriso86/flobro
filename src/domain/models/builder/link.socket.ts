import { BaseEntity } from './base.entity'
import { Link } from './link'
import { Coordinates, UUID } from '../../interfaces/custom-types'
import { CircleStyle } from '../theme/circle-style'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../theme/fill'
import { Stroke } from '../theme/stroke'

export class LinkSocket<T> extends BaseEntity<T> {
  public position: Coordinates
  public parent: Link<unknown> | null
  public style: CircleStyle

  constructor(
    position: Coordinates,
    parent: Link<unknown>,
    options: {
      id?: UUID
      data?: T
    }
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

    this.position = position
    this.parent = parent
    this.style = new CircleStyle(settings.radius, fill, stroke)
  }

  public override render(): void {
    throw new Error(`Not Implemented`)
  }

  public updateParent(link: Link<unknown>): void {
    this.parent = link
  }

  public updatePosition(position: Coordinates): void {
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
