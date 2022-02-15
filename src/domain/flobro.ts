import { IFloBro } from '../interfaces/flobro.interface'
import { ITheme } from '../interfaces/theme.interface'
import { IBlock } from '../interfaces/block.interface'
import { IGrid } from '../interfaces/grid.interface'
import { ILinkSocket } from '../interfaces/link-socket.interface'
import { IBlockOptions } from '../interfaces/block-options.interface'
import { ILinkOptions } from '../interfaces/link-options.interface'
import { ILinkSocketOptions } from '../interfaces/link-socket-options.interface'
import { ILink } from '../interfaces/link.interface'
import { IState } from '../interfaces/state.interface'
import { ISavedState } from '../interfaces/saved-state.interface'
import { IBlockSocketOptions } from '../interfaces/block-socket-options.interface'
import { IBlockSocket } from '../interfaces/block-socket.interface'
import { Helper } from './helper'
import { BlockFactory } from '../service/block.factory'
import { DEFAULT_MAP } from './default.constants'
import { State } from './state'
import { Block } from './block'
import { UUID } from '../interfaces/custom-types'

export class FloBro implements IFloBro {
  private _state: IState

  public get state(): IState {
    return this._state
  }

  constructor(container: HTMLElement, grid?: IGrid, theme?: ITheme) {
    if (container.style.display === 'inline') {
      console.warn(
        'FloBro may not display correctly. An inline container element is not ideal.'
      )
    }

    this._state = new State(container, grid, theme)

    console.log('FloBro Initialized!')
  }

  public render(): void {
    throw new Error('Not implemented')
  }

  public changeTheme(theme: Partial<ITheme>): void {
    this.state.updateTheme(theme)
  }

  public addBlock<T>(options: IBlockOptions<T>): Block<T> {
    const block = BlockFactory.Create(options)

    this.state.addBlock(block)

    return block
  }

  public deleteBlock(id: UUID): void {
    this.state.deleteBlock(id)
  }

  public clear(): void {
    this._state = new State(
      this.state.container,
      this.state.grid,
      this.state.theme
    )

    this.render()
  }

  public save(): ISavedState {
    const blocks = Array.from(this.state.blocks.values()).map(
      (block: IBlock<unknown>) => FloBro.mapBlock(block)
    )
    const blockSockets = Array.from(this.state.blockSockets.values()).map(
      (blockSocket: IBlockSocket<unknown>) => FloBro.mapBlockSocket(blockSocket)
    )
    const linkSockets = Array.from(this.state.linkSockets.values()).map(
      (linkSocket: ILinkSocket<unknown>) => FloBro.mapLinkSocket(linkSocket)
    )
    const links = Array.from(this.state.links.values()).map(
      (link: ILink<unknown>) => FloBro.mapLink(link)
    )

    return {
      grid: this.state.grid,
      theme: this.state.theme,
      blocks,
      blockSockets,
      linkSockets,
      links,
    }
  }

  public load(state: ISavedState): void {
    const blocks = state.blocks.reduce(
      Helper.ReduceBlockToMap,
      DEFAULT_MAP<IBlock<unknown>>()
    )
    const blockSockets = state.blockSockets.reduce(
      Helper.ReduceBlockSocketToMap,
      DEFAULT_MAP<IBlockSocket<unknown>>()
    )
    const linkSockets = state.linkSockets.reduce(
      Helper.ReduceLinkSocketToMap,
      DEFAULT_MAP<ILinkSocket<unknown>>()
    )
    const links = state.links.reduce(
      Helper.ReduceLinkToMap,
      DEFAULT_MAP<ILink<unknown>>()
    )

    const blockOptions = state.blocks.reduce(
      Helper.ReduceBlockOptionsToMap,
      DEFAULT_MAP<IBlockOptions<unknown>>()
    )
    const blockSocketOptions = state.blockSockets.reduce(
      Helper.ReduceBlockSocketOptionsToMap,
      DEFAULT_MAP<IBlockSocketOptions<unknown>>()
    )
    const linkOptions = state.links.reduce(
      Helper.ReduceLinkOptionsToMap,
      DEFAULT_MAP<ILinkOptions<unknown>>()
    )

    const constructedBlocksState: Map<UUID, IBlock<unknown>> = new Map<
      UUID,
      IBlock<unknown>
    >()

    blocks.forEach((block: IBlock<unknown>) => {
      const bo = blockOptions.get(block.id)!

      if (bo.inSocketIds?.length) {
        block.inSockets = bo.inSocketIds.reduce(
          (inSocketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: UUID) => {
            const blockSocket = blockSockets.get(socketId)!
            const bso = blockSocketOptions.get(socketId)!

            blockSocket.updateParent(block)
            this.state.addBlockSocket(blockSocket)

            if (bso.linkIds?.length) {
              blockSocket.links = bso.linkIds?.reduce(
                (linksMap: Map<UUID, ILink<unknown>>, linkId: UUID) => {
                  const link = links.get(linkId)!
                  const lo = linkOptions.get(linkId)!

                  link.updateTarget(blockSocket)
                  link.updateOrigin(blockSockets.get(lo.originId!)!)
                  this.state.addLink(link)

                  if (lo.linkSocketIds?.length) {
                    link.linkSockets = lo.linkSocketIds.reduce(
                      (
                        linkSocketsMap: Map<UUID, ILinkSocket<unknown>>,
                        linkSocketId: UUID
                      ) => {
                        const linkSocket = linkSockets.get(linkSocketId)!

                        linkSocket.updateParent(link)
                        this.state.addLinkSocket(linkSocket)

                        return linkSocketsMap.set(linkSocketId, linkSocket)
                      },
                      DEFAULT_MAP<ILinkSocket<unknown>>()
                    )
                  }

                  return linksMap.set(linkId, link)
                },
                DEFAULT_MAP<ILink<unknown>>()
              )
            }

            return inSocketsMap.set(socketId, blockSocket)
          },
          DEFAULT_MAP<IBlockSocket<unknown>>()
        )
      }

      if (bo.outSocketIds?.length) {
        block.inSockets = bo.outSocketIds.reduce(
          (inSocketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: UUID) => {
            const blockSocket = blockSockets.get(socketId)!
            const bso = blockSocketOptions.get(socketId)!

            blockSocket.updateParent(block)
            this.state.addBlockSocket(blockSocket)

            if (bso.linkIds?.length) {
              blockSocket.links = bso.linkIds?.reduce(
                (linksMap: Map<UUID, ILink<unknown>>, linkId: UUID) => {
                  const link = links.get(linkId)!
                  const lo = linkOptions.get(linkId)!

                  link.updateTarget(blockSocket)
                  link.updateOrigin(blockSockets.get(lo.originId!)!)
                  this.state.addLink(link)

                  if (lo.linkSocketIds?.length) {
                    link.linkSockets = lo.linkSocketIds.reduce(
                      (
                        linkSocketsMap: Map<UUID, ILinkSocket<unknown>>,
                        linkSocketId: UUID
                      ) => {
                        const linkSocket = linkSockets.get(linkSocketId)!

                        linkSocket.updateParent(link)
                        this.state.addLinkSocket(linkSocket)

                        return linkSocketsMap.set(linkSocketId, linkSocket)
                      },
                      DEFAULT_MAP<ILinkSocket<unknown>>()
                    )
                  }

                  return linksMap.set(linkId, link)
                },
                DEFAULT_MAP<ILink<unknown>>()
              )
            }

            return inSocketsMap.set(socketId, blockSocket)
          },
          DEFAULT_MAP<IBlockSocket<unknown>>()
        )
      }

      this.state.addBlock(block)
      constructedBlocksState.set(block.id, block)
    })
  }

  private static mapBlock<T>(block: IBlock<T>): IBlockOptions<T> {
    const inSockets = Array.from(block.inSockets.values())
    const outSockets = Array.from(block.outSockets.values())

    return {
      title: block.title,
      content: block.content,
      position: block.position,
      style: block.style,
      inSocketIds: inSockets.map((s) => s.id),
      outSocketIds: outSockets.map((s) => s.id),
      canDelete: block.canDelete,
      canEdit: block.canEdit,
      canView: block.canView,
      data: block.data,
    }
  }

  private static mapBlockSocket<T>(
    socket: IBlockSocket<T>
  ): IBlockSocketOptions<T> {
    const links = Array.from(socket.links.values())

    if (!socket.parent) {
      throw new Error(
        `The parent is missing on the block socket with ID "${socket.id}"`
      )
    }

    return {
      side: socket.side,
      parentId: socket.parent.id,
      style: socket.style,
      canDelete: socket.canDelete,
      canEdit: socket.canEdit,
      canView: socket.canView,
      data: socket.data,
      linkIds: links.map((l) => l.id),
    }
  }

  private static mapLinkSocket<T>(
    socket: ILinkSocket<T>
  ): ILinkSocketOptions<T> {
    if (!socket.parent) {
      throw new Error(
        `The parent is missing on the link socket with ID "${socket.id}"`
      )
    }

    return {
      position: socket.position,
      parentId: socket.parent.id,
      style: socket.style,
      canDelete: socket.canDelete,
      canEdit: socket.canEdit,
      canView: socket.canView,
      data: socket.data,
    }
  }

  private static mapLink<T>(link: ILink<T>): ILinkOptions<T> {
    const linkSockets = Array.from(link.linkSockets.values())

    if (!link.origin) {
      throw new Error(`The origin is missing on the link with ID "${link.id}"`)
    }

    if (!link.target) {
      throw new Error(`The target is missing on the link with ID "${link.id}"`)
    }

    return {
      startX: link.startX,
      startY: link.startY,
      startCurveX: link.startCurveX,
      startCurveY: link.startCurveY,
      endCurveX: link.endCurveX,
      endCurveY: link.endCurveY,
      endX: link.endX,
      endY: link.endY,
      originId: link.origin.id,
      targetId: link.target.id,
      style: link.style,
      data: link.data,
      canDelete: link.canDelete,
      canEdit: link.canEdit,
      canView: link.canView,
      linkSocketIds: linkSockets.map((ls) => ls.id),
    }
  }
}
