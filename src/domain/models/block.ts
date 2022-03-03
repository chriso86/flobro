import { BlockSocketFactory } from '../../factory/block-socket.factory'
import { BlockSocket } from './block.socket'
import { NotImplementedException } from '../../utils/error-constants'
import { BlockStyle } from './block-style'
import { FlobroConfig } from '../../config/flobro.config'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { IBlock } from '../interfaces/block.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { IBlockSocketOptions } from '../interfaces/block-socket-options.interface'
import { ICoordinates } from '../interfaces/coordinates.interface'
import { HTML, UUID } from '../../utils/custom-types'
import { IBlockOptions } from '../interfaces/block-options.interface'

export class Block<T> implements IBlock<T> {
  public id?: UUID
  public title: string
  public content: HTML
  public position: ICoordinates
  public style: IBlockStyle = new BlockStyle(
    FlobroConfig.defaults.DefaultBlockWidth,
    FlobroConfig.defaults.DefaultBlockHeight,
    new Fill(FlobroConfig.defaults.DefaultBlockFillColor),
    new Stroke(
      FlobroConfig.defaults.DefaultBlockStrokeColor,
      FlobroConfig.defaults.DefaultBlockStrokeWidth
    )
  )
  public canDelete: boolean = FlobroConfig.defaults.DefaultBlockCanDelete
  public canEdit: boolean = FlobroConfig.defaults.DefaultBlockCanEdit
  public canView: boolean = FlobroConfig.defaults.DefaultBlockCanView
  public data: T | null = null
  public inSockets: Map<UUID, BlockSocket<unknown>> = new Map<
    UUID,
    BlockSocket<unknown>
  >()
  public outSockets: Map<UUID, BlockSocket<unknown>> = new Map<
    UUID,
    BlockSocket<unknown>
  >()

  constructor(options: IBlockOptions<T>) {
    this.id = options.id
    this.title = options.title
    this.content = options.content
    this.position = options.position
    this.canDelete = options.canDelete ?? this.canDelete
    this.canEdit = options.canEdit ?? this.canEdit
    this.canView = options.canView ?? this.canView
    this.data = options.data ?? this.data
    this.style = options.style ?? this.style
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public updateId(id: string): void {
    this.id = id
  }

  public addSocket<K>(options: IBlockSocketOptions<K>): BlockSocket<K> {
    const blockSocket = BlockSocketFactory.Create<K>(options)

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

  public updatePosition(position: ICoordinates): void {
    this.position = position
  }

  public updateStyle(style: IBlockStyle): void {
    this.style = style
  }

  public updateContent(content: HTML): void {
    this.content = content
  }

  public updateData(data: T): void {
    this.data = data
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

  public delete(): boolean {
    // Implement this when groups become a thing
    throw NotImplementedException()
  }
}
