const titleScreen = document.getElementById("titleScreen");
const newGameScreen = document.getElementById("newGameScreen");
const levelScreen = document.getElementById("levelScreen");
const helpScreen = document.getElementById("helpScreen");
/********************************************************************************/
// Tela de Título
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
const btnBack = document.getElementById("btnBack");
btnBack.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});
/********************************************************************************/
// Tela Novo Jogo
var playerCount = 2;
const btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = false;
    helpScreen.hidden = true;
    const players = document.querySelector('input[name=players]:checked');
    playerCount = Number(players.value);
    startGame();
});
const btnBack2 = document.getElementById("btnBack2");
btnBack2.addEventListener("click", () => {
    titleScreen.hidden = false;
    newGameScreen.hidden = true;
    levelScreen.hidden = true;
    helpScreen.hidden = true;
});
/********************************************************************************/
// Tela de Jogo
const divPlayerHand = document.getElementById("playerHand");
const divHeap = document.getElementById("heap");
const divTable = document.getElementById("table");
const txtStatus = document.getElementById("txtstatus");
const btnNext = document.getElementById("btnNext");
const pieces = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6],
    [1, 1], [1, 2], [1, 3], [1, 4], [1, 5], [1, 6],
    [2, 2], [2, 3], [2, 4], [2, 5], [2, 6],
    [3, 3], [3, 4], [3, 5], [3, 6],
    [4, 4], [4, 5], [4, 6],
    [5, 5], [5, 6],
    [6, 6]
];
var playerHand;
var aiHand = [];
var heapIndex = 7;
var gameState = 0; // start, player X turn, game over
var iaState = 0;
var freeNum1;
var freeNum2;
var biggerIndex;
function startGame() {
    const txtPlayers = document.getElementById("playerCount");
    txtPlayers.textContent = playerCount + " Jogadores";
    let gamePieces = pieces.sort(() => Math.random() - 0.5);
    playerHand = gamePieces.slice(0, 7);
    var aiDivs = [];
    //Distribuem-se as pedras entre os jogadores
    playerHand.forEach(element => {
        let pieceButton = document.createElement("button");
        pieceButton.className = "piece";
        pieceButton.disabled = true;
        pieceButton.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
        pieceButton.addEventListener("click", playerSetPiece);
        divPlayerHand.appendChild(pieceButton);
    });
    for (let n = 2; n <= playerCount; n++) {
        aiHand[n - 2] = [];
        aiHand[n - 2] = gamePieces.slice(7 * (n - 1), 7 * n);
        aiDivs.push(document.getElementById("aiHand" + n));
        aiHand[n - 2].forEach(element => {
            let pieceDiv = document.createElement("div");
            pieceDiv.className = "closed";
            pieceDiv.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
            aiDivs[n - 2].appendChild(pieceDiv);
        });
        heapIndex += 7;
    }
    // As pedras restantes ficam para o monte (só com menos de 4 jogadores)
    if (playerCount < 4) {
        let pieceDiv = document.createElement("div");
        pieceDiv.className = "closed";
        pieceDiv.innerHTML = "<div class='half'>" + gamePieces[heapIndex][0] + "</div><div class='half'>" + gamePieces[heapIndex][1] + "</div>";
        divHeap.appendChild(pieceDiv);
    }
    // Quem começa a partida?
    // 1 - Quem tiver a maior peça dupla
    // 2 - Isso pode falhar em 0,29% das vezes. Neste caso, considera-se que o jogador humano começa.
    let biggerValue = -1;
    let biggerPlayer = 1;
    biggerIndex = 0;
    for (let n = 0; n < playerHand.length; n++) {
        if (playerHand[n][0] == playerHand[n][1]) {
            if (playerHand[n][0] > biggerValue) {
                biggerValue = playerHand[n][0];
                biggerIndex = n + 1; // porque a div tem um primeiro filho
            }
        }
    }
    for (let n = 0; n < aiHand.length; n++) {
        for (let m = 0; m < aiHand[n].length; m++) {
            if (aiHand[n][m][0] == aiHand[n][m][1]) {
                if (aiHand[n][m][0] > biggerValue) {
                    biggerValue = aiHand[n][m][0];
                    biggerPlayer = n + 2;
                    biggerIndex = m + 1; // porque a div tem um primeiro filho
                }
            }
        }
    }
    gameState = biggerPlayer;
    txtStatus.textContent = "Vez do jogador " + gameState + ". Deve jogar a pedra " + biggerValue + " dupla.";
    if (gameState == 1) // Vez do jogador humano: habilita o botão da pedra necessária para começar
     {
        let firstPiece = divPlayerHand.children[biggerIndex];
        firstPiece.disabled = false;
        btnNext.disabled = true;
    }
    else // Vez de algum jogador IA
     {
        btnNext.disabled = false;
        btnNext.addEventListener("click", firstAIDraw);
    }
}
// O clique das pedras do jogador humano. Retira da mão e coloca na mesa.
function playerSetPiece(event) {
    // remove a pedra da mão do jogador
    let piece = event.currentTarget;
    divPlayerHand.removeChild(piece);
    // adiciona a pedra na mesa
    let pieceDiv = document.createElement("div");
    pieceDiv.className = "open";
    pieceDiv.innerHTML = "<div class='half'>" + piece.children[0].textContent + "</div><div class='half'>" + piece.children[1].textContent + "</div>";
    divTable.appendChild(pieceDiv);
    freeNum1 = piece.children[0].textContent;
    freeNum2 = piece.children[1].textContent;
    // passa a vez para o próximo jogador
    gameState = 2;
    iaState = 0;
    txtStatus.textContent = "Vez do jogador 2.";
    btnNext.addEventListener("click", continueGame);
}
function firstAIDraw() {
    let aiDiv = document.getElementById("aiHand" + gameState);
    let piece = aiDiv.children[biggerIndex];
    let pieceDiv = document.createElement("div");
    pieceDiv.className = "open";
    pieceDiv.innerHTML = "<div class='half'>" + piece.children[0].textContent + "</div><div class='half'>" + piece.children[1].textContent + "</div>";
    divTable.appendChild(pieceDiv);
    aiDiv.removeChild(piece);
    txtStatus.textContent = "O jogador " + gameState + " começou com a pedra " + piece.children[0].textContent + " e " + piece.children[1].textContent + ".";
    iaState = 1;
    btnNext.removeEventListener("click", firstAIDraw);
    btnNext.addEventListener("click", continueGame);
}
// O clique do botão Continuar, que realiza as ações da IA
function continueGame() {
    var _a, _b, _c, _d;
    if (iaState == 0) // pronto para jogar, faz a jogada
     {
        let aiHand = document.getElementById("aiHand" + gameState);
        for (let n = 1; n < aiHand.children.length; n++) {
            let n1 = (_b = (_a = aiHand.children[n]) === null || _a === void 0 ? void 0 : _a.children[0]) === null || _b === void 0 ? void 0 : _b.textContent;
            let n2 = (_d = (_c = aiHand.children[n]) === null || _c === void 0 ? void 0 : _c.children[1]) === null || _d === void 0 ? void 0 : _d.textContent;
            if (n1 == freeNum1 || n1 == freeNum2 || n2 == freeNum1 || n2 == freeNum2) { // joga a primeira que encontra
                let piece = aiHand.children[n];
                let pieceDiv = document.createElement("div");
                pieceDiv.className = "open";
                pieceDiv.innerHTML = "<div class='half'>" + piece.children[0].textContent + "</div><div class='half'>" + piece.children[1].textContent + "</div>";
                divTable.appendChild(pieceDiv); // só coloca à direita
                aiHand.removeChild(piece);
                txtStatus.textContent = "O jogador " + gameState + " colocou a pedra " + piece.children[0].textContent + " e " + piece.children[1].textContent + " do lado direito.";
                iaState = 1;
                break;
            }
        }
    }
    else if (iaState == 1) // passa para o próximo jogador
     {
        gameState += 1;
        if (gameState > playerCount)
            gameState = 1;
        txtStatus.textContent = "Vez do jogador " + gameState + ".";
    }
}
export {};
//# sourceMappingURL=game.js.map