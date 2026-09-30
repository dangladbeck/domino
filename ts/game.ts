const titleScreen = document.getElementById("titleScreen") as HTMLDivElement;
const newGameScreen = document.getElementById("newGameScreen") as HTMLDivElement;
const levelScreen = document.getElementById("levelScreen") as HTMLDivElement;
const helpScreen = document.getElementById("helpScreen") as HTMLDivElement;

const btnPlay = document.getElementById("btnPlay") as HTMLButtonElement;
btnPlay.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = false;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});

const btnHelp = document.getElementById("btnHelp") as HTMLButtonElement;
btnHelp.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = false;
});

const btnStart = document.getElementById("btnStart") as HTMLButtonElement;
btnStart.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = false;
    helpScreen.hidden = true;

    const players = document.querySelector('input[name=players]:checked') as HTMLInputElement;
    startGame(Number(players.value));
});



const btnBack = document.getElementById("btnBack") as HTMLButtonElement;
btnBack.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});

const btnBack2 = document.getElementById("btnBack2") as HTMLButtonElement;
btnBack2.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});

function startGame(playerCount:number) {
    const txtPlayers = document.getElementById("playerCount") as HTMLParagraphElement;
    txtPlayers.textContent = playerCount + " Jogadores";
}