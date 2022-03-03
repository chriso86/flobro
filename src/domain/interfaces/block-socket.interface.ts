import { IBlock } from './block.interface'
import { ILinkOptions } from './link-options.interface'
import { ILink } from './link.interface'
import { ISocket } from './socket.interface'
import { Side, UUID } from '../../utils/custom-types'

export interface IBlockSocket<T> extends ISocket<T> {
  parent?: IBlock<unknown> | null
  links: Map<UUID, ILink<unknown>>
  side: Side

  /* Path from one Link to another Link */
  addLink<K>(options: ILinkOptions<K>): ILink<K>
  deleteLink(id: UUID): boolean

  updateParent(link: IBlock<unknown>): void
}
