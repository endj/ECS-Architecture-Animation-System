export const VELOCITY_ID = "velocity";

export class VelocityComponent implements Component  {
    public readonly name: string = VELOCITY_ID;
    private dx: number;
    private dy: number;
    constructor(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }
}