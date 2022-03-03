import { Style } from './style'
import {
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_SOCKET_RADIUS,
} from '../../utils/default.constants'
import { IStyle } from '../interfaces/style.interface'
import { ITheme } from '../interfaces/theme.interface'
import { ICircleStyle } from '../interfaces/circle-style.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { CircleStyle } from './circle-style'
import { BlockStyle } from './block-style'
import { Fill } from './fill'
import { FlobroConfig } from '../../config/flobro.config'
import { Stroke } from './stroke'

export class Theme implements ITheme {
  constructor(
    public socketStyle: ICircleStyle = new CircleStyle(
      DEFAULT_SOCKET_RADIUS,
      new Fill(FlobroConfig.defaults.DefaultSocketFillColor),
      new Stroke(
        FlobroConfig.defaults.DefaultSocketStrokeColor,
        FlobroConfig.defaults.DefaultSocketStrokeWidth
      )
    ),
    public blockStyle: IBlockStyle = new BlockStyle(
      DEFAULT_BLOCK_WIDTH,
      DEFAULT_BLOCK_HEIGHT,
      new Fill(FlobroConfig.defaults.DefaultBlockFillColor),
      new Stroke(
        FlobroConfig.defaults.DefaultBlockStrokeColor,
        FlobroConfig.defaults.DefaultBlockStrokeWidth
      )
    ),
    public linkStyle: IStyle = new Style(
      undefined,
      new Stroke(
        FlobroConfig.defaults.DefaultLinkStrokeColor,
        FlobroConfig.defaults.DefaultLinkStrokeWidth
      )
    )
  ) {}
}
