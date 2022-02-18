import { ICircleStyle } from './circle-style.interface'
import { IElementOptions } from './element-options.interface'

export interface ISocketOptions<T> extends IElementOptions<T> {
  style?: ICircleStyle
}
