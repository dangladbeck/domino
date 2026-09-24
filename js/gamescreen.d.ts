import type { Game } from "./game.js";
export declare abstract class GameScreen {
    constructor();
    update(): void;
    draw(ctx: WebGLRenderingContext): void;
    onClick(game: Game, mouseInfo: MouseEvent): void;
}
//# sourceMappingURL=gamescreen.d.ts.map