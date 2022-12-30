import { Color } from "../../commontypes";
import { Drawable, SHAPE_ID } from "../traits/drawable"
import { Scalable } from "../traits/scalable";


export class CircleComponent implements Component, Drawable, Scalable {
    static readonly TAU: number = 2 * Math.PI;
    name = SHAPE_ID
    radius: number
    color: Color

    constructor(radius: number, color: Color) {
        this.radius = radius
        this.color = color
    }
 
    draw(context: CanvasRenderingContext2D): void {
        context.beginPath()
        context.arc(0, 0, this.radius, 0, CircleComponent.TAU)
        context.fillStyle = this.color
        context.fill()
        context.stroke()
    }

    scale(byPercentage: number): void {
        this.radius = this.radius * byPercentage;
    }
}

