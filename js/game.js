const arenaImage = new Image();
arenaImage.src = "assets/arena.png";
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
let paused = false;
let playerName = "";
let scoreSaved = false;
let screenShake = 0;

setInterval(()=> {

    if(!gameOver && !paused) {

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

function drawArena(){

    ctx.drawImage(
    arenaImage,
    0,
    0,
    canvas.width,
    canvas.height
);

    //arenaborderglow
    ctx.strokeStyle = "cyan";
    ctx.lineWidth = 6;
    ctx.strokeRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

}

//loop
async function gameLoop() {

    drawArena();

    ctx.save();

    if(screenShake > 0){

        const shakeX =
            (Math.random() - 0.5) * screenShake;

        const shakeY =
            (Math.random() - 0.5) * screenShake;

        ctx.translate(shakeX, shakeY);

        screenShake *= 0.9;

        if(screenShake < 0.5){

            screenShake = 0;

        }

    }



    if(!gameStarted) {

        document.getElementById("gameOverMenu")
        .style.display = "none";

        requestAnimationFrame(gameLoop);
        return;

    }

    if(paused){

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

         document.getElementById("gameOverMenu")
        .style.display = "flex";

        document.getElementById("finalScoreText")
        .innerText = "Score: " + score;

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

        if(!scoreSaved){

            await saveScore(playerName, score, gameMode);

            if(window.loadLeaderboard){

                await loadLeaderboard(gameMode);

            }
            scoreSaved = true;

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
    
    ctx.restore();
    
    requestAnimationFrame(gameLoop);

}



gameLoop();
