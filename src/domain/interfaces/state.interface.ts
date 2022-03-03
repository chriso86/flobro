import { ITheme } from './theme.interface'
import { IBlock } from './block.interface'
import { IBlockSocket } from './block-socket.interface'
import { ILinkSocket } from './link-socket.interface'
import { ILink } from './link.interface'
import { UUID } from '../../utils/custom-types'
import { IWorkArea } from './work-area.interface'

export interface IState {
  id: UUID
  workArea: IWorkArea
  theme: ITheme
  blocks: Map<UUID, IBlock<unknown>>
  blockSockets: Map<UUID, IBlockSocket<unknown>>
  linkSockets: Map<UUID, ILinkSocket<unknown>>
  links: Map<UUID, ILink<unknown>>
}
