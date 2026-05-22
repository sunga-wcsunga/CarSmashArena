const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let timeLeft = 60;
let gameOver = false;
let gameStarted = false;
let combo = 0;
let comboTimer = 0;

setInterval(()=> {

    if(!gameOver) {

        if(comboTimer > 0) {

            comboTimer--;

        }

        else {

            combo = 0;

        }

        timeLeft--;

        if(timeLeft <= 0) {

            gameOver = true;

        }

    }

} ,1000);

//loop
function gameLoop() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    if(!gameStarted) {

        requestAnimationFrame(gameLoop);
        return;

    }

    movePlayer();
    checkBarrierCollision();
    moveEnemies();
    checkCollisions();
    drawPlayer();
    drawEnemies();
    drawBarriers();

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 20, 40);
    ctx.fillText("Time: " + timeLeft, 20, 80);
    ctx.fillText("Combo: " + combo, 20, 120);

    if(gameOver) {

        ctx.fillStyle = "white";
        ctx.font = "60px Arial";

        ctx.fillText(

            "GAME OVER",
            300,
            300
        );

    }

    requestAnimationFrame(gameLoop);
}

gameLoop();