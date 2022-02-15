import { IState } from './state.interface'
import { ITheme } from './theme.interface'
import { IBlock } from './block.interface'
import { IBlockOptions } from './block-options.interface'
import { UUID } from './custom-types'

export interface IFloBro {
  state: IState

  render(): void
  changeTheme(theme: Partial<ITheme>): void

  //save(): ISavedState;
  //load(state: ISavedState): void;
  clear(): void

  addBlock<T>(options: IBlockOptions<T>): IBlock<T>
  deleteBlock(id: UUID): void
}
