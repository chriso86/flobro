import { IElementOptions } from './element-options.interface'
import { ICoordinates } from './coordinates.interface'
import { ICircleStyle } from './circle-style.interface'
import { UUID } from './custom-types'

export interface ILinkSocketOptions<T> extends IElementOptions<T> {
  position: ICoordinates
  parentId?: UUID | null
  style?: ICircleStyle
}
