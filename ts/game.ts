import type { GameScreen } from "./gamescreen.js";
import { TitleScreen } from "./titlescreen.js";

export class Game
{
    public canvas:HTMLCanvasElement;
    public context:WebGLRenderingContext;
    
    public currentScreen!:GameScreen;
    

    constructor(canvas:HTMLCanvasElement, ctx:WebGLRenderingContext)
    {
        this.canvas = canvas;
        this.context = ctx;

        // carrega assets
        this.currentScreen = new TitleScreen();
        canvas.addEventListener("click", this.onClick);

        this.run();
    }

    private run():void
    {
        setInterval(this.loop, 1000/60);
    }

    private loop = () =>
    {
        this.update();
        this.draw(this.context);
    }

    private update():void
    {
        this.currentScreen.update();
    }

    private draw(ctx:WebGLRenderingContext):void
    {
        this.currentScreen.draw(ctx);
    }

    private onClick = (cursorData:MouseEvent) =>
    {
        this.currentScreen.onClick(this, cursorData);
    }
}