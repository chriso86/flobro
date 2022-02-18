import { Style } from './style'
import {
  DEFAULT_GRID_FILL,
  DEFAULT_GRID_SIZE,
  DEFAULT_GRID_SNAP,
  DEFAULT_GRID_STROKE,
} from '../utils/default.constants'
import { IStyle } from './interfaces/style.interface'
import { IGrid } from './interfaces/grid.interface'
import { UnitOfMeasure } from './interfaces/custom-types'

export class Grid implements IGrid {
  constructor(
    public gridSize: UnitOfMeasure = DEFAULT_GRID_SIZE,
    public snapToGrid: boolean = DEFAULT_GRID_SNAP,
    public style: IStyle = new Style(DEFAULT_GRID_FILL, DEFAULT_GRID_STROKE)
  ) {}

  public render(container: HTMLElement): void {
    throw new Error('Not Implemented')
  }
}
