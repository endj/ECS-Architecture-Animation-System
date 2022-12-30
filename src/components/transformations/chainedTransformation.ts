import { CHAIN_DONE } from "../../commontypes";


export class ChainedTransformation<T extends Chainable<T>> implements Component {
    name: string;
    private chainedTransformations: T[];
    private current: T | undefined;

    constructor(name: string) {
        this.name = name;
        this.chainedTransformations = [];
    }

    public addTransformation(t: T): ChainedTransformation<T> {
        if (!this.current)
            this.current = t;
        this.chainedTransformations.push(t);
        return this;
    }

    public getCurrent() {
        return this.current;
    }

    public setNextTransformation(): CHAIN_DONE {
        if (this.current.next) {
            this.current = this.current.next;
            this.current.reset();
            return false;
        }
        return true;
    }

    public setCyclicalChange() {
        // Do cyclical stuff here
    }

    public chainChange(fromIndex: number, toIndexNumber: number) {
        if (fromIndex < 0
            || fromIndex >= this.chainedTransformations.length
            || toIndexNumber < 0
            || toIndexNumber >= this.chainedTransformations.length
            || toIndexNumber === fromIndex) {
            throw `Invalid chain from: ${fromIndex} too: ${toIndexNumber} ${this.chainedTransformations.length}`;
        }
        this.chainedTransformations[fromIndex].next = this.chainedTransformations[toIndexNumber];
        return this
    }
}