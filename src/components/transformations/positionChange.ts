import { Vec2D } from "../../commontypes";

export const POSITION_CHAIN_CHANGE_ID: string = "positionChainChange"

export class PositionChange implements Chainable<PositionChange> {
    public readonly startPosition: Vec2D;
    public readonly endPosition: Vec2D;
    public readonly totalFrames: number;
    public framesElapsed: number;
    public readonly dx: number;
    public readonly dy: number;
    public next: PositionChange | undefined

    constructor(
        startPosition: Vec2D,
        endPosition: Vec2D,
        frameDuration: number) {
            this.startPosition = startPosition;
            this.endPosition = endPosition;
            this.totalFrames = frameDuration;
            this.framesElapsed = 0;
            if(frameDuration <= 0)
                throw "Invalid frame duration " + frameDuration;
            this.dx = endPosition.x - startPosition.x;
            this.dy = endPosition.y - startPosition.y;
        }

    setNext (next: PositionChange): void {
        this.next = next;
    }
    
    reset(): void {
        this.framesElapsed = 0;
    }
}