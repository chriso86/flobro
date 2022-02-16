import { Fill } from '../domain/fill'
import { Stroke } from '../domain/stroke'
import { BlockStyle } from '../domain/block-style'
import { CircleStyle } from '../domain/circle-style'
import { Style } from '../domain/style'
import { BlockSocket } from '../domain/block.socket'
import { ILinkSocket } from '../domain/interfaces/link-socket.interface'
import { ILink } from '../domain/interfaces/link.interface'
import { UUID } from '../domain/interfaces/custom-types'

/* General Defaults */
export const DEFAULT_STROKE_WIDTH = 2
export const DEFAULT_STOKE_COLOR = '#666'
export const DEFAULT_FILL_COLOR = '#fff;'
export const DEFAULT_BLOCK_ELEMENT_WIDTH = '100%'
export const DEFAULT_BLOCK_ELEMENT_HEIGHT = 100
export const DEFAULT_MAP = <T>() => new Map<UUID, T>()

/* Grid Defaults */
export const DEFAULT_GRID_SIZE = 20
export const DEFAULT_GRID_SNAP = true
export const DEFAULT_GRID_FILL_COLOR = DEFAULT_FILL_COLOR
export const DEFAULT_GRID_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_GRID_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_GRID_FILL = new Fill(DEFAULT_GRID_FILL_COLOR)
export const DEFAULT_GRID_STROKE = new Stroke(
  DEFAULT_GRID_STROKE_COLOR,
  DEFAULT_GRID_STROKE_WIDTH
)

/* Link Defaults */
export const DEFAULT_SOCKET_FILL_COLOR = DEFAULT_FILL_COLOR
export const DEFAULT_SOCKET_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_SOCKET_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_SOCKET_FILL = new Fill(DEFAULT_SOCKET_FILL_COLOR)
export const DEFAULT_SOCKET_STROKE = new Stroke(
  DEFAULT_SOCKET_STROKE_COLOR,
  DEFAULT_SOCKET_STROKE_WIDTH
)
export const DEFAULT_SOCKET_RADIUS = 5
export const DEFAULT_SOCKET_CAN_DELETE = true
export const DEFAULT_SOCKET_CAN_EDIT = true
export const DEFAULT_SOCKET_CAN_VIEW = true
export const DEFAULT_SOCKET_STYLE = new CircleStyle()
export const DEFAULT_SOCKET_DATA = null
export const DEFAULT_SOCKET_PARENT = null

export const DEFAULT_BLOCK_SOCKET_LINKS = new Map<UUID, ILink<unknown>>()

/* Node Defaults */
export const DEFAULT_BLOCK_FILL_COLOR = '#9cf'
export const DEFAULT_BLOCK_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_BLOCK_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_BLOCK_FILL = new Fill(DEFAULT_BLOCK_FILL_COLOR)
export const DEFAULT_BLOCK_STROKE = new Stroke(
  DEFAULT_BLOCK_STROKE_COLOR,
  DEFAULT_BLOCK_STROKE_WIDTH
)
export const DEFAULT_BLOCK_WIDTH = DEFAULT_BLOCK_ELEMENT_WIDTH
export const DEFAULT_BLOCK_HEIGHT = DEFAULT_BLOCK_ELEMENT_HEIGHT
export const DEFAULT_BLOCK_STYLE = new BlockStyle(
  DEFAULT_BLOCK_WIDTH,
  DEFAULT_BLOCK_HEIGHT
)
export const DEFAULT_BLOCK_SOCKETS = new Map<UUID, BlockSocket<unknown>>()
export const DEFAULT_BLOCK_CAN_DELETE = true
export const DEFAULT_BLOCK_CAN_EDIT = true
export const DEFAULT_BLOCK_CAN_VIEW = true
export const DEFAULT_BLOCK_DATA = null

/* Path Defaults */
export const DEFAULT_LINK_STROKE_WIDTH = DEFAULT_STROKE_WIDTH
export const DEFAULT_LINK_STROKE_COLOR = DEFAULT_STOKE_COLOR
export const DEFAULT_LINK_STROKE = new Stroke(
  DEFAULT_LINK_STROKE_COLOR,
  DEFAULT_LINK_STROKE_WIDTH
)
export const DEFAULT_LINK_STYLE = new Style()
export const DEFAULT_LINK_CAN_DELETE = true
export const DEFAULT_LINK_CAN_EDIT = true
export const DEFAULT_LINK_CAN_VIEW = true
export const DEFAULT_LINK_ORIGIN = null
export const DEFAULT_LINK_TARGET = null
export const DEFAULT_LINK_DATA = null
export const DEFAULT_LINK_SOCKETS = new Map<UUID, ILinkSocket<unknown>>()
