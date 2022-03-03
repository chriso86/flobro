import { Side } from '../../utils/custom-types'
import { ISocketOptions } from './socket-options.interface'

export interface IBlockSocketOptions<T> extends ISocketOptions<T> {
  side: Side
}
