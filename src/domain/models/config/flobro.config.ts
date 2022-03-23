import { IFlobroConfig } from '../../interfaces/flobro-config.interface'
import {
  DEFAULT_BLOCK_CAN_DELETE,
  DEFAULT_BLOCK_CAN_EDIT,
  DEFAULT_BLOCK_CAN_VIEW,
  DEFAULT_BLOCK_FILL_COLOR,
  DEFAULT_BLOCK_HEIGHT,
  DEFAULT_BLOCK_STROKE_COLOR,
  DEFAULT_BLOCK_STROKE_WIDTH,
  DEFAULT_BLOCK_WIDTH,
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
  DEFAULT_SVG_CLASS,
  DEFAULT_SVG_CONFIG,
  DEFAULT_SVG_HEIGHT,
  DEFAULT_SVG_ID_SELECTOR,
  DEFAULT_SVG_NAMESPACE,
  DEFAULT_SVG_WIDTH,
  DEFAULT_SVG_ZOOM_DISPLAY_CLASS,
} from '../../../utils/default.constants'
import { ISvgSettings } from '../../interfaces/svg-settings.interface'
import { IGridSettings } from '../../interfaces/grid-settings.interface'
import { IBlockGlobalSettings } from '../../interfaces/block-settings.interface'
import { ISocketGlobalSettings } from '../../interfaces/socket-settings.interface'
import { ILinkGlobalSettings } from '../../interfaces/link-settings.interface'

export class FlobroConfig {
  private static _config: IFlobroConfig = {
    svgSettings: {
      class: DEFAULT_SVG_CLASS,
      idSelector: DEFAULT_SVG_ID_SELECTOR,
      namespace: DEFAULT_SVG_NAMESPACE,
      width: DEFAULT_SVG_WIDTH,
      height: DEFAULT_SVG_HEIGHT,
      zoomDisplayClass: DEFAULT_SVG_ZOOM_DISPLAY_CLASS,
      zoomPanConfig: DEFAULT_SVG_CONFIG,
    },
    gridSettings: {
      size: DEFAULT_GRID_SIZE,
      useSnapping: DEFAULT_GRID_SNAP,
      fillColor: DEFAULT_GRID_FILL_COLOR,
      strokeColor: DEFAULT_GRID_STROKE_COLOR,
      strokeWidth: DEFAULT_GRID_STROKE_WIDTH,
    },
    blockGlobalSettings: {
      width: DEFAULT_BLOCK_WIDTH,
      height: DEFAULT_BLOCK_HEIGHT,
      fillColor: DEFAULT_BLOCK_FILL_COLOR,
      strokeColor: DEFAULT_BLOCK_STROKE_COLOR,
      strokeWidth: DEFAULT_BLOCK_STROKE_WIDTH,
      canDelete: DEFAULT_BLOCK_CAN_DELETE,
      canEdit: DEFAULT_BLOCK_CAN_EDIT,
      canView: DEFAULT_BLOCK_CAN_VIEW,
    },
    socketGlobalSettings: {
      radius: DEFAULT_SOCKET_RADIUS,
      canDelete: DEFAULT_SOCKET_CAN_DELETE,
      canEdit: DEFAULT_SOCKET_CAN_EDIT,
      canView: DEFAULT_SOCKET_CAN_VIEW,
      fillColor: DEFAULT_SOCKET_FILL_COLOR,
      strokeColor: DEFAULT_SOCKET_STROKE_COLOR,
      strokeWidth: DEFAULT_SOCKET_STROKE_WIDTH,
    },
    linkGlobalSettings: {
      strokeColor: DEFAULT_LINK_STROKE_COLOR,
      strokeWidth: DEFAULT_LINK_STROKE_WIDTH,
      canDelete: DEFAULT_LINK_CAN_DELETE,
      canEdit: DEFAULT_LINK_CAN_EDIT,
      canView: DEFAULT_LINK_CAN_VIEW,
    },
  }

  public static get SvgSettings(): ISvgSettings {
    return <ISvgSettings>this._config.svgSettings
  }

  public static get GridSettings(): IGridSettings {
    return <IGridSettings>this._config.gridSettings
  }

  public static get BlockGlobalSettings(): IBlockGlobalSettings {
    return <IBlockGlobalSettings>this._config.blockGlobalSettings
  }

  public static get SocketGlobalSettings(): ISocketGlobalSettings {
    return <ISocketGlobalSettings>this._config.socketGlobalSettings
  }

  public static get LinkGlobalSettings(): ILinkGlobalSettings {
    return <ILinkGlobalSettings>this._config.linkGlobalSettings
  }

  public static Configure(config: Partial<IFlobroConfig>): void {
    if (config.svgSettings) {
      this.ConfigureSvgSettings(config.svgSettings)
    }

    if (config.gridSettings) {
      this.ConfigureGridSettings(config.gridSettings)
    }

    if (config.blockGlobalSettings) {
      this.ConfigureBlockGlobalSettings(config.blockGlobalSettings)
    }

    if (config.socketGlobalSettings) {
      this.ConfigureSocketGlobalSettings(config.socketGlobalSettings)
    }

    if (config.linkGlobalSettings) {
      this.ConfigureLinkGlobalSettings(config.linkGlobalSettings)
    }
  }

  private static ConfigureSvgSettings(svgSettings: Partial<ISvgSettings>) {
    this._config.svgSettings = {
      ...this._config.svgSettings,
      ...svgSettings,
    }
  }

  private static ConfigureGridSettings(gridSettings: Partial<IGridSettings>) {
    this._config.gridSettings = {
      ...this._config.gridSettings,
      ...gridSettings,
    }
  }

  private static ConfigureBlockGlobalSettings(
    blockGlobalSettings: Partial<IBlockGlobalSettings>
  ) {
    this._config.blockGlobalSettings = {
      ...this._config.blockGlobalSettings,
      ...blockGlobalSettings,
    }
  }

  private static ConfigureSocketGlobalSettings(
    socketGlobalSettings: Partial<ISocketGlobalSettings>
  ) {
    this._config.socketGlobalSettings = {
      ...this._config.socketGlobalSettings,
      ...socketGlobalSettings,
    }
  }

  private static ConfigureLinkGlobalSettings(
    linkGlobalSettings: Partial<ILinkGlobalSettings>
  ) {
    this._config.linkGlobalSettings = {
      ...this._config.linkGlobalSettings,
      ...linkGlobalSettings,
    }
  }
}
