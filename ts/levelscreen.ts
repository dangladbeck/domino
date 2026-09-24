import type { Game } from "./game.js";
import { GameScreen } from "./gamescreen.js";
import { TitleScreen } from "./titlescreen.js";

export class LevelScreen extends GameScreen
{
    constructor()
    {
        super();
    }

    public update():void
    {
        
    }

    public draw(gl: WebGLRenderingContext):void
    {
        gl.clearColor(1.0, 1.0, 1.0, 1);
        gl.clear(gl.COLOR_BUFFER_BIT);
    }

    public onClick(game:Game, mouseInfo:MouseEvent):void
    {
        game.currentScreen = new TitleScreen();
    }
}