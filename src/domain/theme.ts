import { Style } from './style'
import {
  DEFAULT_BLOCK_FILL,
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_STROKE,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_LINK_STROKE,
  DEFAULT_SOCKET_FILL,
  DEFAULT_SOCKET_RADIUS,
  DEFAULT_SOCKET_STROKE,
} from './default.constants'
import { IStyle } from '../interfaces/style.interface'
import { ITheme } from '../interfaces/theme.interface'
import { ICircleStyle } from '../interfaces/circle-style.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { CircleStyle } from './circle-style'
import { BlockStyle } from './block-style'

export class Theme implements ITheme {
  constructor(
    public socketStyle: ICircleStyle = new CircleStyle(
      DEFAULT_SOCKET_RADIUS,
      DEFAULT_SOCKET_FILL,
      DEFAULT_SOCKET_STROKE
    ),
    public blockStyle: IBlockStyle = new BlockStyle(
      DEFAULT_BLOCK_WIDTH,
      DEFAULT_BLOCK_HEIGHT,
      DEFAULT_BLOCK_FILL,
      DEFAULT_BLOCK_STROKE
    ),
    public linkStyle: IStyle = new Style(undefined, DEFAULT_LINK_STROKE)
  ) {}
}
