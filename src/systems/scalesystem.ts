import { Entity } from "../components/entity";
import { POSITION_ID } from "../components/position";
import { ScaleComponent, SCALE_ID } from "../components/scale";
import { SHAPE_ID } from "../components/traits/drawable";
import { Scalable } from "../components/traits/scalable";
import { ChainedTransformation } from "../components/transformations/chainedTransformation";
import { ScaleChange, SCALE_CHAIN_CHANGE_ID } from "../components/transformations/scalechange";

function isScalable(component: any): component is Scalable {
    return 'scale' in component && typeof component.scale === 'function'

} 

export class ScaleSystem {
    process(entities: Entity[]) {
        
        for(const entity of entities) {
            const position = entity.getComponent(POSITION_ID);
            const shape = entity.getComponent(SHAPE_ID);
            const scale = entity.getComponent(SCALE_ID);
            const scaleChangeChain = entity.getComponent(SCALE_CHAIN_CHANGE_ID);
            
            if(position && shape && scale && isScalable(shape) && scaleChangeChain) {
                const chain = scaleChangeChain as ChainedTransformation<ScaleChange>;
                const scl = scale as ScaleComponent;
                const scaleChange = chain.getCurrent();

                if(scaleChange.framesElapsed >= scaleChange.totalFrames) {
                    chain.setNextTransformation()
                    continue;
                }

                this.linearTransform(scl, scaleChange);
            }
        }
    } 

    linearTransform(scale: ScaleComponent, scaleChange: ScaleChange) {
        const scalePerFrame = (scaleChange.startPercentage - scaleChange.endPercentage) / scaleChange.totalFrames;
        const scaleAtFrame = scaleChange.startPercentage + (scaleChange.framesElapsed * scalePerFrame)
        scale.scale = scaleAtFrame;
        scaleChange.framesElapsed++;
    }
}