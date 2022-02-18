import { Link } from '../domain/link'
import {
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_LINK_DATA,
  DEFAULT_LINK_STYLE,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { ILinkOptions } from '../domain/interfaces/link-options.interface'

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
      style: options.style ?? DEFAULT_LINK_STYLE,
      canDelete: options.canDelete ?? DEFAULT_LINK_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_LINK_CAN_EDIT,
      canView: options.canView ?? DEFAULT_LINK_CAN_VIEW,
      data: options.data ?? DEFAULT_LINK_DATA,
    })
  }
}
