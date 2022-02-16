import { IElement } from './element.interface'
import { IBlockSocket } from './block-socket.interface'
import { ILinkSocket } from './link-socket.interface'
import { UUID } from './custom-types'

export interface ILink<T> extends IElement<T> {
  startX: number
  startY: number
  startCurveX: number
  startCurveY: number
  endCurveX: number
  endCurveY: number
  endX: number
  endY: number
  linkSockets: Map<UUID, ILinkSocket<unknown>>
  origin: IBlockSocket<unknown> | null
  target: IBlockSocket<unknown> | null

  updateTarget(socket: IBlockSocket<unknown>): void
  updateOrigin(socket: IBlockSocket<unknown>): void

  /* Node Link Pieces (either on Nodes or along Paths) */
  addLinkSocket<T>(options: ILinkSocket<T>): ILinkSocket<T>
  deleteLinkSocket(id: UUID): boolean
}
