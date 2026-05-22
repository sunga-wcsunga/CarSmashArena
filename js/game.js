const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let score = 0;
let timeLeft = 60;
let gameOver = false;
let gameStarted = false;
let combo = 0;
let comboTimer = 0;
let playerHealth = 100;
let survivalTime = 0;

setInterval(()=> {

    if(!gameOver) {

        if(comboTimer > 0) {

            comboTimer--;

        }

        else {

            combo = 0;

        }

        //mode:classic
        if(gameMode === "classic") {

            timeLeft--;

            if(timeLeft <= 0) {

                gameOver = true;

            }

        }

        //mode:survival
        else if(gameMode === "survival") {

            survivalTime++;

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
    checkEnemyCollisions();
    checkCollisions();
    drawPlayer();
    drawEnemies();
    drawBarriers();

    if(gameOver) {

        ctx.fillStyle = "white";

        ctx.textAlign = "center";

        ctx.font = "70px Arial";

        ctx.fillText(
            "GAME OVER",
            canvas.width / 2,
            280
        );

        ctx.font = "35px Arial";

        if(gameMode === "classic"){

            ctx.fillText(
                "Final Score: " + score,
                canvas.width / 2,
                340
            );

        }

        else if(gameMode === "survival"){

            ctx.fillText(
                "Score: " + score,
                canvas.width / 2,
                340
            );

            ctx.fillText(
                "Survived: " + survivalTime + "s",
                canvas.width / 2,
                390
            );

        }

    }

    ctx.textAlign = "left";

    document.getElementById("scoreText").innerText =
        "Score: " + score;

    document.getElementById("comboText").innerText =
        "Combo: " + combo;

    if(gameMode === "classic"){

        document.getElementById("timeText").innerText =
            "Time: " + timeLeft;

        document.getElementById("healthText").style.display =
            "none";

    }

    else if(gameMode === "survival"){

        document.getElementById("timeText").innerText =
            "Survival: " + survivalTime;

        document.getElementById("healthText").style.display =
            "block";

        document.getElementById("healthText").innerText =
           "Health: " + playerHealth;

    }

    requestAnimationFrame(gameLoop);

}



gameLoop();