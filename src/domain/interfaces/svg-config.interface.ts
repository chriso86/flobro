import { Decimal } from '../../utils/custom-types'

export interface ISvgConfig {
  viewportSelector: string
  panEnabled: boolean
  controlIconsEnabled: boolean
  zoomEnabled: boolean
  dblClickZoomEnabled: boolean
  mouseWheelZoomEnabled: boolean
  preventMouseEventsDefault: boolean
  zoomScaleSensitivity: Decimal
  minZoom: Decimal
  maxZoom: Decimal
  fit: boolean
  contain: boolean
  center: boolean
  refreshRate: 'auto'
  beforeZoom: () => void
  onZoom: () => void
  beforePan: () => void
  onPan: () => void
  onUpdatedCTM: () => void
  customEventsHandler: unknown
  eventsListenerElement: Element | null
}
