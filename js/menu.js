const menu = document.getElementById("menu");
const classicButton = document.getElementById("classicButton");
const survivalButton = document.getElementById("survivalButton");
const playerNameInput = document.getElementById("playerNameInput");
const instructionsButton = document.getElementById("instructionsButton");
const instructionsMenu = document.getElementById("instructionsMenu");
const closeInstructionsButton = document.getElementById("closeInstructionsButton");

let gameMode = "classic";

//modeclassic
classicButton.addEventListener("click", ()=> {

    gameMode = "classic";

    document.getElementById("gameTitle").innerText =
    "Smash as many cars as possible!";

    playerName =
    playerNameInput.value.trim();

        if(playerName === ""){

            playerName = "Anonymous";

        }
    menu.style.display = "none";
    countdown = 3;
    countdownActive = true;

    const countdownInterval = setInterval(()=>{

        countdown--;

        if(countdown < 0){

            clearInterval(countdownInterval);

            countdownActive = false;
            gameStarted = true;

            bgm.play();

        }

    }, 1000);

    if(window.loadLeaderboard){

        loadLeaderboard(gameMode);
        loadHistory();

    }

});

//modesurvival
survivalButton.addEventListener("click", ()=> {

    gameMode = "survival";

    document.getElementById("gameTitle").innerText =
    "Survive as long as possible!";
    
    playerName =
    playerNameInput.value.trim();

        if(playerName === ""){

            playerName = "Anonymous";

        }
    menu.style.display = "none";
    countdown = 3;
    countdownActive = true;

    const countdownInterval = setInterval(()=>{

        countdown--;

        if(countdown < 0){

            clearInterval(countdownInterval);

            countdownActive = false;
            gameStarted = true;

            bgm.play();

        }

    }, 1000);

    if(window.loadLeaderboard){

    loadLeaderboard(gameMode);

    loadHistory();

}

} );

const pauseMenu =
    document.getElementById("pauseMenu");

const resumeButton =
    document.getElementById("resumeButton");

const endGameButton =
    document.getElementById("endGameButton");

const gameOverMenu =
    document.getElementById("gameOverMenu");

const playAgainButton =
    document.getElementById("playAgainButton");

const homeButton =
    document.getElementById("homeButton");

    resumeButton.addEventListener("click", ()=>{

    paused = false;

    pauseMenu.style.display = "none";

});

endGameButton.addEventListener("click", ()=>{

    paused = false;

    gameOver = true;

    pauseMenu.style.display = "none";

});

playAgainButton.addEventListener("click", ()=>{

    restartGame();

});

homeButton.addEventListener("click", ()=>{

    location.reload();

});

instructionsButton.addEventListener("click", ()=>{

    instructionsMenu.style.display = "flex";

});

closeInstructionsButton.addEventListener("click", ()=>{

    instructionsMenu.style.display = "none";

});