import { UnitOfMeasure } from '../../interfaces/custom-types'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { ShapeStyle } from './shape-style'

export class BlockStyle extends ShapeStyle {
  constructor(
    public width: UnitOfMeasure,
    public height: UnitOfMeasure,
    fill: Fill,
    stroke: Stroke
  ) {
    super(fill, stroke)
  }
}
