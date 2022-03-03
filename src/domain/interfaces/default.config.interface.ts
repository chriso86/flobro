import { Decimal, HEXColor, UnitOfMeasure } from '../../utils/custom-types'
import { ISvgConfig } from './svg-config.interface'

export interface IDefaultConfig {
  DefaultStrokeWidth: UnitOfMeasure
  DefaultStokeColor: HEXColor
  DefaultFillColor: HEXColor
  DefaultBlockElementWidth: UnitOfMeasure
  DefaultBlockElementHeight: UnitOfMeasure
  DefaultSvgWidth: Decimal
  DefaultSvgHeight: Decimal
  DefaultSvgNamespace: string
  DefaultSvgIdSelector: string
  DefaultSvgClass: string
  DefaultSvgZoomDisplayClass: string
  DefaultGridSize: Decimal
  DefaultGridSnap: boolean
  DefaultGridFillColor: HEXColor
  DefaultGridStrokeWidth: UnitOfMeasure
  DefaultGridStrokeColor: HEXColor
  DefaultSocketFillColor: HEXColor
  DefaultSocketStrokeWidth: UnitOfMeasure
  DefaultSocketStrokeColor: HEXColor
  DefaultSocketRadius: Decimal
  DefaultSocketCanDelete: boolean
  DefaultSocketCanEdit: boolean
  DefaultSocketCanView: boolean
  DefaultBlockFillColor: HEXColor
  DefaultBlockStrokeWidth: UnitOfMeasure
  DefaultBlockStrokeColor: HEXColor
  DefaultBlockWidth: UnitOfMeasure
  DefaultBlockHeight: UnitOfMeasure
  DefaultBlockCanDelete: boolean
  DefaultBlockCanEdit: boolean
  DefaultBlockCanView: boolean
  DefaultLinkStrokeWidth: UnitOfMeasure
  DefaultLinkStrokeColor: HEXColor
  DefaultLinkCanDelete: boolean
  DefaultLinkCanEdit: boolean
  DefaultLinkCanView: boolean
}
