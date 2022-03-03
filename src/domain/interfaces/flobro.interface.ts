import { IState } from './state.interface'
import { IBlock } from './block.interface'
import { IBlockOptions } from './block-options.interface'
import { UUID } from '../../utils/custom-types'
import { ISavedState } from './saved-state.interface'
import { FlobroEvent } from '../../enums/flobro-event.enum'
import { IBehaviorSubject } from './behavior-subject.interface'

export interface IFlobro {
  state: IState

  render(container: HTMLElement): SVGSVGElement

  save(): ISavedState
  load(state: ISavedState): void
  clear(): void

  addBlock<T>(options: IBlockOptions<T>): IBlock<T>
  deleteBlock(id: UUID): void

  on(event: FlobroEvent): IBehaviorSubject<unknown>
}
