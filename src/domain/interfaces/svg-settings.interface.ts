import { Decimal } from './custom-types'
import Options = SvgPanZoom.Options

export interface ISvgSettings {
  zoomPanConfig: Options
  width: Decimal
  height: Decimal
  namespace: string
  idSelector: string
  class: string
  zoomDisplayClass: string
}
