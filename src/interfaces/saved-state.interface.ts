import { ITheme } from './theme.interface'
import { IBlockSocketOptions } from './block-socket-options.interface'
import { IGrid } from './grid.interface'
import { IBlockOptions } from './block-options.interface'
import { ILinkSocketOptions } from './link-socket-options.interface'
import { ILinkOptions } from './link-options.interface'

export interface ISavedState {
  grid: IGrid
  theme: ITheme
  blocks: IBlockOptions<unknown>[]
  blockSockets: IBlockSocketOptions<unknown>[]
  linkSockets: ILinkSocketOptions<unknown>[]
  links: ILinkOptions<unknown>[]
}
