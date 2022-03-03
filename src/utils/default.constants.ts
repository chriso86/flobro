import { UUID } from './custom-types'
import { ISvgConfig } from '../domain/interfaces/svg-config.interface'

/*  Internal Defaults */
export const DEFAULT_MAP = <T>(): Map<UUID, T> => new Map<UUID, T>()

/* General Defaults */
export const DEFAULT_STROKE_WIDTH = 2
export const DEFAULT_STOKE_COLOR = '#666'
export const DEFAULT_FILL_COLOR = '#fff;'
export const DEFAULT_BLOCK_ELEMENT_WIDTH = '100%'
export const DEFAULT_BLOCK_ELEMENT_HEIGHT = 100

/* SVG Defaults */
export const DEFAULT_SVG_WIDTH = 1920
export const DEFAULT_SVG_HEIGHT = 1080
export const DEFAULT_SVG_NAMESPACE = 'http://www.w3.org/2000/svg'
export const DEFAULT_SVG_ID_SELECTOR = 'flobro-svg-container'
export const DEFAULT_SVG_CLASS = 'flobro-svg-container'
export const DEFAULT_SVG_CONFIG: ISvgConfig = {
  viewportSelector: '',
  panEnabled: true,
  controlIconsEnabled: false,
  zoomEnabled: true,
  dblClickZoomEnabled: true,
  mouseWheelZoomEnabled: true,
  preventMouseEventsDefault: true,
  zoomScaleSensitivity: 0.2,
  minZoom: 0.5,
  maxZoom: 10,
  fit: true,
  contain: false,
  center: true,
  refreshRate: 'auto',
  beforeZoom: () => null,
  onZoom: () => null,
  beforePan: () => null,
  onPan: () => null,
  onUpdatedCTM: () => null,
  customEventsHandler: {},
  eventsListenerElement: null,
}
export const DEFAULT_SVG_ZOOM_DISPLAY_CLASS = 'flobro-zoom-display'

/* Grid Defaults */
export const DEFAULT_GRID_SIZE = 100
export const DEFAULT_GRID_SNAP = true
export const DEFAULT_GRID_FILL_COLOR = DEFAULT_FILL_COLOR
export const DEFAULT_GRID_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_GRID_STROKE_COLOR = DEFAULT_STOKE_COLOR

/* Link Defaults */
export const DEFAULT_SOCKET_FILL_COLOR = DEFAULT_FILL_COLOR
export const DEFAULT_SOCKET_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_SOCKET_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_SOCKET_RADIUS = 5
export const DEFAULT_SOCKET_CAN_DELETE = true
export const DEFAULT_SOCKET_CAN_EDIT = true
export const DEFAULT_SOCKET_CAN_VIEW = true

/* Node Defaults */
export const DEFAULT_BLOCK_FILL_COLOR = '#9cf'
export const DEFAULT_BLOCK_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_BLOCK_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_BLOCK_WIDTH = DEFAULT_BLOCK_ELEMENT_WIDTH
export const DEFAULT_BLOCK_HEIGHT = DEFAULT_BLOCK_ELEMENT_HEIGHT
export const DEFAULT_BLOCK_CAN_DELETE = true
export const DEFAULT_BLOCK_CAN_EDIT = true
export const DEFAULT_BLOCK_CAN_VIEW = true

/* Path Defaults */
export const DEFAULT_LINK_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_LINK_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_LINK_CAN_DELETE = true
export const DEFAULT_LINK_CAN_EDIT = true
export const DEFAULT_LINK_CAN_VIEW = true
