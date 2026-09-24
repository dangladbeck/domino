import { Game } from "./game.js";
var game;
window.onload = () => {
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("webgl");
    game = new Game(canvas, ctx);
};
//# sourceMappingURL=start.js.map