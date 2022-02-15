import { Link } from '../domain/link'
import {
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_LINK_DATA,
  DEFAULT_LINK_STYLE,
} from '../domain/default.constants'
import { Helper } from '../domain/helper'
import { ILinkOptions } from '../interfaces/link-options.interface'

export class LinkFactory {
  protected constructor() {
    return
  }

  public static Create<T>(options: ILinkOptions<T>): Link<T> {
    return new Link<T>(
      options.id ?? Helper.GenerateUUID(),
      options.startX,
      options.startY,
      options.startCurveX,
      options.startCurveY,
      options.endCurveX,
      options.endCurveY,
      options.endX,
      options.endY,
      options.style ?? DEFAULT_LINK_STYLE,
      options.canDelete ?? DEFAULT_LINK_CAN_DELETE,
      options.canEdit ?? DEFAULT_LINK_CAN_EDIT,
      options.canView ?? DEFAULT_LINK_CAN_VIEW,
      options.data ?? DEFAULT_LINK_DATA
    )
  }
}
