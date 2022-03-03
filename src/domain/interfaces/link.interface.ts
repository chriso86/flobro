import { IElement } from './element.interface'
import { IBlockSocket } from './block-socket.interface'
import { ILinkSocket } from './link-socket.interface'
import { UUID } from '../../utils/custom-types'
import { ILinkSocketOptions } from './link-socket-options.interface'
import { LinkSocket } from '../models/link.socket'

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
  origin?: IBlockSocket<unknown> | null
  target?: IBlockSocket<unknown> | null

  updateTarget(socket: IBlockSocket<unknown>): void
  updateOrigin(socket: IBlockSocket<unknown>): void

  /* Node Link Pieces (either on Nodes or along Paths) */
  addLinkSocket<K>(options: ILinkSocketOptions<K>): LinkSocket<K>
  deleteLinkSocket(id: UUID): boolean
}
