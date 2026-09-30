const titleScreen = document.getElementById("titleScreen");
const newGameScreen = document.getElementById("newGameScreen");
const levelScreen = document.getElementById("levelScreen");
const helpScreen = document.getElementById("helpScreen");
const btnPlay = document.getElementById("btnPlay");
btnPlay.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = false;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});
const btnHelp = document.getElementById("btnHelp");
btnHelp.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = false;
});
const btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = false;
    helpScreen.hidden = true;
    const players = document.querySelector('input[name=players]:checked');
    startGame(Number(players.value));
});
const btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});
const btnBack2 = document.getElementById("btnBack2");
btnBack2.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});
function startGame(playerCount) {
    const txtPlayers = document.getElementById("playerCount");
    txtPlayers.textContent = playerCount + " Jogadores";
}
export {};
//# sourceMappingURL=game.js.map