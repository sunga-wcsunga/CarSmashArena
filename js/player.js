const playerImage = new Image();
playerImage.src = "assets/player.png";

let player = {

    x: 450,
    y: 250,

    width: 70,
    height: 100,

    velocityX: 0,
    velocityY: 0,

    moveSpeed: 4,
    angle: 0,
    turnSpeed: 0.05,

    color: "cyan"

};

function movePlayer() {

    if(gameOver) {

        return;

    }

    //leftturn
    if(keys["a"] || keys["ArrowLeft"]) {

        player.angle -= player.turnSpeed;

    }

    //rightturn
    if(keys["d"] || keys["ArrowRight"]) {

        player.angle += player.turnSpeed;

    }

    //forward
    if(keys["w"] || keys["ArrowUp"]) {

        player.velocityX = Math.cos(player.angle) * player.moveSpeed;
        player.velocityY = Math.sin(player.angle) * player.moveSpeed;

    }

    if(keys["ArrowDown"] || keys["s"]){

        player.velocityX =
            -Math.cos(player.angle) * player.moveSpeed * 0.5;

        player.velocityY =
            -Math.sin(player.angle) * player.moveSpeed * 0.5;

    }

    else {

        //slowdown
        player.velocityX *= 0.90;
        player.velocityY *= 0.90;

    }

    //saveoldposition
    player.oldX = player.x;
    player.oldY = player.y;

    //movement
    player.x += player.velocityX;
    player.y += player.velocityY;

    //outerwalls
    if(player.x < 0) {

        player.x = 0;
        player.velocityX = 0;

    }

    if(player.y < 0) {

        player.y = 0;
        player.velocityY = 0;

    }

    if(player.x + player.width > canvas.width) {

        player.x = canvas.width - player.width;
        player.velocityX = 0;

    }

    if(player.y + player.height > canvas.height) {

        player.y = canvas.height - player.height;
        player.velocityY = 0;

    }

}

function drawPlayer(){

    ctx.save();

    ctx.translate(
        player.x + player.width / 2,
        player.y + player.height / 2
    );

    ctx.rotate(player.angle + Math.PI / 2);

    ctx.drawImage(
        playerImage,
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
    );

    ctx.restore();

}