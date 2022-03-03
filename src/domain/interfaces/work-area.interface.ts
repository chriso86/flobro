import { IGrid } from './grid.interface'
import { ISvgConfig } from './svg-config.interface'

export interface IWorkArea {
  container: HTMLElement
  svg: SVGSVGElement
  svgConfig: ISvgConfig
  grid: IGrid
}
