export const POSITION_ID: string = "position";

export class PositionComponent implements Component  {
    public readonly name: string = POSITION_ID;
    public y: number;
    public x: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}