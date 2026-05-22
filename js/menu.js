const menu = document.getElementById("menu");
const classicButton = document.getElementById("classicButton");
const survivalButton = document.getElementById("survivalButton");

let gameMode = "classic";

//modeclassic
classicButton.addEventListener("click", ()=> {

    gameMode = "classic";
    menu.style.display = "none";
    gameStarted = true;

} );

//modesurvival
survivalButton.addEventListener("click", ()=> {

    gameMode = "survival";
    menu.style.display = "none";
    gameStarted = true;

} );