import { BlockSocketFactory } from '../service/block-socket.factory'
import {
  DEFAULT_BLOCK_CAN_DELETE,
  DEFAULT_BLOCK_CAN_EDIT,
  DEFAULT_BLOCK_CAN_VIEW,
  DEFAULT_BLOCK_DATA,
  DEFAULT_BLOCK_SOCKETS,
  DEFAULT_BLOCK_STYLE,
} from './default.constants'
import { BlockSocket } from './block.socket'
import { NotImplementedException } from './error-constants'
import { IBlock } from '../interfaces/block.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { IBlockSocketOptions } from '../interfaces/block-socket-options.interface'
import { ICoordinates } from '../interfaces/coordinates.interface'
import { HTML, UUID } from '../interfaces/custom-types'

export class Block<T> implements IBlock<T> {
  constructor(
    public id: UUID,
    public title: string,
    public content: HTML,
    public position: ICoordinates,
    public style: IBlockStyle = DEFAULT_BLOCK_STYLE,
    public canDelete: boolean = DEFAULT_BLOCK_CAN_DELETE,
    public canEdit: boolean = DEFAULT_BLOCK_CAN_EDIT,
    public canView: boolean = DEFAULT_BLOCK_CAN_VIEW,
    public data: T | null = DEFAULT_BLOCK_DATA,
    public inSockets: Map<UUID, BlockSocket<unknown>> = DEFAULT_BLOCK_SOCKETS,
    public outSockets: Map<UUID, BlockSocket<unknown>> = DEFAULT_BLOCK_SOCKETS
  ) {}

  public render(): void {
    throw new Error('Not implemented')
  }

  public addSocket<T>(options: IBlockSocketOptions<T>): BlockSocket<T> {
    const nodeLink = BlockSocketFactory.Create<T>(options)

    nodeLink.updateParent(this)

    if (options.side === 'in') {
      this.inSockets.set(nodeLink.id, nodeLink)
    }

    if (options.side === 'out') {
      this.outSockets.set(nodeLink.id, nodeLink)
    }

    return nodeLink
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
    // TODO: Chris - Implement this when groups become a thing
    throw NotImplementedException()
  }
}
