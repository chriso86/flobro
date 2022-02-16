import { DEFAULT_GRID_SIZE } from '../utils/default.constants'
import { Grid } from './grid'
import { Theme } from './theme'
import { IState } from './interfaces/state.interface'
import { ITheme } from './interfaces/theme.interface'
import { IBlock } from './interfaces/block.interface'
import { IBlockSocket } from './interfaces/block-socket.interface'
import { IGrid } from './interfaces/grid.interface'
import { ILinkSocket } from './interfaces/link-socket.interface'
import { ILink } from './interfaces/link.interface'
import { UUID } from './interfaces/custom-types'

export class State implements IState {
  constructor(
    public container?: HTMLElement,
    public grid: IGrid = new Grid(DEFAULT_GRID_SIZE, true),
    public theme: ITheme = new Theme(),
    public blocks: Map<UUID, IBlock<unknown>> = new Map<
      UUID,
      IBlock<unknown>
    >(),
    public blockSockets: Map<UUID, IBlockSocket<unknown>> = new Map<
      UUID,
      IBlockSocket<unknown>
    >(),
    public linkSockets: Map<UUID, ILinkSocket<unknown>> = new Map<
      UUID,
      ILinkSocket<unknown>
    >(),
    public links: Map<UUID, ILink<unknown>> = new Map<UUID, ILink<unknown>>()
  ) {}

  public updateGrid(options: Partial<IGrid>): void {
    this.grid = Object.assign(options)
  }

  public updateTheme(options: Partial<ITheme>): void {
    this.theme = Object.assign(options)
  }

  public addBlock<T>(block: IBlock<T>): void {
    if (!block.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.blocks.set(block.id, block)
  }

  public addBlockSocket<T>(socket: IBlockSocket<T>): void {
    if (!socket.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.blockSockets.set(socket.id, socket)
  }

  public addLinkSocket<T>(socket: ILinkSocket<T>): void {
    if (!socket.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.linkSockets.set(socket.id, socket)
  }

  public addLink<T>(link: ILink<T>): void {
    if (!link.id) {
      throw new Error(
        `No ID found on block object. Please use the factory to create a block first`
      )
    }

    this.links.set(link.id, link)
  }

  public deleteBlock(id: UUID): void {
    if (this.blocks.has(id)) {
      this.blocks.delete(id)
    }
  }

  public deleteBlockSocket(id: UUID): void {
    if (this.blocks.has(id)) {
      this.blockSockets.delete(id)
    }
  }

  public deleteLinkBlock(id: UUID): void {
    if (this.blocks.has(id)) {
      this.linkSockets.delete(id)
    }
  }

  public deleteLink(id: UUID): void {
    if (this.blocks.has(id)) {
      this.links.delete(id)
    }
  }
}
