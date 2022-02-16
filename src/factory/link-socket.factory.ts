import { LinkSocket } from '../domain/link.socket'
import {
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
  DEFAULT_SOCKET_DATA,
  DEFAULT_SOCKET_STYLE,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { ILinkSocketOptions } from '../domain/interfaces/link-socket-options.interface'

export class LinkSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: ILinkSocketOptions<T>): LinkSocket<T> {
    return new LinkSocket<T>(
      options.id ?? Helper.GenerateUUID(),
      options.position,
      options.style ?? DEFAULT_SOCKET_STYLE,
      options.canDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      options.canEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      options.canView ?? DEFAULT_LINK_CAN_VIEW,
      options.data ?? DEFAULT_SOCKET_DATA
    )
  }
}
