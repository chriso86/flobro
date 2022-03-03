import { Link } from '../domain/models/link'
import {
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { ILinkOptions } from '../domain/interfaces/link-options.interface'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../domain/models/fill'
import { Stroke } from '../domain/models/stroke'
import { Style } from '../domain/models/style'

export class LinkFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: ILinkOptions<T>): Link<T> {
    return new Link<T>({
      id: options.id ?? Helper.GenerateUUID(),
      startX: options.startX,
      startY: options.startY,
      startCurveX: options.startCurveX,
      startCurveY: options.startCurveY,
      endCurveX: options.endCurveX,
      endCurveY: options.endCurveY,
      endX: options.endX,
      endY: options.endY,
      style:
        options.style ??
        new Style(
          new Fill(FlobroConfig.defaults.DefaultBlockFillColor),
          new Stroke(
            FlobroConfig.defaults.DefaultBlockStrokeColor,
            FlobroConfig.defaults.DefaultBlockStrokeWidth
          )
        ),
      canDelete: options.canDelete ?? DEFAULT_LINK_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_LINK_CAN_EDIT,
      canView: options.canView ?? DEFAULT_LINK_CAN_VIEW,
      data: options.data ?? null,
    })
  }
}
