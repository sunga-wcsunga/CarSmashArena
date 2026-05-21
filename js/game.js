const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

//player
let player = {

    x: 450,
    y: 250,
    width: 50,
    height: 80,
    speed: 0,
    maxSpeed: 6,
    acceleration: 0.2,
    friction: 0.96,
    angle: 0,
    turnSpeed: 0.05,
    avoidTimer: 0,
    avoidAngle: 0,
    color: "cyan"
};

//kalaban
let enemies = [];
let score = 0;
let timeLeft = 60;
let gameOver = false;
let combo = 0;
let comboTimer = 0;

let barriers = [

    {
        x: 300,
        y: 150,
        width: 200,
        height: 40
    },

    {
        x: 100,
        y: 350,
        width: 40,
        height: 180
    },

    {
        x: 700,
        y: 250,
        width: 150,
        height: 40
    }

];

function createEnemies(){

    

    for(let i = 0; i < 5; i++){

        enemies.push({

            x: Math.random() * 900,
            y: Math.random() * 500,

            width: 50,
            height: 80,

           speed: 2 + Math.random() * 2,

            angle: Math.random() * Math.PI * 2,
            turnSpeed: 0.05,

            color: "red"
        });
    }
}

//kalabanjapon
createEnemies();

setInterval(()=>{

    if(!gameOver){

        if(comboTimer > 0){
            comboTimer--;
        }
        else{
            combo = 0;
        }

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

    //forward
    if(keys["w"] || keys["ArrowUp"]){
        player.speed += player.acceleration;
    }

    //backward
    if(keys["s"] || keys["ArrowDown"]){
        player.speed -= player.acceleration;
    }

    //speedlimit
    if(player.speed > player.maxSpeed){
        player.speed = player.maxSpeed;
    }

    if(player.speed < -player.maxSpeed / 2){
        player.speed = -player.maxSpeed / 2;
    }

    //leftturn
    if(keys["a"] || keys["ArrowLeft"]){
        player.angle -= player.turnSpeed;
    }

    //rightturn
    if(keys["d"] || keys["ArrowRight"]){
        player.angle += player.turnSpeed;
    }

    //forward
    player.x += Math.cos(player.angle) * player.speed;
    player.y += Math.sin(player.angle) * player.speed;

    //friction
    player.speed *= player.friction;

    // outerwalls
    if(player.x < 0){
        player.x = 0;
        player.speed *= -0.5;
    }

    if(player.y < 0){
        player.y = 0;
        player.speed *= -0.5;
    }

    if(player.x + player.width > canvas.width){
        player.x = canvas.width - player.width;
        player.speed *= -0.5;
    }

    if(player.y + player.height > canvas.height){
        player.y = canvas.height - player.height;
        player.speed *= -0.5;
    }

}

function checkBarrierCollision(){

    barriers.forEach(barrier => {

        if(
            player.x < barrier.x + barrier.width &&
            player.x + player.width > barrier.x &&
            player.y < barrier.y + barrier.height &&
            player.y + player.height > barrier.y
        ){

            //bounce
            player.speed *= -0.5;

            //push
            player.x -= Math.cos(player.angle) * 10;
            player.y -= Math.sin(player.angle) * 10;
        }

    });

}

//sakalaban
function moveEnemies(){

    if(gameOver){
        return;
    }

    enemies.forEach(enemy => {

        let targetAngle;

        //avoidance
        if(enemy.avoidTimer > 0){

            targetAngle = enemy.avoidAngle;

            enemy.avoidTimer--;
        }

        else {

            //runaway
            let dx = enemy.x - player.x;
            let dy = enemy.y - player.y;

            targetAngle = Math.atan2(dy, dx);

        }

        //rotation
        let angleDifference = targetAngle - enemy.angle;

        //cleanangle
        angleDifference = Math.atan2(
            Math.sin(angleDifference),
            Math.cos(angleDifference)
        );

        //turn
        if(angleDifference > 0){
            enemy.angle += enemy.turnSpeed;
        }
        else{
            enemy.angle -= enemy.turnSpeed;
        }

        //forward
        enemy.x += Math.cos(enemy.angle) * enemy.speed;
        enemy.y += Math.sin(enemy.angle) * enemy.speed;

        //outerwalls
        if(enemy.x < 0){
            enemy.x = 0;
            enemy.angle += Math.PI;
        }

        if(enemy.y < 0){
            enemy.y = 0;
            enemy.angle += Math.PI;
        }

        if(enemy.x + enemy.width > canvas.width){
            enemy.x = canvas.width - enemy.width;
            enemy.angle += Math.PI;
        }

        if(enemy.y + enemy.height > canvas.height){
            enemy.y = canvas.height - enemy.height;
            enemy.angle += Math.PI;
        }

        //barriersmash
        barriers.forEach(barrier => {

            if(
                enemy.x < barrier.x + barrier.width &&
                enemy.x + enemy.width > barrier.x &&
                enemy.y < barrier.y + barrier.height &&
                enemy.y + enemy.height > barrier.y
            ){

                //avoidance
                enemy.avoidTimer = 40;

                //rndmescape
                enemy.avoidAngle =
                    enemy.angle +
                    (Math.random() * Math.PI - Math.PI / 2);

                //pushback
                enemy.x -= Math.cos(enemy.angle) * 10;
                enemy.y -= Math.sin(enemy.angle) * 10;
            }

        });

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
            combo++;
            comboTimer = 2;

            if(combo >= 5){
               score += 100;
            }

            else if(combo >= 3){
                score += 50;
            }

            else{
                score += 10;
            }

            //rndmpush
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

    ctx.save();

    //center
    ctx.translate(
        player.x + player.width / 2,
        player.y + player.height / 2
    );

    //rotate
    ctx.rotate(player.angle + Math.PI / 2);

    //drawcar
    ctx.fillStyle = player.color;

    ctx.fillRect(
        -player.width / 2,
        -player.height / 2,
        player.width,
        player.height
    );

    ctx.restore();
}

//kalaban
function drawEnemies(){

    enemies.forEach(enemy => {

        ctx.save();

        //movecenter
        ctx.translate(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2
        );

        //rotate
        ctx.rotate(enemy.angle);

        //draw
        ctx.fillStyle = enemy.color;

        ctx.fillRect(
            -enemy.width / 2,
            -enemy.height / 2,
            enemy.width,
            enemy.height
        );

        ctx.restore();

    });

}

function drawBarriers(){

    barriers.forEach(barrier => {

        ctx.fillStyle = "gray";

        ctx.fillRect(
            barrier.x,
            barrier.y,
            barrier.width,
            barrier.height
        );

    });

}

//loop
function gameLoop(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

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