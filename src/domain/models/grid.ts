import { Style } from './style'
import { IStyle } from '../interfaces/style.interface'
import { IGrid } from '../interfaces/grid.interface'
import { Decimal } from '../../utils/custom-types'
import { FlobroConfig } from '../../config/flobro.config'
import { Fill } from './fill'
import { Stroke } from './stroke'
import { IStroke } from '../interfaces/stroke.interface'
import { IFill } from '../interfaces/fill.interface'
import { IState } from '../interfaces/state.interface'
import { Helper } from '../../utils/helper'

export class Grid implements IGrid {
  public style: IStyle

  constructor(
    public gridSize: Decimal = FlobroConfig.defaults.DefaultGridSize,
    public snapToGrid: boolean = FlobroConfig.defaults.DefaultGridSnap,
    fill: IFill = new Fill(FlobroConfig.defaults.DefaultGridFillColor),
    stroke: IStroke = new Stroke(
      FlobroConfig.defaults.DefaultGridStrokeColor,
      FlobroConfig.defaults.DefaultGridStrokeWidth
    )
  ) {
    this.style = new Style(fill, stroke)
  }

  public render(state: IState): void {
    const svgNamespace = FlobroConfig.defaults.DefaultSvgNamespace
    const svg = state.workArea.svg
    const defs = document.createElementNS(svgNamespace, 'defs')
    const smallGrid = document.createElementNS(svgNamespace, 'pattern')
    const smallGridPath = document.createElementNS(svgNamespace, 'path')
    const grid = document.createElementNS(svgNamespace, 'pattern')
    const gridRect = document.createElementNS(svgNamespace, 'rect')
    const gridPath = document.createElementNS(svgNamespace, 'path')
    const gridContainer = document.createElementNS(svgNamespace, 'rect')
    const minGridSize = FlobroConfig.defaults.DefaultGridSize / 10
    const viewportWidth = Helper.ToNearestHundredth(
      FlobroConfig.defaults.DefaultSvgWidth * 2
    )
    const viewportHeight = Helper.ToNearestHundredth(
      FlobroConfig.defaults.DefaultSvgHeight * 2
    )

    // Small Grid Pattern
    smallGrid.setAttribute('id', 'smallGrid')
    smallGrid.setAttribute('width', `${minGridSize}`)
    smallGrid.setAttribute('height', `${minGridSize}`)
    smallGrid.setAttribute('patternUnits', 'userSpaceOnUse')

    // Small Grid Path
    smallGridPath.setAttribute('d', `M ${minGridSize} 0 L 0 0 0 ${minGridSize}`)
    smallGridPath.setAttribute('fill', 'none')
    smallGridPath.setAttribute('stroke', '#666')
    smallGridPath.setAttribute('stroke-width', '0.5')

    // Grid Pattern
    grid.setAttribute('id', 'grid')
    grid.setAttribute('width', `${this.gridSize}`)
    grid.setAttribute('height', `${this.gridSize}`)
    grid.setAttribute('patternUnits', 'userSpaceOnUse')

    // Grid Rect
    gridRect.setAttribute('width', `${this.gridSize}`)
    gridRect.setAttribute('height', `${this.gridSize}`)
    gridRect.setAttribute('fill', 'url(#smallGrid)')

    // Grid Path
    gridPath.setAttribute('d', `M ${this.gridSize} 0 L 0 0 0 ${this.gridSize}`)
    gridPath.setAttribute('fill', 'none')
    gridPath.setAttribute('stroke', '#666')
    gridPath.setAttribute('stroke-width', '1')

    gridContainer.setAttribute('width', `${viewportWidth}`)
    gridContainer.setAttribute('height', `${viewportHeight}`)
    gridContainer.setAttribute('fill', 'url(#grid)')

    smallGrid.appendChild(smallGridPath)
    grid.appendChild(gridRect)
    grid.appendChild(gridPath)
    defs.appendChild(smallGrid)
    defs.appendChild(grid)
    svg.appendChild(defs)
    svg.appendChild(gridContainer)
  }
}
