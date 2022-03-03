import { ITheme } from './theme.interface'
import { ISavedBlock } from './saved-block.interface'
import { ISavedBlockSocket } from './saved-block-socket.interface'
import { ISavedLinkSocket } from './saved-link-socket.interface'
import { ISavedLink } from './saved-link.interface'
import { IWorkArea } from './work-area.interface'

export interface ISavedState {
  workArea: IWorkArea
  theme: ITheme
  blocks: ISavedBlock[]
  blockSockets: ISavedBlockSocket[]
  linkSockets: ISavedLinkSocket[]
  links: ISavedLink[]
}
