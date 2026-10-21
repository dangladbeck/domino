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

var playerCount:number = 2;

const btnStart = document.getElementById("btnStart") as HTMLButtonElement;
btnStart.addEventListener("click", () => {
    titleScreen.hidden = true;
    newGameScreen.hidden = true;
    levelScreen.hidden = false;
    helpScreen.hidden = true;

    const players = document.querySelector('input[name=players]:checked') as HTMLInputElement;
    playerCount = Number(players.value);
    startGame();
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
var heapIndex:number = 7; // usado para controlar o monte
var gameState:number = 0; // start, on play, game over
var iaState:number = 0; // ready, done
var playerTurn:number;
var freeNum1:string;
var freeNum2:string;
var biggerIndex:number;
var firstTurn:boolean;


function startGame()
 {
    const txtPlayers = document.getElementById("playerCount") as HTMLParagraphElement;
    txtPlayers.textContent = playerCount + " Jogadores";

    let gamePieces = pieces.sort(() => Math.random() - 0.5);

    playerHand = gamePieces.slice(0, 7);   
    
    var aiDivs:HTMLDivElement[] = [];
    
    //Distribuem-se as pedras entre os jogadores
    // Primeiro para o jogador humano
    playerHand.forEach(element => {
        let pieceButton = document.createElement("button") as HTMLButtonElement;
        pieceButton.className = "piece";
        pieceButton.disabled = true;
        pieceButton.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>";
        pieceButton.addEventListener("click", choosePlayerPiece);
        divPlayerHand.appendChild(pieceButton);
    });

    // Depois para as IAs
    for (let n = 2; n <= playerCount; n++)
    {
        aiHand[n-2] = [];
        aiHand[n-2] = gamePieces.slice(7 * (n-1), 7 * n);
        aiDivs.push(document.getElementById("aiHand" + n) as HTMLDivElement);

        aiHand[n-2]!.forEach(element => {
            let pieceDiv = document.createElement("div") as HTMLDivElement;
            pieceDiv.className = "closed";
            pieceDiv.innerHTML = "<div class='half'>" + element[0] + "</div><div class='half'>" + element[1] + "</div>"; // OS NÚMEROS SERÃO EXCLUÍDOS
            aiDivs[n-2]!.appendChild(pieceDiv);
        });

        heapIndex += 7;
    }

    // As pedras restantes ficam para o monte (só com menos de 4 jogadores)
    if (playerCount < 4)
    {
        let pieceDiv = document.createElement("div") as HTMLDivElement;
        pieceDiv.className = "closed";
        pieceDiv.innerHTML = "<div class='half'>" + gamePieces[heapIndex]![0] + "</div><div class='half'>" + gamePieces[heapIndex]![1] + "</div>"; // OS NÚMEROS SERÃO EXCLUÍDOS
        divHeap.appendChild(pieceDiv); 
    }    

    // Quem começa a partida?
    // 1 - Quem tiver a maior peça dupla
    // 2 - Isso pode falhar em 0,29% das vezes. Neste caso, considera-se que o jogador humano começa.

    let biggerValue:number = -1;
    let biggerPlayer:number = 1;
    biggerIndex = 0; // guarda o índice da maior pedra para poder jogá-la
    for (let n = 0; n < playerHand.length; n++) // procura todas as cartas da mão
    {
        if (playerHand[n]![0] == playerHand[n]![1]) // se for uma dupla
        {
            if (playerHand[n]![0]! > biggerValue) // se for a maior dupla
            {
                biggerValue = playerHand[n]![0]!;
                biggerIndex = n + 1; // +1 porque a div tem um primeiro filho
            }
        }
    }
    for (let n = 0; n < aiHand.length; n++) // procura em todos os jogadores IA
    {
        for (let m = 0; m < aiHand[n]!.length; m++) // procura todas as cartas da mão
        {
            if (aiHand[n]![m]![0] == aiHand[n]![m]![1]) // se for uma dupla
            {
                if (aiHand[n]![m]![0]! > biggerValue) // se for a maior dupla
                {
                    biggerValue = aiHand[n]![m]![0]!;
                    biggerPlayer = n + 2; // guarda o jogador
                    biggerIndex = m + 1; // +1 porque a div tem um primeiro filho
                }
            }
        }
    }

    firstTurn = true;
    
    playerTurn = biggerPlayer;    
    txtStatus.textContent = "Vez do jogador " + playerTurn + ". Deve jogar a pedra " + biggerValue + " dupla." ;
    if (playerTurn == 1) // Vez do jogador humano: habilita o botão da pedra necessária para começar
    {       
        let firstPiece = divPlayerHand.children[biggerIndex] as HTMLButtonElement;
        firstPiece.disabled = false;
        btnNext.disabled = true;
        gameState = 1;
    }
    else // Vez de algum jogador IA
    {
        btnNext.disabled = false;        
    }
    
    btnNext.addEventListener("click", continueGame);
}

// O clique das pedras do jogador humano. Marca a pedra e tem que escolher local na mesa.
function choosePlayerPiece(event:MouseEvent)
{
    // marca a pedra na mão do jogador
    let piece:any = event.currentTarget;

    if (gameState == 1) // primeiro clique na pedra, marca-a como selecionada e mostra as opções na mesa
    {
        piece.classList.add("selected");
        gameState = 2;

        for (let i = 1; i < divPlayerHand.children.length; i++)
        {
            if (piece == divPlayerHand.children[i]) // guarda o índice na lista de pedras na mão
            {
                biggerIndex = i;
                break;
            }
        }

        var place:HTMLButtonElement;
        
        if (firstTurn) // só pode colocar no centro
        {
            place = document.createElement("button") as HTMLButtonElement;
            place.classList.add("place");
            place.addEventListener("click", setPlayerPiece);
            divTable.appendChild(place);
        }
        else // pode colocar em dois lados
        {
            if (piece.children[0]!.textContent == freeNum1 || piece.children[1]!.textContent == freeNum1) // se pode colocar na esquerda
            {
                place = document.createElement("button") as HTMLButtonElement;
                place.classList.add("place");
                place.addEventListener("click", setPlayerPiece);
                place.id = "p1";
                if (piece.children[0]!.textContent == freeNum1) // guarda o número que vai ficar livre
                {
                    place.setAttribute("data-free", piece.children[1]!.textContent);
                }
                else
                {
                    place.setAttribute("data-free", piece.children[0]!.textContent);
                }

                if (divTable.children[1]!.children[0]?.textContent == divTable.children[1]!.children[1]?.textContent) // se é uma pedra dupla
                {
                    place.classList.add("rotated");                    
                }
                divTable.insertBefore(place, divTable.children[1]!);
            }
            if (piece.children[0]!.textContent == freeNum2 || piece.children[1]!.textContent == freeNum2) // se pode colocar na direita
            {
                // Cria o segundo botão
                place = document.createElement("button") as HTMLButtonElement;
                place.classList.add("place");
                place.addEventListener("click", setPlayerPiece);
                place.id = "p2";
                if (piece.children[0]!.textContent == freeNum2) // guarda o número que vai ficar livre
                {
                    place.setAttribute("data-free", piece.children[1]!.textContent);
                }
                else
                {
                    place.setAttribute("data-free", piece.children[0]!.textContent);
                }

                if (divTable.children[divTable.children.length-1]!.children[0]?.textContent == divTable.children[divTable.children.length-1]!.children[1]?.textContent) // se é uma pedra dupla
                {
                    place.classList.add("rotated");
                }
                divTable.insertBefore(place, divTable.children[divTable.children.length-1]!);
            }
        }
    }
    else if (gameState == 2) // quando a pedra está selecionada, tira a seleção (de todas as pedras, porque podem ter outras selecionadas)
    {
        for (let i = 1; i < divPlayerHand.children.length; i++)
        {
            divPlayerHand.children[i]!.classList.remove("selected");
        }

        // Remove os botões da mesa (índices 1 ou último)
        if (divTable.children[1]!.classList.contains("place"))
        {
            divTable.removeChild(divTable.children[1]!);
        }
        if (divTable.children[divTable.children.length-1]!.classList.contains("place"))
        {
            divTable.removeChild(divTable.children[divTable.children.length-1]!);
        }

        gameState = 1;
    }
}

// O clique das possibilidades de jogada na mesa
function setPlayerPiece(e:MouseEvent)
{
    let piece = divPlayerHand.children[biggerIndex]!;    
    divPlayerHand.removeChild(piece!); // tira a pedra da mão do jogador

    let pieceDiv = document.createElement("div") as HTMLDivElement;
    pieceDiv.className = "open";
    pieceDiv.innerHTML = "<div class='half'>" + piece.children[0]!.textContent + "</div><div class='half'>" + piece.children[1]!.textContent + "</div>";
    if ((e.currentTarget as HTMLButtonElement).classList.contains("rotated"))
    {
        //pieceDiv.classList.add("rotated");
    }
    
    divTable.replaceChild(pieceDiv, e.currentTarget as HTMLButtonElement); // adiciona a pedra na mesa

    // Pode ter outro botão na mesa (índices 1 ou último)
    if (divTable.children[1]!.classList.contains("place"))
    {
        divTable.removeChild(divTable.children[1]!);
    }
    if (divTable.children[divTable.children.length-1]!.classList.contains("place"))
    {
        divTable.removeChild(divTable.children[divTable.children.length-1]!);
    }
    
    if (firstTurn)
    {
        freeNum1 = piece.children[0]!.textContent;
        freeNum2 = piece.children[1]!.textContent;
    }
    else
    {
        var btn:HTMLButtonElement = e.currentTarget as HTMLButtonElement;
        if (btn.id == "p1") // esquerda
        {
            freeNum1 = btn.getAttribute("data-free")!;
        }
        else if (btn.id == "p2") // direita
        {
            freeNum2 = btn.getAttribute("data-free")!;
        }
    }

    gameState = 3;
    playerTurn = 2;
    iaState = 0;
    txtStatus.textContent = "Pedra " + piece.children[0]!.textContent + " e " + piece.children[1]!.textContent + " colocada na mesa. Vez do jogador 2.";
    btnNext.disabled = false;
}

function firstAIDraw()
{
    /*let aiDiv = document.getElementById("aiHand" + gameState);
    let piece = aiDiv!.children[biggerIndex];
    
    let pieceDiv = document.createElement("div") as HTMLDivElement;
    pieceDiv.className = "open";
    pieceDiv.innerHTML = "<div class='half'>" + piece!.children[0]!.textContent + "</div><div class='half'>" + piece!.children[1]!.textContent + "</div>";
    divTable.appendChild(pieceDiv);

    aiDiv!.removeChild(piece!);
    txtStatus.textContent = "O jogador " + gameState + " começou com a pedra " + piece!.children[0]!.textContent + " e " + piece!.children[1]!.textContent + "."; 
    iaState = 1;

    btnNext.removeEventListener("click", firstAIDraw);
    btnNext.addEventListener("click", continueGame);*/
}


// O clique do botão Continuar, que realiza as ações da IA
function continueGame() 
{
    /*if (iaState == 0) // pronto para jogar, faz a jogada
    {
        let aiHand = document.getElementById("aiHand" + gameState) as HTMLDivElement;
        
        for (let n = 1; n < aiHand.children.length; n++)
        {
            let n1:string = aiHand.children[n]?.children[0]?.textContent;
            let n2:string = aiHand.children[n]?.children[1]?.textContent;

            if (n1 == freeNum1 || n1 == freeNum2 || n2 == freeNum1 || n2 == freeNum2)
            { // joga a primeira que encontra
                let piece = aiHand.children[n];
                
                let pieceDiv = document.createElement("div") as HTMLDivElement;
                pieceDiv.className = "open";
                pieceDiv.innerHTML = "<div class='half'>" + piece!.children[0]!.textContent + "</div><div class='half'>" + piece!.children[1]!.textContent + "</div>";
                divTable.appendChild(pieceDiv); // só coloca à direita

                aiHand.removeChild(piece!);
                txtStatus.textContent = "O jogador " + gameState + " colocou a pedra " + piece!.children[0]!.textContent + " e " + piece!.children[1]!.textContent + " do lado direito."; 
                iaState = 1;

                break;
            }
        }
    }
    else if (iaState == 1) // passa para o próximo jogador
    {
        gameState += 1;
        if (gameState > playerCount) gameState = 1;
        txtStatus.textContent = "Vez do jogador " + gameState + ".";
    }
        

    }*/
}