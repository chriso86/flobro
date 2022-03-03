import { IWorkArea } from '../interfaces/work-area.interface'
import { IGrid } from '../interfaces/grid.interface'
import { ISvgConfig } from '../interfaces/svg-config.interface'
import { Grid } from './grid'
import { FlobroConfig } from '../../config/flobro.config'

export class WorkArea implements IWorkArea {
  constructor(
    public container: HTMLElement,
    public svg: SVGSVGElement,
    public svgConfig: ISvgConfig = FlobroConfig.svgConfig,
    public grid: IGrid = new Grid()
  ) {}
}
