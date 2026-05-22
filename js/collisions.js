function checkCollisions() {

    enemies.forEach(enemy => {

        if(

            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        
        ) {
        
            //mode:classic
            if(gameMode === "classic") {

                combo++;
                comboTimer = 5;

                if(combo >= 5) {

                    score += 100;

                }

                else if(combo >= 3) {

                    score += 50;

                }
    
                else {

                score += 10;

                }

            }

            //mode:survival
            else if(gameMode === "survival"){

                // DIRECTION TO ENEMY
                let dx = enemy.x - player.x;
                let dy = enemy.y - player.y;

                let collisionAngle = Math.atan2(dy, dx);

                // PLAYER FACING CHECK
                let playerDifference = collisionAngle - player.angle;

                    playerDifference = Math.atan2(

                        Math.sin(playerDifference),
                        Math.cos(playerDifference)

                    );

                // ENEMY FACING CHECK
                let enemyToPlayerAngle = Math.atan2(player.y - enemy.y,
                    
                    player.x - enemy.x);

                let enemyDifference = enemyToPlayerAngle - enemy.angle;

                    enemyDifference = Math.atan2(

                        Math.sin(enemyDifference),
                        Math.cos(enemyDifference)

                    );

                // IS PLAYER FRONT HITTING?
                let playerFront = Math.abs(playerDifference) < 1;

                // IS ENEMY FRONT HITTING?
                let enemyFront = Math.abs(enemyDifference) > 1;

                // HEAD TO HEAD
                if(playerFront && enemyFront){

                    // BOUNCE PLAYER
                    player.velocityX -= Math.cos(player.angle) * 8;

                    player.velocityY -= Math.sin(player.angle) * 8;

                    // BOUNCE ENEMY
                    enemy.velocityX -= Math.cos(enemy.angle) * 8;

                    enemy.velocityY -= Math.sin(enemy.angle) * 8;

                }

                // PLAYER ATTACK
                else if(playerFront){

                    score += 25;

                }

                // ENEMY ATTACK
                else if(enemyFront){

                    playerHealth -= 20;

                    if(playerHealth <= 0){

                        gameOver = true;

                    }

                }

            }


            //respawn
            enemy.x = Math.random() * 900;
            enemy.y = Math.random() * 500;

            //resetmovement
            enemy.velocityX = 0;
            enemy.velocityY = 0;

            //rndomplace
            enemy.angle = Math.random() * Math.PI * 2;

            //rndmpush
            let impactForce = 8;

            //crashcolor
            player.color = "yellow";

            setTimeout(()=>{
            
                player.color = "cyan";
            
            } ,100);
        
        }

    } );

}