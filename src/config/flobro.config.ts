import { IFlobroConfig } from './flobro-config.interface'
import {
  DEFAULT_BLOCK_CAN_DELETE,
  DEFAULT_BLOCK_CAN_EDIT,
  DEFAULT_BLOCK_CAN_VIEW,
  DEFAULT_BLOCK_ELEMENT_HEIGHT,
  DEFAULT_BLOCK_ELEMENT_WIDTH,
  DEFAULT_BLOCK_FILL_COLOR,
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_STROKE_COLOR,
  DEFAULT_BLOCK_STROKE_WIDTH,
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_FILL_COLOR,
  DEFAULT_GRID_FILL_COLOR,
  DEFAULT_GRID_SIZE,
  DEFAULT_GRID_SNAP,
  DEFAULT_GRID_STROKE_COLOR,
  DEFAULT_GRID_STROKE_WIDTH,
  DEFAULT_LINK_CAN_DELETE,
  DEFAULT_LINK_CAN_EDIT,
  DEFAULT_LINK_CAN_VIEW,
  DEFAULT_LINK_STROKE_COLOR,
  DEFAULT_LINK_STROKE_WIDTH,
  DEFAULT_SOCKET_CAN_DELETE,
  DEFAULT_SOCKET_CAN_EDIT,
  DEFAULT_SOCKET_CAN_VIEW,
  DEFAULT_SOCKET_FILL_COLOR,
  DEFAULT_SOCKET_RADIUS,
  DEFAULT_SOCKET_STROKE_COLOR,
  DEFAULT_SOCKET_STROKE_WIDTH,
  DEFAULT_STOKE_COLOR,
  DEFAULT_STROKE_WIDTH,
  DEFAULT_SVG_CLASS,
  DEFAULT_SVG_CONFIG,
  DEFAULT_SVG_HEIGHT,
  DEFAULT_SVG_ID_SELECTOR,
  DEFAULT_SVG_NAMESPACE,
  DEFAULT_SVG_WIDTH,
  DEFAULT_SVG_ZOOM_DISPLAY_CLASS,
} from '../utils/default.constants'
import { ISvgConfig } from '../domain/interfaces/svg-config.interface'
import { IDefaultConfig } from './default.config.interface'

export class FlobroConfig {
  private static _config: IFlobroConfig = {
    svgConfig: {} as ISvgConfig,
    defaults: {} as IDefaultConfig,
  }

  public static get defaults(): IDefaultConfig {
    return this._config.defaults
  }

  public static get svgConfig(): ISvgConfig {
    return this._config.svgConfig
  }

  public static Configure(config: Partial<IFlobroConfig>): IFlobroConfig {
    const generalDefaults = {
      DefaultStrokeWidth:
        config.defaults?.DefaultStrokeWidth ?? DEFAULT_STROKE_WIDTH,
      DefaultStokeColor:
        config.defaults?.DefaultStokeColor ?? DEFAULT_STOKE_COLOR,
      DefaultFillColor: config.defaults?.DefaultFillColor ?? DEFAULT_FILL_COLOR,
      DefaultBlockElementWidth:
        config.defaults?.DefaultBlockElementWidth ??
        DEFAULT_BLOCK_ELEMENT_WIDTH,
      DefaultBlockElementHeight:
        config.defaults?.DefaultBlockElementHeight ??
        DEFAULT_BLOCK_ELEMENT_HEIGHT,
    }

    const SVGDefaults = {
      DefaultSvgWidth: config.defaults?.DefaultSvgWidth ?? DEFAULT_SVG_WIDTH,
      DefaultSvgHeight: config.defaults?.DefaultSvgHeight ?? DEFAULT_SVG_HEIGHT,
      DefaultSvgNamespace:
        config.defaults?.DefaultSvgNamespace ?? DEFAULT_SVG_NAMESPACE,
      DefaultSvgIdSelector:
        config.defaults?.DefaultSvgIdSelector ?? DEFAULT_SVG_ID_SELECTOR,
      DefaultSvgClass: config.defaults?.DefaultSvgClass ?? DEFAULT_SVG_CLASS,
      DefaultSvgZoomDisplayClass:
        config.defaults?.DefaultSvgZoomDisplayClass ??
        DEFAULT_SVG_ZOOM_DISPLAY_CLASS,
    }

    const gridDefaults = {
      DefaultGridSize: config.defaults?.DefaultGridSize ?? DEFAULT_GRID_SIZE,
      DefaultGridSnap: config.defaults?.DefaultGridSnap ?? DEFAULT_GRID_SNAP,
      DefaultGridFillColor:
        config.defaults?.DefaultGridFillColor ?? DEFAULT_GRID_FILL_COLOR,
      DefaultGridStrokeWidth:
        config.defaults?.DefaultGridStrokeWidth ?? DEFAULT_GRID_STROKE_WIDTH,
      DefaultGridStrokeColor:
        config.defaults?.DefaultGridStrokeColor ?? DEFAULT_GRID_STROKE_COLOR,
    }

    const socketDefaults = {
      DefaultSocketFillColor:
        config.defaults?.DefaultSocketFillColor ?? DEFAULT_SOCKET_FILL_COLOR,
      DefaultSocketStrokeWidth:
        config.defaults?.DefaultSocketStrokeWidth ??
        DEFAULT_SOCKET_STROKE_WIDTH,
      DefaultSocketStrokeColor:
        config.defaults?.DefaultSocketStrokeColor ??
        DEFAULT_SOCKET_STROKE_COLOR,
      DefaultSocketRadius:
        config.defaults?.DefaultSocketRadius ?? DEFAULT_SOCKET_RADIUS,
      DefaultSocketCanDelete:
        config.defaults?.DefaultSocketCanDelete ?? DEFAULT_SOCKET_CAN_DELETE,
      DefaultSocketCanEdit:
        config.defaults?.DefaultSocketCanEdit ?? DEFAULT_SOCKET_CAN_EDIT,
      DefaultSocketCanView:
        config.defaults?.DefaultSocketCanView ?? DEFAULT_SOCKET_CAN_VIEW,
    }

    const blockDefaults = {
      DefaultBlockFillColor:
        config.defaults?.DefaultBlockFillColor ?? DEFAULT_BLOCK_FILL_COLOR,
      DefaultBlockStrokeWidth:
        config.defaults?.DefaultBlockStrokeWidth ?? DEFAULT_BLOCK_STROKE_WIDTH,
      DefaultBlockStrokeColor:
        config.defaults?.DefaultBlockStrokeColor ?? DEFAULT_BLOCK_STROKE_COLOR,
      DefaultBlockWidth:
        config.defaults?.DefaultBlockWidth ?? DEFAULT_BLOCK_WIDTH,
      DefaultBlockHeight:
        config.defaults?.DefaultBlockHeight ?? DEFAULT_BLOCK_HEIGHT,
      DefaultBlockCanDelete:
        config.defaults?.DefaultBlockCanDelete ?? DEFAULT_BLOCK_CAN_DELETE,
      DefaultBlockCanEdit:
        config.defaults?.DefaultBlockCanEdit ?? DEFAULT_BLOCK_CAN_EDIT,
      DefaultBlockCanView:
        config.defaults?.DefaultBlockCanView ?? DEFAULT_BLOCK_CAN_VIEW,
    }

    const linkDefaults = {
      DefaultLinkStrokeWidth:
        config.defaults?.DefaultLinkStrokeWidth ?? DEFAULT_LINK_STROKE_WIDTH,
      DefaultLinkStrokeColor:
        config.defaults?.DefaultLinkStrokeColor ?? DEFAULT_LINK_STROKE_COLOR,
      DefaultLinkCanDelete:
        config.defaults?.DefaultLinkCanDelete ?? DEFAULT_LINK_CAN_DELETE,
      DefaultLinkCanEdit:
        config.defaults?.DefaultLinkCanEdit ?? DEFAULT_LINK_CAN_EDIT,
      DefaultLinkCanView:
        config.defaults?.DefaultLinkCanView ?? DEFAULT_LINK_CAN_VIEW,
    }

    this._config.svgConfig = config.svgConfig ?? DEFAULT_SVG_CONFIG
    this._config.defaults = {
      ...generalDefaults,
      ...SVGDefaults,
      ...gridDefaults,
      ...socketDefaults,
      ...blockDefaults,
      ...linkDefaults,
    }

    return this._config
  }
}
