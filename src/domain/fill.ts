import { DEFAULT_FILL_COLOR } from '../utils/default.constants'
import { IFill } from './interfaces/fill.interface'
import { Url } from './interfaces/custom-types'

export class Fill implements IFill {
  constructor(public color: string | Url = DEFAULT_FILL_COLOR) {}
}
