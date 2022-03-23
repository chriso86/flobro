import { UnitOfMeasure, Url } from '../../interfaces/custom-types'

export class Stroke {
  constructor(public color: string | Url, public width: UnitOfMeasure) {}
}
