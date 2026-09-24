import { Game } from "./game.js"

var game:Game;

window.onload = () =>
{
    var canvas = document.getElementById("canvas") as HTMLCanvasElement;
    var ctx = canvas.getContext("webgl")!;

    game = new Game(canvas, ctx);
}