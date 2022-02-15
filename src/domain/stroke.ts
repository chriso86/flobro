import { DEFAULT_STOKE_COLOR, DEFAULT_STROKE_WIDTH } from './default.constants'
import { IStroke } from '../interfaces/stroke.interface'
import { UnitOfMeasure, Url } from '../interfaces/custom-types'

export class Stroke implements IStroke {
  constructor(
    public color: string | Url = DEFAULT_STOKE_COLOR,
    public width: UnitOfMeasure = DEFAULT_STROKE_WIDTH
  ) {}
}
