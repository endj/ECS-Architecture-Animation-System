import { Canvas } from "./canvas/canvas";
import { Entity } from "./components/entity";
import { PositionComponent } from "./components/position";
import { PositionChange, POSITION_CHAIN_CHANGE_ID } from "./components/transformations/positionChange";
import { CircleComponent } from "./components/shapes/circle";
import { RectangleComponent } from "./components/shapes/rectangle";
import { AnimationSystem } from "./systems/animationsystem";
import { RenderSystem } from "./systems/rendersystem";
import { ChainedTransformation } from "./components/transformations/chainedTransformation";
import { ScaleChange, SCALE_CHAIN_CHANGE_ID } from "./components/transformations/scalechange";
import { ScaleComponent } from "./components/scale";
import { ScaleSystem } from "./systems/scalesystem";

const canvas = new Canvas(420, 420);
const ctx = canvas.getContext();
canvas.attachTo(document.getElementsByTagName('body')[0])

const renderSystem = new RenderSystem(ctx, canvas.getDimensions());
const animationSystem = new AnimationSystem();
const scaleSystem = new ScaleSystem();

const entitys: Entity[] = [];

const circle = new Entity()
    .addComponent(new CircleComponent(10, "rgb(0, 0, 0)"))
    .addComponent(new PositionComponent(100, 100))
    .addComponent(
        new ChainedTransformation<PositionChange>(POSITION_CHAIN_CHANGE_ID)
            .addTransformation(new PositionChange({ x: 100, y: 100 }, { x: 200, y: 300 }, 60))
            .addTransformation(new PositionChange({ x: 200, y: 300 }, { x: 100, y: 100 }, 60))
            .chainChange(0, 1)
            .chainChange(1, 0)
    ).addComponent(
        new ChainedTransformation<ScaleChange>(SCALE_CHAIN_CHANGE_ID)
            .addTransformation(new ScaleChange(100, 150, 60))
            .addTransformation(new ScaleChange(150, 75, 120))
            .addTransformation(new ScaleChange(75, 100, 60))
            .chainChange(0, 1)
            .chainChange(1, 2)
            .chainChange(2, 0)
    ).addComponent(new ScaleComponent(100));

const rectangle2 = new Entity()
    .addComponent(new RectangleComponent(20, 20, "rgb(122, 255, 0)"))
    .addComponent(new PositionComponent(100, 100))
    .addComponent(
        new ChainedTransformation<PositionChange>(POSITION_CHAIN_CHANGE_ID)
            .addTransformation(new PositionChange({ x: 100, y: 100 }, { x: 200, y: 100 }, 60))
            .addTransformation(new PositionChange({ x: 200, y: 100 }, { x: 200, y: 200 }, 60))
            .addTransformation(new PositionChange({ x: 200, y: 200 }, { x: 100, y: 200 }, 60))
            .addTransformation(new PositionChange({ x: 100, y: 200 }, { x: 100, y: 100 }, 60))
            .chainChange(0, 1)
            .chainChange(1, 2)
            .chainChange(2, 3)
            .chainChange(3, 0)
    );


entitys.push(circle)
entitys.push(rectangle2)

const tick = () => {
    animationSystem.process(entitys)
    renderSystem.process(entitys)
    scaleSystem.process(entitys)
    requestAnimationFrame(tick)
}
tick()