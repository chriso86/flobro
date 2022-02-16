import { BlockSocket } from '../domain/block.socket'
import {
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
  DEFAULT_SOCKET_CAN_VIEW,
  DEFAULT_SOCKET_DATA,
  DEFAULT_SOCKET_STYLE,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { IBlockSocketOptions } from '../domain/interfaces/block-socket-options.interface'

export class BlockSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: IBlockSocketOptions<T>): BlockSocket<T> {
    return new BlockSocket<T>(
      options.id ?? Helper.GenerateUUID(),
      options.side,
      options.style ?? DEFAULT_SOCKET_STYLE,
      options.canDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      options.canEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      options.canView ?? DEFAULT_SOCKET_CAN_VIEW,
      options.data ?? DEFAULT_SOCKET_DATA
    )
  }
}