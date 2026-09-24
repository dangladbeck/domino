import { TitleScreen } from "./titlescreen.js";
export class Game {
    constructor(canvas, ctx) {
        this.loop = () => {
            this.update();
            this.draw(this.context);
        };
        this.onClick = (cursorData) => {
            this.currentScreen.onClick(this, cursorData);
        };
        this.canvas = canvas;
        this.context = ctx;
        // carrega assets
        this.currentScreen = new TitleScreen();
        canvas.addEventListener("click", this.onClick);
        this.run();
    }
    run() {
        setInterval(this.loop, 1000 / 60);
    }
    update() {
        this.currentScreen.update();
    }
    draw(ctx) {
        this.currentScreen.draw(ctx);
    }
}
//# sourceMappingURL=game.js.map