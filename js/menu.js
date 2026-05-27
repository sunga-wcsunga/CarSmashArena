const menu = document.getElementById("menu");
const classicButton = document.getElementById("classicButton");
const survivalButton = document.getElementById("survivalButton");
const playerNameInput = document.getElementById("playerNameInput");

let gameMode = "classic";

//modeclassic
classicButton.addEventListener("click", ()=> {

    gameMode = "classic";
    playerName = playerNameInput.value;
    menu.style.display = "none";
    gameStarted = true;

} );

//modesurvival
survivalButton.addEventListener("click", ()=> {

    gameMode = "survival";
    playerName = playerNameInput.value;
    menu.style.display = "none";
    gameStarted = true;

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

    location.reload();

});

homeButton.addEventListener("click", ()=>{

    location.reload();

});