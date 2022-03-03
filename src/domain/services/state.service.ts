import { IState } from '../interfaces/state.interface'
import { IGrid } from '../interfaces/grid.interface'
import { ITheme } from '../interfaces/theme.interface'
import { Theme } from '../models/theme'
import { IStateService } from '../interfaces/state.service.interface'
import { IBlock } from '../interfaces/block.interface'
import { IBlockSocket } from '../interfaces/block-socket.interface'
import { ILinkSocket } from '../interfaces/link-socket.interface'
import { ILink } from '../interfaces/link.interface'
import { UUID } from '../../utils/custom-types'
import { IBehaviorSubject } from '../interfaces/behavior-subject.interface'
import { BehaviorSubject } from '../../utils/behavior-subject'
import { ISavedBlockSocket } from '../interfaces/saved-block-socket.interface'
import { ISavedLink } from '../interfaces/saved-link.interface'
import { DEFAULT_MAP } from '../../utils/default.constants'
import { WorkArea } from '../models/work-area'
import { ISvgConfig } from '../interfaces/svg-config.interface'
import { Helper } from '../../utils/helper'
import { ISavedState } from '../interfaces/saved-state.interface'
import { ISavedBlock } from '../interfaces/saved-block.interface'
import { ISavedLinkSocket } from '../interfaces/saved-link-socket.interface'
import { ISubscription } from '../interfaces/subscription.interface'

export class StateService implements IStateService {
  private _state: IBehaviorSubject<IState> = new BehaviorSubject<IState>({
    id: Helper.GenerateUUID(),
    workArea: new WorkArea(
      {} as HTMLElement,
      {} as SVGSVGElement,
      {} as ISvgConfig,
      {} as IGrid
    ),
    theme: new Theme(),
    blocks: new Map<UUID, IBlock<unknown>>(),
    blockSockets: new Map<UUID, IBlockSocket<unknown>>(),
    linkSockets: new Map<UUID, ILinkSocket<unknown>>(),
    links: new Map<UUID, ILink<unknown>>(),
  })

  public get state(): IState {
    return this._state.getValue()
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

  public initialize(
    container: HTMLElement,
    svg: SVGSVGElement,
    svgConfig?: ISvgConfig,
    grid?: IGrid,
    theme: ITheme = new Theme()
  ): IState {
    const workArea = new WorkArea(container, svg, svgConfig, grid)

    return this.updateState({
      workArea,
      theme,
    })
  }

  public updateGrid(options: Partial<IGrid>): void {
    const workArea = this.state.workArea

    this.updateState({
      workArea: {
        ...workArea,
        grid: {
          ...workArea.grid,
          ...options,
        } as IGrid,
      },
    })
  }

  public updateTheme(options: Partial<ITheme>): void {
    this.updateState({
      theme: {
        ...this.state.theme,
        ...options,
      },
    })
  }

  public addBlock<T>(block: IBlock<T>): void {
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

  public addBlockSocket<T>(socket: IBlockSocket<T>): void {
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

  public addLinkSocket<T>(socket: ILinkSocket<T>): void {
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

  public addLink<T>(link: ILink<T>): void {
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

  public save(): ISavedState {
    const blocks = Array.from(this.state.blocks.values()).map(
      (block: IBlock<unknown>) => StateService.mapBlock(block)
    )
    const blockSockets = Array.from(this.state.blockSockets.values()).map(
      (blockSocket: IBlockSocket<unknown>) =>
        StateService.mapBlockSocket(blockSocket)
    )
    const linkSockets = Array.from(this.state.linkSockets.values()).map(
      (linkSocket: ILinkSocket<unknown>) =>
        StateService.mapLinkSocket(linkSocket)
    )
    const links = Array.from(this.state.links.values()).map(
      (link: ILink<unknown>) => StateService.mapLink(link)
    )

    return {
      workArea: this.state.workArea,
      theme: this.state.theme,
      blocks,
      blockSockets,
      linkSockets,
      links,
    }
  }

  public load(state: ISavedState): void {
    this.state.blocks = state.blocks.reduce(
      Helper.ReduceBlockToMap,
      DEFAULT_MAP<IBlock<unknown>>()
    )
    this.state.blockSockets = state.blockSockets.reduce(
      Helper.ReduceBlockSocketToMap,
      DEFAULT_MAP<IBlockSocket<unknown>>()
    )
    this.state.linkSockets = state.linkSockets.reduce(
      Helper.ReduceLinkSocketToMap,
      DEFAULT_MAP<ILinkSocket<unknown>>()
    )
    this.state.links = state.links.reduce(
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

    this.state.blocks.forEach((block: IBlock<unknown>) => {
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
          (socketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: string) => {
            return this.reduceBlockSocket(
              socketsMap,
              socketId,
              block,
              savedBlockSockets,
              savedLinks
            )
          },
          DEFAULT_MAP<IBlockSocket<unknown>>()
        )
      }

      if (sb.outSocketIds?.length) {
        block.inSockets = sb.outSocketIds.reduce(
          (socketsMap: Map<UUID, IBlockSocket<unknown>>, socketId: string) => {
            return this.reduceBlockSocket(
              socketsMap,
              socketId,
              block,
              savedBlockSockets,
              savedLinks
            )
          },
          DEFAULT_MAP<IBlockSocket<unknown>>()
        )
      }

      this.addBlock(block)
    })
  }

  public onUpdate(callback: (state: IState) => void): ISubscription {
    return this._state.subscribe(callback)
  }

  private reduceBlockSocket(
    socketsMap: Map<UUID, IBlockSocket<unknown>>,
    socketId: UUID,
    block: IBlock<unknown>,
    savedBlockSockets: Map<UUID, ISavedBlockSocket>,
    savedLinks: Map<UUID, ISavedLink>
  ): Map<UUID, IBlockSocket<unknown>> {
    const blockSocket = this.state.blockSockets.get(socketId)
    const sbs = savedBlockSockets.get(socketId)

    if (!blockSocket) {
      throw new Error('Could not find block socket.')
    }
    if (!sbs) {
      throw new Error('Could not find saved block socket.')
    }

    blockSocket.updateParent(block)
    this.addBlockSocket(blockSocket)

    if (sbs.linkIds?.length) {
      blockSocket.links = sbs.linkIds?.reduce(
        (linksMap: Map<UUID, ILink<unknown>>, linkId: string) => {
          return this.reduceLink(linksMap, linkId, savedLinks)
        },
        DEFAULT_MAP<ILink<unknown>>()
      )
    }

    return socketsMap.set(socketId, blockSocket)
  }

  private reduceLink(
    linksMap: Map<UUID, ILink<unknown>>,
    linkId: UUID,
    savedLinks: Map<UUID, ISavedLink>
  ): Map<UUID, ILink<unknown>> {
    const link = this.state.links.get(linkId)
    const sl = savedLinks.get(linkId)

    if (!link) {
      throw new Error('Could not find link.')
    }
    if (!sl) {
      throw new Error('Could not find saved link.')
    }

    const originSocket = this.state.blockSockets.get(sl.originId)
    const targetSocket = this.state.blockSockets.get(sl.targetId)

    if (!originSocket) {
      throw new Error('Could not find origin block for link.')
    }
    if (!targetSocket) {
      throw new Error('Could not find target block for link.')
    }

    link.updateTarget(targetSocket)
    link.updateOrigin(originSocket)
    this.addLink(link)

    if (sl.linkSocketIds?.length) {
      link.linkSockets = sl.linkSocketIds.reduce(
        (
          linkSocketMap: Map<UUID, ILinkSocket<unknown>>,
          linkSocketId: UUID
        ) => {
          return this.reduceLinkSockets(linkSocketMap, linkSocketId, link)
        },
        DEFAULT_MAP<ILinkSocket<unknown>>()
      )
    }

    return linksMap.set(linkId, link)
  }

  private reduceLinkSockets(
    linkSocketsMap: Map<UUID, ILinkSocket<unknown>>,
    linkSocketId: UUID,
    link: ILink<unknown>
  ): Map<UUID, ILinkSocket<unknown>> {
    const linkSocket = this.state.linkSockets.get(linkSocketId)

    if (!linkSocket) {
      throw new Error('Could not find link socket.')
    }

    linkSocket.updateParent(link)
    this.addLinkSocket(linkSocket)

    return linkSocketsMap.set(linkSocketId, linkSocket)
  }

  private updateState(state: Partial<IState> | null): IState {
    this._state.next({
      ...this.state,
      ...state,
    } as IState)

    return this.state
  }
}
