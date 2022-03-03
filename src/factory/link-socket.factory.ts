import { LinkSocket } from '../domain/models/link.socket'
import {
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { ILinkSocketOptions } from '../domain/interfaces/link-socket-options.interface'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../domain/models/fill'
import { Stroke } from '../domain/models/stroke'
import { CircleStyle } from '../domain/models/circle-style'

export class LinkSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: ILinkSocketOptions<T>): LinkSocket<T> {
    return new LinkSocket<T>({
      id: options.id ?? Helper.GenerateUUID(),
      position: options.position,
      style:
        options.style ??
        new CircleStyle(
          FlobroConfig.defaults.DefaultSocketRadius,
          new Fill(FlobroConfig.defaults.DefaultBlockFillColor),
          new Stroke(
            FlobroConfig.defaults.DefaultBlockStrokeColor,
            FlobroConfig.defaults.DefaultBlockStrokeWidth
          )
        ),
      canDelete: options.canDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      canView: options.canView ?? DEFAULT_LINK_CAN_VIEW,
      data: options.data ?? null,
    })
  }
}
