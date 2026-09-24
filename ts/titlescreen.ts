import type { Game } from "./game.js";
import { GameScreen } from "./gamescreen.js";
import { LevelScreen } from "./levelscreen.js";

export class TitleScreen extends GameScreen
{
    constructor()
    {
        super();
    }

    public update():void
    {

    }

    public draw(gl:WebGLRenderingContext):void
    {
        gl.clearColor(0.1, 0.1, 0.1, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    public onClick(game:Game, mouseInfo:MouseEvent):void
    {
        game.currentScreen = new LevelScreen();
    }
}