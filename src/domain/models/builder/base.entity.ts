import { UUID } from '../../interfaces/custom-types'
import { Helper } from '../../../utils/helper'

export abstract class BaseEntity<T> {
  private _id: UUID
  private _canDelete: boolean
  private _canEdit: boolean
  private _canView: boolean
  private _data?: T

  public get id(): UUID {
    return this._id
  }
  public get canDelete(): boolean {
    return this._canDelete
  }
  public get canEdit(): boolean {
    return this._canEdit
  }
  public get canView(): boolean {
    return this._canView
  }
  public get data(): T | null {
    return this._data ?? null
  }

  protected constructor(options: {
    id?: UUID
    canDelete: boolean
    canEdit: boolean
    canView: boolean
    data?: T
  }) {
    this._id = options.id ?? Helper.GenerateUUID()
    this._canDelete = options.canDelete
    this._canEdit = options.canEdit
    this._canView = options.canView
    this._data = options.data
  }

  public updateId(id: string): void {
    this._id = id
  }

  public updateData(data: T): void {
    this._data = data
  }

  public updateDeletePermission(canDelete: boolean): void {
    this._canDelete = canDelete
  }

  public updateEditPermission(canEdit: boolean): void {
    this._canEdit = canEdit
  }

  public updateViewPermission(canView: boolean): void {
    this._canView = canView
  }

  public abstract render(): void

  public abstract delete(): void
}
