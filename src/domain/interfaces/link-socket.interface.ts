import { ICoordinates } from './coordinates.interface'
import { ILink } from './link.interface'
import { ISocket } from './socket.interface'

export interface ILinkSocket<T> extends ISocket<T> {
  parent?: ILink<unknown> | null
  position: ICoordinates

  updateParent(link: ILink<unknown>): void
  updatePosition(position: ICoordinates): void
}
