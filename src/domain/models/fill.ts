import { IFill } from '../interfaces/fill.interface'
import { Url } from '../../utils/custom-types'
import { FlobroConfig } from '../../config/flobro.config'

export class Fill implements IFill {
  constructor(
    public color: string | Url = FlobroConfig.defaults.DefaultFillColor
  ) {}
}
