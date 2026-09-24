import type { GameScreen } from "./gamescreen.js";
export declare class Game {
    canvas: HTMLCanvasElement;
    context: WebGLRenderingContext;
    currentScreen: GameScreen;
    constructor(canvas: HTMLCanvasElement, ctx: WebGLRenderingContext);
    private run;
    private loop;
    private update;
    private draw;
    private onClick;
}
//# sourceMappingURL=game.d.ts.map