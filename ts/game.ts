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

const divPlayerHand = document.getElementById("playerHand") as HTMLDivElement;
const divHeap = document.getElementById("heap") as HTMLDivElement;
const divTable = document.getElementById("table") as HTMLDivElement;
const txtStatus = document.getElementById("txtstatus") as HTMLParagraphElement;
const btnNext = document.getElementById("btnNext") as HTMLButtonElement;

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
var aiHand:number[][][] = [];
var heapIndex:number = 7;
var gameState:number = 0; // start, player X turn, game over



function startGame(playerCount:number) {
    const txtPlayers = document.getElementById("playerCount") as HTMLParagraphElement;
    txtPlayers.textContent = playerCount + " Jogadores";

    let gamePieces = pieces.sort(() => Math.random() - 0.5);

    playerHand = gamePieces.slice(0, 7);   
    
    var aiDivs:HTMLDivElement[] = [];
    
    //Distribuem-se as pedras entre os jogadores

    playerHand.forEach(element => {
        let pieceButton = document.createElement("button") as HTMLButtonElement;
        pieceButton.className = "piece";
        pieceButton.disabled = true;
        pieceButton.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
        pieceButton.addEventListener("click", playerSetPiece);
        divPlayerHand.appendChild(pieceButton);
    });


    for (let n = 2; n <= playerCount; n++)
    {
        aiHand[n-2] = [];
        aiHand[n-2] = gamePieces.slice(7 * (n-1), 7 * n);
        aiDivs.push(document.getElementById("aiHand" + n) as HTMLDivElement);

        aiHand[n-2]!.forEach(element => {
            let pieceDiv = document.createElement("div") as HTMLDivElement;
            pieceDiv.className = "closed";
            pieceDiv.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
            aiDivs[n-2]!.appendChild(pieceDiv);
        });

        heapIndex += 7;
    }

    // As pedras restantes ficam para o monte (só com menos de 4 jogadores)
    if (playerCount < 4)
    {
        let pieceDiv = document.createElement("div") as HTMLDivElement;
        pieceDiv.className = "closed";
        pieceDiv.innerHTML = "<div class='half'>" + gamePieces[heapIndex]![0] + "</div><div class='half'>" + gamePieces[heapIndex]![1] + "</div>";
        divHeap.appendChild(pieceDiv);
    }    

    // Quem começa a partida?
    // 1 - Quem tiver a maior peça dupla
    // 2 - Isso pode falhar em 0,29% das vezes. Neste caso, considera-se que o jogador humano começa.

    let biggerValue:number = -1;
    let biggerPlayer:number = 1;
    let biggerIndex:number = 0;
    for (let n = 0; n < playerHand.length; n++)
    {
        if (playerHand[n]![0] == playerHand[n]![1])
        {
            if (playerHand[n]![0]! > biggerValue)
            {
                biggerValue = playerHand[n]![0]!;
                biggerIndex = n + 1; // porque a div tem um primeiro filho
            }
        }
    }
    for (let n = 0; n < aiHand.length; n++)
    {
        for (let m = 0; m < aiHand[n]!.length; m++)
        {
            if (aiHand[n]![m]![0] == aiHand[n]![m]![1])
            {
                if (aiHand[n]![m]![0]! > biggerValue)
                {
                    biggerValue = aiHand[n]![m]![0]!;
                    biggerPlayer = n + 2;
                    biggerIndex = m + 1; // porque a div tem um primeiro filho
                }
            }
        }
    }

    gameState = biggerPlayer;    
    txtStatus.textContent = "Vez do jogador " + gameState + ". Deve jogar a pedra " + biggerValue + " dupla." ;
    if (gameState == 1) // Vez do jogador humano: habilita o botão da pedra necessária para começar
    {        
        let firstPiece = divPlayerHand.children[biggerIndex] as HTMLButtonElement;
        firstPiece.disabled = false;
        btnNext.disabled = true;
    }
    else // Vez de algum jogador IA
    {
        btnNext.disabled = false;
        btnNext.addEventListener("click", () => {
            let aiDiv = document.getElementById("aiHand" + gameState);
            let piece = aiDiv!.children[biggerIndex];
            
            let pieceDiv = document.createElement("div") as HTMLDivElement;
            pieceDiv.className = "open";
            pieceDiv.innerHTML = "<div class='half'>" + piece!.children[0]!.textContent + "</div><div class='half'>" + piece!.children[1]!.textContent + "</div>";
            divTable.appendChild(pieceDiv);

            aiDiv!.removeChild(piece!);
            txtStatus.textContent = "";
        });
    }
    
}

function playerSetPiece(event:MouseEvent)
{
    let piece = event.currentTarget;
    divPlayerHand.removeChild(piece);
    
    let pieceDiv = document.createElement("div") as HTMLDivElement;
    pieceDiv.className = "open";
    pieceDiv.innerHTML = "<div class='half'>" + piece!.children[0].textContent + "</div><div class='half'>" + piece!.children[1].textContent + "</div>";
    
    divTable.appendChild(pieceDiv);   
    
    txtStatus.textContent = "";
}

function continueGame() 
{
    
}