import { Dimension } from "../canvas/canvas";
import { Entity } from "../components/entity";
import { PositionComponent, POSITION_ID } from "../components/position";
import { ScaleComponent, SCALE_ID } from "../components/scale";
import { SHAPE_ID, Drawable } from "../components/traits/drawable";


function isDrawable(component: any): component is Drawable {
    return 'draw' in component && typeof component.draw === 'function'
}

export class RenderSystem {
    private readonly ctx: CanvasRenderingContext2D;
    private readonly canvasDimensions: Dimension;
    constructor(ctx: CanvasRenderingContext2D,
        dimensions: Dimension) {
        this.ctx = ctx;
        this.canvasDimensions = dimensions;
    }
    process(entities: Entity[]) {
        this.ctx.clearRect(0, 0, this.canvasDimensions.width, this.canvasDimensions.height)

        for(const entity of entities) {
            const position = entity.getComponent(POSITION_ID);
            const shape = entity.getComponent(SHAPE_ID);
            const scale = entity.getComponent(SCALE_ID)


           // const scaleBy = !!scale ? (scale as ScaleComponent).scale : 1;
            
            
            if(position && shape && isDrawable(shape)) {
                const pos = position as PositionComponent;
                this.ctx.save();
                this.ctx.translate(pos.x, pos.y);
                shape.draw(this.ctx);
                this.ctx.restore();
            }
        }
    } 
}