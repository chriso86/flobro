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
    return new LinkSocket<T>({
      id: options.id ?? Helper.GenerateUUID(),
      position: options.position,
      style: options.style ?? DEFAULT_SOCKET_STYLE,
      canDelete: options.canDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      canView: options.canView ?? DEFAULT_LINK_CAN_VIEW,
      data: options.data ?? DEFAULT_SOCKET_DATA,
    })
  }
}
