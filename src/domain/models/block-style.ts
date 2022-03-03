import { Style } from './style'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { IStroke } from '../interfaces/stroke.interface'
import { IBlockStyle } from '../interfaces/block-style.interface'
import { IFill } from '../interfaces/fill.interface'
import { UnitOfMeasure } from '../../utils/custom-types'
import { FlobroConfig } from '../../config/flobro.config'

export class BlockStyle extends Style implements IBlockStyle {
  constructor(
    public width: UnitOfMeasure = FlobroConfig.defaults
      .DefaultBlockElementWidth,
    public height: UnitOfMeasure = FlobroConfig.defaults
      .DefaultBlockElementHeight,
    fill: IFill = new Fill(),
    stroke: IStroke = new Stroke()
  ) {
    super(fill, stroke)
  }
}
