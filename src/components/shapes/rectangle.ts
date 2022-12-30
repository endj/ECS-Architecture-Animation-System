import { Color } from "../../commontypes"
import { Drawable, SHAPE_ID } from "../traits/drawable"
import { Scalable } from "../traits/scalable"


export class RectangleComponent implements Component, Drawable, Scalable {
    name = SHAPE_ID
    width: number
    height: number
    color: Color
  
    constructor(width: number, height: number, color: Color) {
      this.width = width
      this.height = height
      this.color = color
    }
  scale(byPercentage: number): void {
    this.height = this.height * byPercentage;
    this.width = this.width * byPercentage;
  }
  draw(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.color;
    context.fillRect(0, 0, this.width, this.height);
  }
}