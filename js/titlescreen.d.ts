import type { Game } from "./game.js";
import { GameScreen } from "./gamescreen.js";
export declare class TitleScreen extends GameScreen {
    constructor();
    update(): void;
    draw(gl: WebGLRenderingContext): void;
    onClick(game: Game, mouseInfo: MouseEvent): void;
}
//# sourceMappingURL=titlescreen.d.ts.map