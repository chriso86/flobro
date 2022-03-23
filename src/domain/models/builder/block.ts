import { BlockSocketFactory } from '../../../factory/block-socket.factory'
import { NotImplementedException } from '../../../utils/error-constants'
import { Coordinates, HTML, Side, UUID } from '../../interfaces/custom-types'
import { BlockStyle } from '../theme/block-style'
import { BlockSocket } from './block.socket'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../theme/fill'
import { Stroke } from '../theme/stroke'
import { BaseEntity } from './base.entity'

export class Block<T> extends BaseEntity<T> {
  public title: string
  public content: HTML
  public position: Coordinates
  public style: BlockStyle
  public inSockets: Map<UUID, BlockSocket<unknown>>
  public outSockets: Map<UUID, BlockSocket<unknown>>

  constructor(
    title: string,
    content: HTML,
    position: Coordinates,
    options: {
      id?: UUID
      data?: T
    }
  ) {
    const settings = FlobroConfig.BlockGlobalSettings
    const fill = new Fill(settings.fillColor)
    const stroke = new Stroke(settings.strokeColor, settings.strokeWidth)

    super({
      id: options.id,
      data: options.data,
      canDelete: settings.canDelete,
      canEdit: settings.canEdit,
      canView: settings.canView,
    })

    this.title = title
    this.content = content
    this.position = position
    this.style = new BlockStyle(settings.width, settings.height, fill, stroke)
    this.inSockets = new Map<UUID, BlockSocket<unknown>>()
    this.outSockets = new Map<UUID, BlockSocket<unknown>>()
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public addSocket<K>(options: {
    id?: UUID
    side: Side
    data?: K
  }): BlockSocket<K> {
    const blockSocket = BlockSocketFactory.Create<K>({
      id: options.id,
      parent: this,
      side: options.side,
      data: options.data,
    })

    if (!blockSocket.id) {
      throw new Error(
        `Critical error. The ID for the block was not set in the factory`
      )
    }

    blockSocket.updateParent(this)

    if (options.side === 'in') {
      this.inSockets.set(blockSocket.id, blockSocket)
    }

    if (options.side === 'out') {
      this.outSockets.set(blockSocket.id, blockSocket)
    }

    return blockSocket
  }

  public deleteSocket(id: UUID): boolean {
    const inSocket = this.inSockets.get(id)
    const outSocket = this.inSockets.get(id)
    const socket = inSocket ?? outSocket

    if (socket) {
      socket.delete()
      this.render()

      return true
    }

    return false
  }

  public updatePosition(position: Coordinates): void {
    this.position = position
  }

  public updateStyle(style: Partial<BlockStyle>): void {
    this.style = {
      ...this.style,
      ...style,
    }
  }

  public updateContent(content: HTML): void {
    this.content = content
  }

  delete(): void {
    throw NotImplementedException()
  }
}
