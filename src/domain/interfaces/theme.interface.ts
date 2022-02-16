import { IStyle } from './style.interface'
import { IBlockStyle } from './block-style.interface'
import { ICircleStyle } from './circle-style.interface'

export interface ITheme {
  blockStyle: IBlockStyle
  socketStyle: ICircleStyle
  linkStyle: IStyle
}
