import { ITheme } from './theme.interface'
import { IGrid } from './grid.interface'
import { ISavedBlock } from './saved-block.interface'
import { ISavedBlockSocket } from './saved-block-socket.interface'
import { ISavedLinkSocket } from './saved-link-socket.interface'
import { ISavedLink } from './saved-link.interface'

export interface ISavedState {
  grid: IGrid
  theme: ITheme
  blocks: ISavedBlock[]
  blockSockets: ISavedBlockSocket[]
  linkSockets: ISavedLinkSocket[]
  links: ISavedLink[]
}
