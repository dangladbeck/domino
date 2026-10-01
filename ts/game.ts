const titleScreen = document.getElementById("titleScreen") as HTMLDivElement;
const newGameScreen = document.getElementById("newGameScreen") as HTMLDivElement;
const levelScreen = document.getElementById("levelScreen") as HTMLDivElement;
const helpScreen = document.getElementById("helpScreen") as HTMLDivElement;

/********************************************************************************/
// Tela de Título

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

const btnBack = document.getElementById("btnBack") as HTMLButtonElement;
btnBack.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});

/********************************************************************************/
// Tela Novo Jogo

const btnStart = document.getElementById("btnStart") as HTMLButtonElement;
btnStart.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = false;
    helpScreen.hidden = true;

    const players = document.querySelector('input[name=players]:checked') as HTMLInputElement;
    startGame(Number(players.value));
});

const btnBack2 = document.getElementById("btnBack2") as HTMLButtonElement;
btnBack2.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});

/********************************************************************************/
// Tela de Jogo

const pieces = [
    [0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6],
    [1,1], [1,2], [1,3], [1,4], [1,5], [1,6],
    [2,2], [2,3], [2,4], [2,5], [2,6],
    [3,3], [3,4], [3,5], [3,6],
    [4,4], [4,5], [4,6],
    [5,5], [5,6],
    [6,6]
];

var playerHand:number[][];
var aiHand:number[][][];

function startGame(playerCount:number) {
    const txtPlayers = document.getElementById("playerCount") as HTMLParagraphElement;
    txtPlayers.textContent = playerCount + " Jogadores";

    let gamePieces = pieces.sort(() => Math.random() - 0.5);

    playerHand = gamePieces.slice(0, 7);
    const divPlayerHand = document.getElementById("playerHand") as HTMLDivElement;
    
    playerHand.forEach(element => {
        let pieceButton = document.createElement("button") as HTMLButtonElement;
        pieceButton.className = "piece";
        pieceButton.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
        divPlayerHand.appendChild(pieceButton);
    });

    for (let n = 2; n <= playerCount; n++)
    {
        //aiHand[n-2] = [][];
    }

    

    //<button class="piece"><div class="half">1</div><div class="half">2</div></button>
}