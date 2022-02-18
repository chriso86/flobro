import {
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_VIEW,
  DEFAULT_SOCKET_DATA,
  DEFAULT_SOCKET_STYLE,
} from '../utils/default.constants'
import { ICircleStyle } from './interfaces/circle-style.interface'
import { ISocket } from './interfaces/socket.interface'
import { UUID } from './interfaces/custom-types'
import { ISocketOptions } from './interfaces/socket-options.interface'

export class Socket<T> implements ISocket<T> {
  public id?: UUID
  public style: ICircleStyle = DEFAULT_SOCKET_STYLE
  public canDelete: boolean = DEFAULT_SOCKET_CAN_DELETE
  public canEdit: boolean = DEFAULT_LINK_CAN_EDIT
  public canView: boolean = DEFAULT_SOCKET_CAN_VIEW
  public data: T | null = DEFAULT_SOCKET_DATA

  constructor(options: ISocketOptions<T>) {
    this.id = options.id
    this.style = options.style ?? this.style
    this.canDelete = options.canDelete ?? this.canDelete
    this.canEdit = options.canEdit ?? this.canEdit
    this.canView = options.canView ?? this.canView
    this.data = options.data ?? this.data
  }

  public render(): void {
    throw new Error(
      'This should not ever happen. The Socket render method is abstracted'
    )
  }

  public updateId(id: string): void {
    this.id = id
  }

  public updateData(data: T): void {
    this.data = data
  }

  public updateStyle(style: ICircleStyle): void {
    this.style = style
  }

  public updateDeletePermission(canDelete: boolean): void {
    this.canDelete = canDelete
  }

  public updateEditPermission(canEdit: boolean): void {
    this.canEdit = canEdit
  }

  public updateViewPermission(canView: boolean): void {
    this.canView = canView
  }

  public delete(): void {
    throw new Error(
      'This should not ever happen. The Socket delete method is abstracted'
    )
  }
}
