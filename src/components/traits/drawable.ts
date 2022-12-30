export const SHAPE_ID = "shape";

export interface Drawable {
    draw(context: CanvasRenderingContext2D): void
}