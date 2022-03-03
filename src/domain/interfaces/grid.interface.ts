import { IStyle } from './style.interface'
import { Decimal } from '../../utils/custom-types'
import { IState } from './state.interface'

export interface IGrid {
  gridSize: Decimal
  snapToGrid: boolean
  style: IStyle

  render(state: IState): void
}
