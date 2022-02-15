import { Stroke } from './stroke'
import { Fill } from './fill'
import { IStroke } from '../interfaces/stroke.interface'
import { IStyle } from '../interfaces/style.interface'
import { IFill } from '../interfaces/fill.interface'

export class Style implements IStyle {
  constructor(
    public fill: IFill = new Fill(),
    public stroke: IStroke = new Stroke()
  ) {}
}
