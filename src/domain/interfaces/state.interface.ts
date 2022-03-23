import { UUID } from './custom-types'
import { BlockSocket } from '../models/builder/block.socket'
import { Link } from '../models/builder/link'
import { LinkSocket } from '../models/builder/link.socket'
import { Block } from '../models/builder/block'
import { WorkArea } from '../models/builder/work-area'

export interface IState {
  id: UUID
  workArea: WorkArea
  blocks: Map<UUID, Block<unknown>>
  blockSockets: Map<UUID, BlockSocket<unknown>>
  linkSockets: Map<UUID, LinkSocket<unknown>>
  links: Map<UUID, Link<unknown>>
}
