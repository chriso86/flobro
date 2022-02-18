import { IBlockStyle } from './block-style.interface'
import { IElementOptions } from './element-options.interface'
import { ICoordinates } from './coordinates.interface'
import { HTML } from './custom-types'

export interface IBlockOptions<T> extends IElementOptions<T> {
  title: string
  content: HTML
  position: ICoordinates
  style?: IBlockStyle
}
