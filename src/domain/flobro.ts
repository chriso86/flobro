import { IFloBro } from './interfaces/flobro.interface'
import { ITheme } from './interfaces/theme.interface'
import { IBlock } from './interfaces/block.interface'
import { IGrid } from './interfaces/grid.interface'
import { ILinkSocket } from './interfaces/link-socket.interface'
import { IBlockOptions } from './interfaces/block-options.interface'
import { ILink } from './interfaces/link.interface'
import { IState } from './interfaces/state.interface'
import { ISavedState } from './interfaces/saved-state.interface'
import { IBlockSocket } from './interfaces/block-socket.interface'
import { Helper } from '../utils/helper'
import { BlockFactory } from '../factory/block.factory'
import {
  DEFAULT_MAP,
  DEFAULT_SVG_CLASS,
  DEFAULT_SVG_HEIGHT_MULTIPLIER,
  DEFAULT_SVG_WIDTH_MULTIPLIER,
} from '../utils/default.constants'
import { State } from './state'
import { Block } from './block'
import { UUID } from './interfaces/custom-types'
import { ISavedBlock } from './interfaces/saved-block.interface'
import { ISavedBlockSocket } from './interfaces/saved-block-socket.interface'
import { ISavedLink } from './interfaces/saved-link.interface'
import { ISavedLinkSocket } from './interfaces/saved-link-socket.interface'

export class FloBro implements IFloBro {
  constructor(container: HTMLElement, grid?: IGrid, theme?: ITheme) {
    if (container.style.display === 'inline') {
      console.warn(
        'FloBro may not display correctly. An inline container element is not ideal.'
      )
    }

    this._state = new State(container, grid, theme)

    console.log('FloBro Initialized!')
  }

  private _state: IState

  public get state(): IState {
    return this._state
  }

  private static mapBlock<T>(block: IBlock<T>): ISavedBlock {
    const inSockets = Array.from(block.inSockets.values())
    const outSockets = Array.from(block.outSockets.values())

    return <ISavedBlock>{
      id: block.id,
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

  private static mapBlockSocket<T>(socket: IBlockSocket<T>): ISavedBlockSocket {
    const links = Array.from(socket.links.values())

    if (!socket.parent) {
      throw new Error(
        `The parent is missing on the block socket with ID "${socket.id}"`
      )
    }

    return <ISavedBlockSocket>{
      id: socket.id,
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

  private static mapLinkSocket<T>(socket: ILinkSocket<T>): ISavedLinkSocket {
    if (!socket.parent) {
      throw new Error(
        `The parent is missing on the link socket with ID "${socket.id}"`
      )
    }

    return <ISavedLinkSocket>{
      id: socket.id,
      position: socket.position,
      parentId: socket.parent.id,
      style: socket.style,
      canDelete: socket.canDelete,
      canEdit: socket.canEdit,
      canView: socket.canView,
      data: socket.data,
    }
  }

  private static mapLink<T>(link: ILink<T>): ISavedLink {
    const linkSockets = Array.from(link.linkSockets.values())

    if (!link.origin) {
      throw new Error(`The origin is missing on the link with ID "${link.id}"`)
    }

    if (!link.target) {
      throw new Error(`The target is missing on the link with ID "${link.id}"`)
    }

    return <ISavedLink>{
      id: link.id,
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
      linkSocketIds: linkSockets.map((ls) => ls.id).filter((ls) => !!ls),
    }
  }

  public render(): void {
    const container = this.state.container
    const svg = document.createElement('svg')

    if (!container) {
      throw new Error(
        'No container element has been set for Flobro. Please set a valid HTML element when constructing Flobro'
      )
    }

    const viewportWidth = container.clientWidth
    const viewportHeight = container.clientHeight
    const totalWidth = viewportWidth * DEFAULT_SVG_WIDTH_MULTIPLIER
    const totalHeight = viewportHeight * DEFAULT_SVG_HEIGHT_MULTIPLIER
    const initialX = viewportWidth - viewportWidth / 2
    const initialY = viewportHeight - viewportHeight / 2

    svg.setAttribute('class', DEFAULT_SVG_CLASS)
    svg.setAttribute('width', `${viewportWidth}`)
    svg.setAttribute('height', `${viewportHeight}`)
    svg.setAttribute(
      'viewBox',
      `${initialX} ${initialY} ${totalWidth} ${totalHeight}`
    )

    container.appendChild(svg)
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
    const savedBlocks = state.blocks.reduce(
      Helper.ReduceSavedBlockToMap,
      DEFAULT_MAP<ISavedBlock>()
    )
    const savedBlockSockets = state.blockSockets.reduce(
      Helper.ReduceSavedBlockSocketToMap,
      DEFAULT_MAP<ISavedBlockSocket>()
    )
    const savedLinks = state.links.reduce(
      Helper.ReduceSavedLinkToMap,
      DEFAULT_MAP<ISavedLink>()
    )

    blocks.forEach((block: IBlock<unknown>) => {
      if (!block.id) {
        throw new Error(
          `Critical error. The ID for the saved block was not set.`
        )
      }

      const sb = savedBlocks.get(block.id)

      if (!sb) {
        throw new Error('Could not find saved block.')
      }

      if (sb?.inSocketIds?.length) {
        block.inSockets = sb.inSocketIds.reduce(
          (inSocketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: UUID) => {
            const blockSocket = blockSockets.get(socketId)
            const sbs = savedBlockSockets.get(socketId)

            if (!blockSocket) {
              throw new Error('Could not find block socket.')
            }
            if (!sbs) {
              throw new Error('Could not find saved block socket.')
            }

            blockSocket.updateParent(block)
            this.state.addBlockSocket(blockSocket)

            if (sbs.linkIds?.length) {
              blockSocket.links = sbs.linkIds?.reduce(
                (linksMap: Map<UUID, ILink<unknown>>, linkId: UUID) => {
                  const link = links.get(linkId)
                  const sl = savedLinks.get(linkId)

                  if (!link) {
                    throw new Error('Could not find block socket.')
                  }
                  if (!sl) {
                    throw new Error('Could not find saved block socket.')
                  }

                  const originSocket = blockSockets.get(sl.originId)

                  if (!originSocket) {
                    throw new Error('Could not find origin block for link.')
                  }

                  link.updateTarget(blockSocket)
                  link.updateOrigin(originSocket)
                  this.state.addLink(link)

                  if (sl.linkSocketIds?.length) {
                    link.linkSockets = sl.linkSocketIds.reduce(
                      (
                        linkSocketsMap: Map<UUID, ILinkSocket<unknown>>,
                        linkSocketId: UUID
                      ) => {
                        const linkSocket = linkSockets.get(linkSocketId)

                        if (!linkSocket) {
                          throw new Error('Could not find link socket.')
                        }

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

      if (sb.outSocketIds?.length) {
        block.inSockets = sb.outSocketIds.reduce(
          (inSocketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: UUID) => {
            const blockSocket = blockSockets.get(socketId)
            const sbs = savedBlockSockets.get(socketId)

            if (!blockSocket) {
              throw new Error('Could not find block socket.')
            }
            if (!sbs) {
              throw new Error('Could not find saved block socket.')
            }

            blockSocket.updateParent(block)
            this.state.addBlockSocket(blockSocket)

            if (sbs.linkIds?.length) {
              blockSocket.links = sbs.linkIds?.reduce(
                (linksMap: Map<UUID, ILink<unknown>>, linkId: UUID) => {
                  const link = links.get(linkId)
                  const sl = savedLinks.get(linkId)

                  if (!link) {
                    throw new Error('Could not find block socket.')
                  }
                  if (!sl) {
                    throw new Error('Could not find saved block socket.')
                  }

                  const originSocket = blockSockets.get(sl.originId)

                  if (!originSocket) {
                    throw new Error('Could not find origin block for link.')
                  }

                  link.updateTarget(blockSocket)
                  link.updateOrigin(originSocket)
                  this.state.addLink(link)

                  if (sl.linkSocketIds?.length) {
                    link.linkSockets = sl.linkSocketIds.reduce(
                      (
                        linkSocketsMap: Map<UUID, ILinkSocket<unknown>>,
                        linkSocketId: UUID
                      ) => {
                        const linkSocket = linkSockets.get(linkSocketId)

                        if (!linkSocket) {
                          throw new Error('Could not find link socket.')
                        }

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
    })
  }
}
