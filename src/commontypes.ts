export type Vec2D = {
    x: number;
    y: number;
}

export type CHAIN_DONE = boolean;


type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

export type Color = RGB | RGBA | HEX;

const test: Color = "rgb(0, 0, 0)"