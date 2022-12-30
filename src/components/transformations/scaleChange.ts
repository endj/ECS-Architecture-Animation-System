
export const SCALE_CHAIN_CHANGE_ID: string = "scaleChainChange"


export class ScaleChange implements Chainable<ScaleChange> {
    public readonly startPercentage: number;
    public readonly endPercentage: number;
    public readonly totalFrames: number;
    public framesElapsed: number;
    public next: ScaleChange;
    
    constructor(
        startPercentage: number,
        endPercentage: number,
        frameDuration: number
    ) {
        this.startPercentage = startPercentage;
        this.endPercentage = endPercentage;
        this.totalFrames = frameDuration
        this.framesElapsed = 0;
    }

    reset() {
        this.framesElapsed = 0;
    }
}