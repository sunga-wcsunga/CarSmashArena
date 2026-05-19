const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player = {
    x: 450,
    y: 250,
    width: 50,
    height: 80,
    speed: 5
};

let keys = {};

document.addEventListener("keydown", (e)=>{
    keys[e.key] = true;
});

document.addEventListener("keyup", (e)=>{
    keys[e.key] = false;
});

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
}

function drawPlayer(){

    ctx.fillStyle = "cyan";

    ctx.fillRect(
        player.x,
        player.y,
        player.width,
        player.height
    );
}

function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    movePlayer();

    drawPlayer();

    requestAnimationFrame(gameLoop);
}

gameLoop();