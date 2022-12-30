export const SCALE_ID: string = "scale";


export class ScaleComponent implements Component {
    name: string = SCALE_ID;
    public scale: number;
    constructor(scale: number) {
        this.scale = scale;
    }
}