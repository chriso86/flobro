import { Style } from './style'
import { Fill } from './fill'
import { Stroke } from './stroke'
import {
  DEFAULT_BLOCK_ELEMENT_HEIGHT,
  DEFAULT_BLOCK_ELEMENT_WIDTH,
} from './default.constants'
import { IStroke } from '../interfaces/stroke.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { IFill } from '../interfaces/fill.interface'
import { UnitOfMeasure } from '../interfaces/custom-types'

export class BlockStyle extends Style implements IBlockStyle {
  constructor(
    public width: UnitOfMeasure = DEFAULT_BLOCK_ELEMENT_WIDTH,
    public height: UnitOfMeasure = DEFAULT_BLOCK_ELEMENT_HEIGHT,
    public fill: IFill = new Fill(),
    public stroke: IStroke = new Stroke()
  ) {
    super(fill, stroke)
  }
}
