import { IGrid } from './grid.interface'
import { ITheme } from './theme.interface'
import { IBlock } from './block.interface'
import { UUID } from '../../utils/custom-types'
import { IBlockSocket } from './block-socket.interface'
import { ILinkSocket } from './link-socket.interface'
import { ILink } from './link.interface'
import { IState } from './state.interface'
import { ISvgConfig } from './svg-config.interface'
import { ISavedState } from './saved-state.interface'
import { ISubscription } from './subscription.interface'

export interface IStateService {
  state: IState

  initialize(
    container: HTMLElement,
    svg: SVGSVGElement,
    svgConfig?: ISvgConfig,
    grid?: IGrid,
    theme?: ITheme
  ): IState

  updateGrid(options: Partial<IGrid>): void
  updateTheme(options: Partial<ITheme>): void

  addBlock<T>(block: IBlock<T>): void
  deleteBlock(id: UUID): void

  addBlockSocket<T>(socket: IBlockSocket<T>): void
  deleteBlockSocket(id: UUID): void

  addLinkSocket<T>(socket: ILinkSocket<T>): void
  deleteLinkBlock(id: UUID): void

  addLink<T>(link: ILink<T>): void
  deleteLink(id: UUID): void

  save(): ISavedState
  load(state: ISavedState): void
  clear(): void

  onUpdate(callback: (state: IState) => void): ISubscription
}
