import { BlockSocket } from '../domain/models/block.socket'
import {
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
  DEFAULT_SOCKET_CAN_VIEW,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { IBlockSocketOptions } from '../domain/interfaces/block-socket-options.interface'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../domain/models/fill'
import { Stroke } from '../domain/models/stroke'
import { CircleStyle } from '../domain/models/circle-style'

export class BlockSocketFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: IBlockSocketOptions<T>): BlockSocket<T> {
    return new BlockSocket<T>({
      id: options.id ?? Helper.GenerateUUID(),
      side: options.side,
      style:
        options.style ??
        new CircleStyle(
          FlobroConfig.defaults.DefaultSocketRadius,
          new Fill(FlobroConfig.defaults.DefaultSocketFillColor),
          new Stroke(
            FlobroConfig.defaults.DefaultSocketStrokeColor,
            FlobroConfig.defaults.DefaultSocketStrokeWidth
          )
        ),
      canDelete: options.canDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      canView: options.canView ?? DEFAULT_SOCKET_CAN_VIEW,
      data: options.data,
    })
  }
}
