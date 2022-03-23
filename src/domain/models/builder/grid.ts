import { Decimal } from '../../interfaces/custom-types'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../theme/fill'
import { Stroke } from '../theme/stroke'
import { Helper } from '../../../utils/helper'
import { IState } from '../../interfaces/state.interface'
import { SvgUndefinedException } from '../../../utils/error-constants'
import { ShapeStyle } from '../theme/shape-style'

export class Grid {
  public gridSize: Decimal
  public useSnapping: boolean
  public style: ShapeStyle

  constructor() {
    const settings = FlobroConfig.GridSettings
    const fill = new Fill(settings.fillColor)
    const stroke = new Stroke(settings.strokeColor, settings.strokeWidth)

    this.gridSize = settings.size
    this.useSnapping = settings.useSnapping
    this.style = new ShapeStyle(fill, stroke)
  }

  public render(state: IState): void {
    const svgNamespace = FlobroConfig.SvgSettings.namespace
    const svg = state.workArea.svg
    const defs = document.createElementNS(svgNamespace, 'defs')
    const smallGrid = document.createElementNS(svgNamespace, 'pattern')
    const smallGridPath = document.createElementNS(svgNamespace, 'path')
    const grid = document.createElementNS(svgNamespace, 'pattern')
    const gridRect = document.createElementNS(svgNamespace, 'rect')
    const gridPath = document.createElementNS(svgNamespace, 'path')
    const gridContainer = document.createElementNS(svgNamespace, 'rect')
    const minGridSize = FlobroConfig.GridSettings.size / 10
    const viewportWidth = Helper.ToNearestHundredth(
      FlobroConfig.SvgSettings.width * 2
    )
    const viewportHeight = Helper.ToNearestHundredth(
      FlobroConfig.SvgSettings.height * 2
    )

    if (!svg) {
      throw SvgUndefinedException()
    }

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
