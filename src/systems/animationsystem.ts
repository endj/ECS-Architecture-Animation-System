import { Entity } from "../components/entity";
import { PositionComponent, POSITION_ID } from "../components/position";
import { ChainedTransformation } from "../components/transformations/chainedTransformation";
import { PositionChange, POSITION_CHAIN_CHANGE_ID } from "../components/transformations/positionChange";

export class AnimationSystem {

    process(entities: Entity[]) {
        for (const entity of entities) {
            const position = entity.getComponent(POSITION_ID);
            const positionChangeChain = entity.getComponent(POSITION_CHAIN_CHANGE_ID);

            if (position && positionChangeChain) {
                const chain = positionChangeChain as ChainedTransformation<PositionChange>;
                const pos = position as PositionComponent;
                const posChange = chain.getCurrent();

                if (posChange.framesElapsed >= posChange.totalFrames) {
                    chain.setNextTransformation()
                    continue;
                }

                this.linearTransform(pos, posChange)
            }
        }
    }

    linearTransform(position: PositionComponent, positionChange: PositionChange) {
        const dxPerFrame = positionChange.dx / positionChange.totalFrames;
        const dyPerFrame = positionChange.dy / positionChange.totalFrames;

        position.x = positionChange.startPosition.x + positionChange.framesElapsed * dxPerFrame;
        position.y = positionChange.startPosition.y + positionChange.framesElapsed * dyPerFrame;

        positionChange.framesElapsed++;
    }
}