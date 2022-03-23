import { Block } from '../domain/models/builder/block'
import { Vector2d, HTML, Key, UUID } from '../domain/interfaces/custom-types'

export class BlockFactory {
  private static _definitions: Map<
    Key,
    {
      id?: UUID
      title: string
      content: HTML
      position: Vector2d
      data?: unknown
    }
  > = new Map<
    Key,
    {
      id?: UUID
      title: string
      content: HTML
      position: Vector2d
      data?: unknown
    }
  >()

  protected constructor() {
    return
  }

  public static Create<T>(
    options: {
      id?: UUID
      title: string
      content: HTML
      position: Vector2d
      data?: T
    },
    saveAsDefinition = false
  ): Block<T> {
    if (this._definitions.has(options.title)) {
      return this.Spawn<T>(options.title, options.position)
    }

    if (saveAsDefinition) {
      this.RegisterDefinition(options.title, options)
    }

    return new Block<T>(options.title, options.content, options.position, {
      id: options.id,
      data: options.data,
    })
  }

  public static Spawn<T>(key: string, position: Vector2d): Block<T> {
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

    return this.Create<T>({
      id: config.id,
      title: config.title,
      content: config.content,
      position: position,
      data: config.data as T,
    })
  }

  public static RegisterDefinition<T>(
    key: string,
    definition: {
      id?: UUID
      title: string
      content: HTML
      position: Vector2d
      data?: T
    }
  ): void {
    if (!this._definitions.get(key)) {
      this._definitions.set(key, definition)
    }
  }
}
