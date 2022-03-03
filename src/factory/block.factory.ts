import { Block } from '../domain/models/block'
import {
  DEFAULT_BLOCK_CAN_DELETE,
  DEFAULT_BLOCK_CAN_EDIT,
  DEFAULT_BLOCK_CAN_VIEW,
} from '../utils/default.constants'
import { Helper } from '../utils/helper'
import { IBlockOptions } from '../domain/interfaces/block-options.interface'
import { Key } from '../utils/custom-types'
import { BlockStyle } from '../domain/models/block-style'
import { FlobroConfig } from '../config/flobro.config'
import { Fill } from '../domain/models/fill'
import { Stroke } from '../domain/models/stroke'

export class BlockFactory {
  private static _definitions: Map<Key, IBlockOptions<unknown>> = new Map<
    Key,
    IBlockOptions<unknown>
  >()

  protected constructor() {
    return
  }

  public static Create<T>(
    options: IBlockOptions<T>,
    saveAsDefinition = false
  ): Block<T> {
    if (this._definitions.get(options.title)) {
      return this.Spawn<T>(options.title)
    }

    if (saveAsDefinition) {
      this.RegisterDefinition(options.title, options)
    }

    return new Block<T>({
      id: options.id ?? Helper.GenerateUUID(),
      title: options.title,
      content: options.content,
      position: options.position,
      style:
        options.style ??
        new BlockStyle(
          FlobroConfig.defaults.DefaultBlockWidth,
          FlobroConfig.defaults.DefaultBlockHeight,
          new Fill(FlobroConfig.defaults.DefaultBlockFillColor),
          new Stroke(
            FlobroConfig.defaults.DefaultBlockStrokeColor,
            FlobroConfig.defaults.DefaultBlockStrokeWidth
          )
        ),
      canDelete: options.canDelete ?? DEFAULT_BLOCK_CAN_DELETE,
      canEdit: options.canEdit ?? DEFAULT_BLOCK_CAN_EDIT,
      canView: options.canView ?? DEFAULT_BLOCK_CAN_VIEW,
      data: options.data,
    })
  }

  public static Spawn<T>(key: string): Block<T> {
    if (!this._definitions.has(key)) {
      throw new Error(
        `Could not spawn a node for the node definition with key "${key}". Please make sure you've registered the definition using the RegisterDefinition method on this Factory`
      )
    }

    const config = this._definitions.get(key)

    if (!config) {
      throw new Error(
        `An invalid node configuration was found for definition with key "${key}"`
      )
    }

    return this.Create<T>(config as IBlockOptions<T>)
  }

  public static RegisterDefinition<T>(
    key: string,
    definition: IBlockOptions<T>
  ): void {
    if (!this._definitions.get(key)) {
      this._definitions.set(key, definition)
    }
  }
}
