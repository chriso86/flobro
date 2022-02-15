import { ITheme } from './theme.interface'
import { IBlock } from './block.interface'
import { IBlockSocket } from './block-socket.interface'
import { IGrid } from './grid.interface'
import { ILinkSocket } from './link-socket.interface'
import { ILink } from './link.interface'
import { UUID } from './custom-types'

export interface IState {
  container?: HTMLElement
  grid: IGrid
  theme: ITheme
  blocks: Map<UUID, IBlock<unknown>>
  blockSockets: Map<UUID, IBlockSocket<unknown>>
  linkSockets: Map<UUID, ILinkSocket<unknown>>
  links: Map<UUID, ILink<unknown>>

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
}
