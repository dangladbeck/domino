import { GameScreen } from "./gamescreen.js";
import { TitleScreen } from "./titlescreen.js";
export class LevelScreen extends GameScreen {
    constructor() {
        super();
    }
    update() {
    }
    draw(gl) {
        gl.clearColor(1.0, 1.0, 1.0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    onClick(game, mouseInfo) {
        game.currentScreen = new TitleScreen();
    }
}
//# sourceMappingURL=levelscreen.js.map