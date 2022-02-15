import { IElement } from './element.interface'
import { ICircleStyle } from './circle-style.interface'

export interface ISocket<T> extends IElement<T> {
  style: ICircleStyle

  /* Override updateStyle method on IElement base interface */
  updateStyle(style: ICircleStyle): void
}
