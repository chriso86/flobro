import { IElementOptions } from './element-options.interface'
import { ICircleStyle } from './circle-style.interface'
import { Side, UUID } from './custom-types'

export interface IBlockSocketOptions<T> extends IElementOptions<T> {
  side: Side
  parentId?: UUID | null
  linkIds?: UUID[]
  style?: ICircleStyle
}
