import { IFlobro } from '../interfaces/flobro.interface'
import { IBlockOptions } from '../interfaces/block-options.interface'
import { IState } from '../interfaces/state.interface'
import { ISavedState } from '../interfaces/saved-state.interface'
import { Helper } from '../../utils/helper'
import { BlockFactory } from '../../factory/block.factory'
import { Block } from './block'
import { UUID } from '../../utils/custom-types'
import { FlobroConfig } from '../../config/flobro.config'
import { IStateService } from '../interfaces/state.service.interface'
import { IEventService } from '../interfaces/event.service.interface'
import { ServiceContainer } from '../services/service-container'
import { EventService } from '../services/event.service'
import { StateService } from '../services/state.service'
import { FlobroEvent } from '../../enums/flobro-event.enum'
import { IBehaviorSubject } from '../interfaces/behavior-subject.interface'

export class Flobro implements IFlobro {
  private readonly _eventService: IEventService
  private readonly _stateService: IStateService

  constructor(container: HTMLElement, config?: Partial<FlobroConfig>) {
    FlobroConfig.Configure(config ?? {})

    const serviceContainer = ServiceContainer.getInstance()
    const svg = this.render(container)

    if (container.style.display === 'inline') {
      console.warn(
        'FloBro may not display correctly. An inline container element is not ideal.'
      )
    }

    this._eventService = serviceContainer.GetService(EventService)
    this._stateService = serviceContainer.GetService(StateService)

    this._stateService.onUpdate((state: IState) => (this._state = state))
    this._stateService.initialize(container, svg, FlobroConfig.svgConfig)
  }

  private _state!: IState

  public get state(): IState {
    return this._state
  }

  public render(container: HTMLElement): SVGSVGElement {
    const existingSVGElements = container.querySelectorAll(
      `.${FlobroConfig.defaults.DefaultSvgClass}`
    )

    // Remove any existing SVG elements
    existingSVGElements.forEach((element: Element) => {
      element.remove()
    })

    const svgNamespace = FlobroConfig.defaults.DefaultSvgNamespace
    const svg = document.createElementNS(svgNamespace, 'svg') as SVGSVGElement
    const viewportWidth = Helper.ToNearestHundredth(
      FlobroConfig.defaults.DefaultSvgWidth * 2
    )
    const viewportHeight = Helper.ToNearestHundredth(
      FlobroConfig.defaults.DefaultSvgHeight * 2
    )

    if (!container) {
      throw new Error(
        'No container element has been set for Flobro. Please set a valid HTML element when constructing Flobro'
      )
    }

    svg.setAttribute('id', FlobroConfig.defaults.DefaultSvgIdSelector)
    svg.setAttribute('class', FlobroConfig.defaults.DefaultSvgClass)
    svg.setAttribute('width', `${viewportWidth}`)
    svg.setAttribute('height', `${viewportHeight}`)

    container.appendChild(svg)

    return svg
  }

  public addBlock<T>(options: IBlockOptions<T>): Block<T> {
    const block = BlockFactory.Create(options)

    this._stateService.addBlock(block)

    return block
  }

  public deleteBlock(id: UUID): void {
    this._stateService.deleteBlock(id)
  }

  public clear(): void {
    // TODO: Implement
  }

  public save(): ISavedState {
    return this._stateService.save()
  }

  public load(state: ISavedState): void {
    this._stateService.load(state)
  }

  public on(event: FlobroEvent): IBehaviorSubject<unknown> {
    return this._eventService.getEventBehaviorSubject(event)
  }
}
