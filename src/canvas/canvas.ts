export type Dimension = {
    width: number;
    height: number;
}
export class Canvas {
    private readonly width: number;
    private readonly height: number;
    private readonly canvas: HTMLCanvasElement;
    private readonly ctx: CanvasRenderingContext2D;

    constructor(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.canvas = document.createElement("canvas");
        this.canvas.width = width;
        this.canvas.height = height;
        this.ctx = this.canvas.getContext("2d")
    }

    public attachTo(element: HTMLElement): void {
        element.appendChild(this.canvas);
    }

    public getContext() {
        return this.ctx;
    }

    public getDimensions(): Dimension {
        return { width: this.width, height: this.height}
    }

}