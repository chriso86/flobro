import { Style } from './style'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { DEFAULT_SOCKET_RADIUS } from '../utils/default.constants'
import { IStroke } from './interfaces/stroke.interface'
import { ICircleStyle } from './interfaces/circle-style.interface'
import { IFill } from './interfaces/fill.interface'
import { UnitOfMeasure } from './interfaces/custom-types'

export class CircleStyle extends Style implements ICircleStyle {
  constructor(
    public radius: UnitOfMeasure = DEFAULT_SOCKET_RADIUS,
    public fill: IFill = new Fill(),
    public stroke: IStroke = new Stroke()
  ) {
    super(fill, stroke)
  }
}
