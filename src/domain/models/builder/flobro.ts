import { IState } from '../../interfaces/state.interface'
import { BlockFactory } from '../../../factory/block.factory'
import { Block } from './block'
import { Vector2d, HTML, UUID } from '../../interfaces/custom-types'
import { FlobroConfig } from '../config/flobro.config'
import { ServiceContainer } from '../../services/service-container'
import { EventService } from '../../services/event.service'
import { StateService } from '../../services/state.service'
import { FlobroEvent } from '../../../enums/flobro-event.enum'
import { BehaviorSubject } from '../event/behavior-subject'

export class Flobro {
  private readonly _eventService: EventService
  private readonly _stateService: StateService

  constructor(container: HTMLElement, config?: Partial<FlobroConfig>) {
    if (config) {
      FlobroConfig.Configure(config)
    }

    const serviceContainer = ServiceContainer.getInstance()

    if (container.style.display === 'inline') {
      console.warn(
        'FloBro may not display correctly. An inline container element is not ideal.'
      )
    }

    this._eventService = serviceContainer.GetService(EventService)
    this._stateService = serviceContainer.GetService(StateService)

    this._stateService.onUpdate((state: IState) => (this._state = state))
    this._stateService.initialize(container)

    console.log('Flobro initialized!')
  }

  private _state!: IState

  public get state(): IState {
    return this._state
  }

  public render(): void {
    const state = this.state

    state.workArea.render()

    Array.from(state.blocks.values()).forEach((block: Block<unknown>) => {
      block.render()
    })
  }

  public addBlock<T>(options: {
    id?: UUID
    title: string
    content: HTML
    position: Vector2d
    data: T
  }): Block<T | null> {
    const block = BlockFactory.Create(options)

    this._stateService.addBlock(block)

    return block
  }

  public deleteBlock(id: UUID): void {
    this._stateService.deleteBlock(id)
  }

  public clear(): void {
    this._stateService.clear()
    this.render()
  }

  public on(event: FlobroEvent): BehaviorSubject<unknown> {
    return this._eventService.getEventBehaviorSubject(event)
  }
}
