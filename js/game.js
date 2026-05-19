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

// KEYBOARD INPUT
let keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

//movement
function movePlayer(){

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

    // WALL COLLISION
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

    enemies.forEach(enemy => {

        enemy.x += enemy.speedX;
        enemy.y += enemy.speedY;

        // BOUNCE WALLS
        if(enemy.x <= 0 || enemy.x + enemy.width >= canvas.width){
            enemy.speedX *= -1;
        }

        if(enemy.y <= 0 || enemy.y + enemy.height >= canvas.height){
            enemy.speedY *= -1;
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

    drawPlayer();

    drawEnemies();

    requestAnimationFrame(gameLoop);
}

gameLoop();