import { IState } from '../interfaces/state.interface'
import { UUID } from '../interfaces/custom-types'
import { BehaviorSubject } from '../models/event/behavior-subject'
import { WorkArea } from '../models/builder/work-area'
import { Helper } from '../../utils/helper'
import { Grid } from '../models/builder/grid'
import { Link } from '../models/builder/link'
import { LinkSocket } from '../models/builder/link.socket'
import { BlockSocket } from '../models/builder/block.socket'
import { Block } from '../models/builder/block'
import { Subscription } from '../models/event/subscription'

export class StateService {
  private _DEFAULT_STATE = {
    id: Helper.GenerateUUID(),
    workArea: new WorkArea({} as HTMLElement, {} as Grid),
    blocks: new Map<UUID, Block<unknown>>(),
    blockSockets: new Map<UUID, BlockSocket<unknown>>(),
    linkSockets: new Map<UUID, LinkSocket<unknown>>(),
    links: new Map<UUID, Link<unknown>>(),
  }
  private _state: BehaviorSubject<IState> = new BehaviorSubject<IState>(
    this._DEFAULT_STATE
  )

  public get state(): IState {
    return this._state.getValue()
  }

  public initialize(container: HTMLElement): IState {
    const workArea = new WorkArea(container)

    return this.updateState({
      workArea,
    })
  }

  public addBlock<T>(block: Block<T>): void {
    if (!block.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.state.blocks.set(block.id, block)

    this.updateState({
      blocks: this.state.blocks,
    })
  }

  public addBlockSocket<T>(socket: BlockSocket<T>): void {
    if (!socket.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.state.blockSockets.set(socket.id, socket)

    this.updateState({
      blockSockets: this.state.blockSockets,
    })
  }

  public addLinkSocket<T>(socket: LinkSocket<T>): void {
    if (!socket.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.state.linkSockets.set(socket.id, socket)

    this.updateState({
      linkSockets: this.state.linkSockets,
    })
  }

  public addLink<T>(link: Link<T>): void {
    if (!link.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.state.links.set(link.id, link)

    this.updateState({
      links: this.state.links,
    })
  }

  public deleteBlock(id: UUID): void {
    if (this.state.blocks.has(id)) {
      this.state.blocks.delete(id)

      this.updateState({
        blocks: this.state.blocks,
      })
    }
  }

  public deleteBlockSocket(id: UUID): void {
    if (this.state.blocks.has(id)) {
      this.state.blockSockets.delete(id)

      this.updateState({
        blockSockets: this.state.blockSockets,
      })
    }
  }

  public deleteLinkBlock(id: UUID): void {
    if (this.state.blocks.has(id)) {
      this.state.linkSockets.delete(id)

      this.updateState({
        linkSockets: this.state.linkSockets,
      })
    }
  }

  public deleteLink(id: UUID): void {
    if (this.state.blocks.has(id)) {
      this.state.links.delete(id)

      this.updateState({
        blocks: this.state.blocks,
      })
    }
  }

  public clear(): void {
    this._state.next(this._DEFAULT_STATE)
  }

  public onUpdate(callback: (state: IState) => void): Subscription<IState> {
    return this._state.subscribe(callback)
  }

  private updateState(state: Partial<IState> | null): IState {
    this._state.next({
      ...this.state,
      ...state,
    } as IState)

    return this.state
  }
}
