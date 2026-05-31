const enemyImage = new Image();
enemyImage.src = "assets/enemy.png";

let enemies = [];

createEnemies();

function createEnemies() {

    for(let i = 0; i < 5; i++) {

        enemies.push( {

            x: Math.random() * 900,
            y: Math.random() * 500,

            width: 70,
            height: 100,

            speed: 2 + Math.random() * 2,

            velocityX: 0,
            velocityY: 0,

            angle: Math.random() * Math.PI * 2,
            turnSpeed: 0.09,

            avoidTimer: 0,
            avoidAngle: 0,

            color: "red"

        } );

    }

}

function respawnEnemy(enemy){

    let valid = false;

    while(!valid){

        enemy.x = Math.random() * 800;
        enemy.y = Math.random() * 400;

        valid = true;

        barriers.forEach((barrier)=>{

            if(

                enemy.x < barrier.x + barrier.width &&
                enemy.x + enemy.width > barrier.x &&
                enemy.y < barrier.y + barrier.height &&
                enemy.y + enemy.height > barrier.y

            ){

                valid = false;

            }

        });

    }

}

function moveEnemies() {

    if(gameOver) {

        return;

    }

    enemies.forEach(enemy => {

        let targetAngle;

        //avoidance
        if(enemy.avoidTimer > 0) {

            targetAngle = enemy.avoidAngle;
            enemy.avoidTimer--;

        }

        else {

            //mode:classic
            if(gameMode === "classic"){

                //enemyruns
                let dx = enemy.x - player.x;
                let dy = enemy.y - player.y;

                targetAngle = Math.atan2(dy, dx);

            }

            //mode:survival
            else if(gameMode === "survival"){

                //enemychases
                let dx = player.x - enemy.x;
                let dy = player.y - enemy.y;

                targetAngle = Math.atan2(dy, dx);

            }

        }

        //rotation
        let angleDifference = targetAngle - enemy.angle;

        //cleanangle
        angleDifference = Math.atan2(

            Math.sin(angleDifference),
            Math.cos(angleDifference)

        );

        //turn
        if(angleDifference > 0) {

            enemy.angle += enemy.turnSpeed;

        }

        else {

            enemy.angle -= enemy.turnSpeed;

        }

        //forward
        enemy.velocityX += Math.cos(enemy.angle) * 0.35;
        enemy.velocityY += Math.sin(enemy.angle) * 0.35;

        enemy.x += enemy.velocityX;
        enemy.y += enemy.velocityY;

        enemy.velocityX *= 0.97;
        enemy.velocityY *= 0.97;

        //outerwalls
        if(enemy.x < 0) {

            enemy.x = 0;
            enemy.angle += Math.PI;

        }

        if(enemy.y < 0) {

            enemy.y = 0;
            enemy.angle += Math.PI;

        }

        if(enemy.x + enemy.width > canvas.width) {

            enemy.x = canvas.width - enemy.width;
            enemy.angle += Math.PI;

        }

        if(enemy.y + enemy.height > canvas.height) {

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

            ) {

                //avoidance
                enemy.avoidTimer = 90;

                //rndmescape
                enemy.avoidAngle =
                    enemy.angle +
                    (Math.random() * Math.PI - Math.PI / 2);

                //pushback
                enemy.x -= Math.cos(enemy.angle) * 20;
                enemy.y -= Math.sin(enemy.angle) * 20;

                enemy.velocityX = 0;
                enemy.velocityY = 0;
                enemy.angle = enemy.avoidAngle;

            }

        } );

    } );

}

function checkEnemyCollisions(){

    for(let i = 0; i < enemies.length; i++){

        for(let j = i + 1; j < enemies.length; j++){

            let enemy1 = enemies[i];
            let enemy2 = enemies[j];

            if(

                enemy1.x < enemy2.x + enemy2.width &&
                enemy1.x + enemy1.width > enemy2.x &&
                enemy1.y < enemy2.y + enemy2.height &&
                enemy1.y + enemy1.height > enemy2.y

            ){

                //pushapart
                let dx = enemy1.x - enemy2.x;
                let dy = enemy1.y - enemy2.y;

                let distance = Math.sqrt(dx * dx + dy * dy);

                if(distance === 0){
                    distance = 1;
                }

                let pushX = dx / distance;
                let pushY = dy / distance;

                enemy1.x += pushX * 5;
                enemy1.y += pushY * 5;

                enemy2.x -= pushX * 5;
                enemy2.y -= pushY * 5;

            }

        }

    }

}

function drawEnemies(){

    enemies.forEach(enemy => {

        ctx.save();

        ctx.translate(
            enemy.x + enemy.width / 2,
            enemy.y + enemy.height / 2
        );

        ctx.rotate(enemy.angle + Math.PI / 2);

        ctx.drawImage(
            enemyImage,
            -enemy.width / 2,
            -enemy.height / 2,
            enemy.width,
            enemy.height
        );

        ctx.restore();

    });

}