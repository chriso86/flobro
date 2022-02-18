import { ICoordinates } from './coordinates.interface'
import { ICircleStyle } from './circle-style.interface'
import { ISocketOptions } from './socket-options.interface'

export interface ILinkSocketOptions<T> extends ISocketOptions<T> {
  position: ICoordinates
}
