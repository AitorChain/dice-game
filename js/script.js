var roundScore, globalScores, gamePlaying, activePlayer;
var newGameButton = document.getElementById("new-game-button");
var rollButton = document.getElementById("roll-button");
var holdButton = document.getElementById("hold-button");
var lostTurn = document.getElementById("lost-turn");
var diceDOM = document.querySelector(".dice");

newGameButton.addEventListener("click", start);
lostTurn.style.display = "none";
document.querySelector(".game-body").style.background = "linear-gradient(90deg, white 50%, rgb(229 229 229) 50%)";

function start() {

    if (typeof activePlayer === "number") {
        document.getElementById(`name-${activePlayer}`).innerText =  `Player ${activePlayer + 1}`;        
        changeTurn();
    } else {
        activePlayer = 0;
    }

    rollButton.addEventListener("click", rollDice);
    holdButton.addEventListener("click", hold);
    globalScores= [0,0];
    roundScore = 0;
    gamePlaying = true;
    diceDOM.src = "css/media/dice-random.png";
    setActive(activePlayer);
    document.getElementById("round-0").innerText = 0;
    document.getElementById("round-1").innerText = 0;
    globalScores[0] = document.getElementById("global-0");
    globalScores[1] = document.getElementById("global-1");
    globalScores[0].innerText = 0;
    globalScores[1].innerText = 0;
}

function setActive(activePlayer) {
    switch(activePlayer) {
        case 0:
            document.getElementById("name-1").classList.remove("red-ball");
            document.getElementById("user-1").classList.remove("active");
            document.getElementById("user-0").classList.add("active");
            document.getElementById("name-0").classList.add("red-ball");
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, white 50%, rgb(229 229 229) 50%)";
            break;
        case 1:
            document.getElementById("name-0").classList.remove("red-ball");
            document.getElementById("user-0").classList.remove("active"); 
            document.getElementById("user-1").classList.add("active");
            document.getElementById("name-1").classList.add("red-ball");
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, rgb(229 229 229) 50%, white 50%)";
            break;
        default:
            document.getElementById("name-1").classList.remove("red-ball");
            document.getElementById("user-1").classList.remove("active");
            document.getElementById("user-0").classList.add("active");
            document.getElementById("name-0").classList.add("red-ball");
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, white 50%, rgb(229 229 229) 50%)";
    }
}

function setWinner(activePlayer) {
    switch(activePlayer) {
        case 0:
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, #c2f5c6 50%, rgb(255 192 192) 50%)";
            break;
        case 1:
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, rgb(255 192 192) 50%, #c2f5c6 50%";
            break;
        default:
            document.querySelector(".game-body").style.background = "linear-gradient(90deg, white 50%, rgb(229 229 229) 50%)";
    }
}

function blockButtons() {
    newGameButton.setAttribute("disabled", "disabled");
    rollButton.setAttribute("disabled", "disabled");
    holdButton.setAttribute("disabled", "disabled");
}

function unblockButtons() {
    newGameButton.removeAttribute("disabled", "disabled");
    rollButton.removeAttribute("disabled", "disabled");
    holdButton.removeAttribute("disabled", "disabled");
}

function changeTurn() {
    lostTurn.style.display = "none";
    if (activePlayer === 0) {
        activePlayer = 1;
        setActive(activePlayer);
    } else {
        activePlayer = 0;
        setActive(activePlayer);
    }
}

function rollDice() {
    if (gamePlaying) {            
        diceDOM.src = "css/media/random.gif";
        blockButtons();

        setTimeout(() => {
            randomDice = Math.ceil(Math.random() * 6);
            diceDOM.src = `css/media/dice-${randomDice}.png`;
            if(randomDice === 1) {
                roundScore = 0;            
                lostTurn.style.display = "block"
                setTimeout(() => {
                    document.getElementById(`round-${activePlayer}`).innerText = roundScore;
                    changeTurn();
                    unblockButtons();
                }, 1200)
            } else {
                roundScore += randomDice;
                document.getElementById(`round-${activePlayer}`).innerText = roundScore;
                unblockButtons();
            }
        }, 1500);          
    }
}

function hold() {
    if (gamePlaying && roundScore > 0) {
        globalScores[activePlayer].innerText = parseInt(globalScores[activePlayer].innerText) + parseInt(roundScore);
        roundScore = 0;
        document.getElementById(`round-${activePlayer}`).innerText = 0;

        if (globalScores[activePlayer].innerText >= 100) {
            setWinner(activePlayer);        
            document.getElementById(`name-${activePlayer}`).innerText = "Winner!";
            gamePlaying = false;
        } else {
            changeTurn();
        }
    }
}
