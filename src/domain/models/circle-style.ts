import { Style } from './style'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { IStroke } from '../interfaces/stroke.interface'
import { ICircleStyle } from '../interfaces/circle-style.interface'
import { IFill } from '../interfaces/fill.interface'
import { UnitOfMeasure } from '../../utils/custom-types'
import { FlobroConfig } from '../../config/flobro.config'

export class CircleStyle extends Style implements ICircleStyle {
  constructor(
    public radius: UnitOfMeasure = FlobroConfig.defaults.DefaultSocketRadius,
    fill: IFill = new Fill(),
    stroke: IStroke = new Stroke()
  ) {
    super(fill, stroke)
  }
}
