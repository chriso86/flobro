import { Stroke } from './stroke'
import { LineStyle } from './line-style'
import { Fill } from './fill'

export class ShapeStyle extends LineStyle {
  constructor(public fill: Fill, stroke: Stroke) {
    super(stroke)
  }
}
