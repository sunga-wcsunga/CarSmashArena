const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//player
let player = {
    x: 450,
    y: 250,
    width: 50,
    height: 80,
    speed: 5,
    color: "cyan"
};

//kalaban
let enemies = [];
let score = 0;
let timeLeft = 60;
let gameOver = false;

function createEnemies(){

    for(let i = 0; i < 5; i++){

        enemies.push({

            x: Math.random() * 900,
            y: Math.random() * 500,

            width: 50,
            height: 80,

            speedX: (Math.random() * 4) - 2,
            speedY: (Math.random() * 4) - 2,

            color: "red"
        });
    }
}

//kalabanjapon
createEnemies();

setInterval(()=>{

    if(!gameOver){

        timeLeft--;

        if(timeLeft <= 0){
            gameOver = true;
        }

    }

},1000);

let keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

//movement
function movePlayer(){

    if(gameOver){
        return;
    }

    if(keys["w"] || keys["ArrowUp"]){
        player.y -= player.speed;
    }

    if(keys["s"] || keys["ArrowDown"]){
        player.y += player.speed;
    }

    if(keys["a"] || keys["ArrowLeft"]){
        player.x -= player.speed;
    }

    if(keys["d"] || keys["ArrowRight"]){
        player.x += player.speed;
    }

    //smashin
    if(player.x < 0){
        player.x = 0;
    }

    if(player.y < 0){
        player.y = 0;
    }

    if(player.x + player.width > canvas.width){
        player.x = canvas.width - player.width;
    }

    if(player.y + player.height > canvas.height){
        player.y = canvas.height - player.height;
    }
}

//sakalaban
function moveEnemies(){

    if(gameOver){
        return;
    }
    
    enemies.forEach(enemy => {

        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;

        //wallbounce
        if(enemy.x <= 0 || enemy.x + enemy.width >= canvas.width){
            enemy.speedX *= -1;
        }

        if(enemy.y <= 0 || enemy.y + enemy.height >= canvas.height){
            enemy.speedY *= -1;
        }
    });
}

function checkCollisions(){

    enemies.forEach(enemy => {

        if(
            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        ){

            //addscore
            score += 10;

            // RANDOM PUSH EFFECT
            enemy.x = Math.random() * 900;
            enemy.y = Math.random() * 500;

            //crashcolor
            player.color = "yellow";

            setTimeout(()=>{
                player.color = "cyan";
            },100);
        }

    });

}


//player
function drawPlayer(){

    ctx.fillStyle = player.color;

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

//kalaban
function drawEnemies(){

    enemies.forEach(enemy => {

        ctx.fillStyle = enemy.color;

        ctx.fillRect(
            enemy.x,
            enemy.y,
            enemy.width,
            enemy.height
        );
    });
}

//loop
function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    movePlayer();

    moveEnemies();

    checkCollisions();

    drawPlayer();

    drawEnemies();

    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText("Score: " + score, 20, 40);
    ctx.fillText("Time: " + timeLeft, 20, 80);

    if(gameOver){

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