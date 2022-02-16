import { IElement } from './element.interface'
import { IBlockStyle } from './block-style.interface'
import { IBlockSocketOptions } from './block-socket-options.interface'
import { IBlockSocket } from './block-socket.interface'
import { ICoordinates } from './coordinates.interface'
import { HTML, UUID } from './custom-types'

export interface IBlock<T> extends IElement<T> {
  title: string
  content: HTML
  inSockets: Map<UUID, IBlockSocket<unknown>>
  outSockets: Map<UUID, IBlockSocket<unknown>>
  position: ICoordinates
  style: IBlockStyle

  /* Override updateStyle method on IElement base interface */
  updateStyle(style: IBlockStyle): void
  updatePosition(position: ICoordinates): void
  updateContent(content: HTML): void

  /* Node Link Pieces (either on Nodes or along Paths) */
  addSocket<T>(options: IBlockSocketOptions<T>): IBlockSocket<T>
  deleteSocket(id: UUID): boolean
}
