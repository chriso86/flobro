import { IViewBox } from './view-box.interface'

export class ViewBox implements IViewBox {
  constructor(
    public x: number,
    public y: number,
    public width: number,
    public height: number
  ) {}

  public toString(): string {
    return `${this.x} ${this.y} ${this.width} ${this.height}`
  }
}
