import { UnitOfMeasure } from '../../interfaces/custom-types'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { ShapeStyle } from './shape-style'

export class CircleStyle extends ShapeStyle {
  constructor(public radius: UnitOfMeasure, fill: Fill, stroke: Stroke) {
    super(fill, stroke)
  }
}
