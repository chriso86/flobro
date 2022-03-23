import { Grid } from './grid'
import { FlobroConfig } from '../config/flobro.config'
import svgPanZoom from 'svg-pan-zoom'
import { Helper } from '../../../utils/helper'
import Instance = SvgPanZoom.Instance

export class WorkArea {
  public svg?: SVGSVGElement
  private _svgPanZoom?: Instance

  constructor(public container: HTMLElement, public grid?: Grid) {}

  public get svgPanZoom(): Instance | undefined {
    return this._svgPanZoom
  }

  public render(): void {
    // Remove any existing SVG elements
    this.clear()

    const svg = WorkArea.BuildSvg(this.container)

    this.svg = this.container.appendChild(svg)
    this._svgPanZoom = svgPanZoom(
      this.svg,
      FlobroConfig.SvgSettings.zoomPanConfig
    )
  }

  private static BuildSvg(container: HTMLElement): SVGSVGElement {
    const svgNamespace = FlobroConfig.SvgSettings.namespace
    const svg = document.createElementNS(svgNamespace, 'svg') as SVGSVGElement
    const viewportWidth = Helper.ToNearestHundredth(
      FlobroConfig.SvgSettings.width * 2
    )
    const viewportHeight = Helper.ToNearestHundredth(
      FlobroConfig.SvgSettings.height * 2
    )

    if (!container) {
      throw new Error(
        'No container element has been set for Flobro. Please set a valid HTML element when constructing Flobro'
      )
    }

    const svgIdSelector = FlobroConfig.SvgSettings.idSelector

    svg.setAttribute('id', svgIdSelector)
    svg.setAttribute('class', FlobroConfig.SvgSettings.class)
    svg.setAttribute('width', `${viewportWidth}`)
    svg.setAttribute('height', `${viewportHeight}`)

    return svg
  }

  private clear(): void {
    const existingSvgElements = this.container.querySelectorAll(
      `.${FlobroConfig.SvgSettings.class}`
    )

    existingSvgElements.forEach((element: Element) => {
      element.remove()
    })
  }
}
