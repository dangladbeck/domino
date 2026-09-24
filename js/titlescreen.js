import { GameScreen } from "./gamescreen.js";
import { LevelScreen } from "./levelscreen.js";
export class TitleScreen extends GameScreen {
    constructor() {
        super();
    }
    update() {
    }
    draw(gl) {
        gl.clearColor(0.1, 0.1, 0.1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }
    onClick(game, mouseInfo) {
        game.currentScreen = new LevelScreen();
    }
}
//# sourceMappingURL=titlescreen.js.map