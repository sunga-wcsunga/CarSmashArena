function checkCollisions() {

    enemies.forEach(enemy => {

        if(

            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        
        ) {

            crashSound.currentTime = 0;
            crashSound.play();
            screenShake = 12;
        
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

                //direction
                let dx = enemy.x - player.x;
                let dy = enemy.y - player.y;

                let collisionAngle = Math.atan2(dy, dx);

                //playerfacing
                let playerDifference =
                    collisionAngle - player.angle;

                    playerDifference = Math.atan2(

                        Math.sin(playerDifference),
                        Math.cos(playerDifference)

                    );

                //enemyfacingplayer
                let enemyToPlayerAngle =
                    Math.atan2(
                        player.y - enemy.y,
                        player.x - enemy.x
                    );

                let enemyDifference =
                    enemyToPlayerAngle - enemy.angle;

                    enemyDifference = Math.atan2(

                        Math.sin(enemyDifference),
                        Math.cos(enemyDifference)

                    );

                //frontchecks
                let playerFront =
                    Math.abs(playerDifference) < 1;

                let enemyFront =
                    Math.abs(enemyDifference) < 1;

                //headsoncrash
                if(playerFront && enemyFront){

                    player.velocityX -=
                        Math.cos(player.angle) * 8;

                    player.velocityY -=
                        Math.sin(player.angle) * 8;

                    enemy.velocityX -=
                        Math.cos(enemy.angle) * 8;

                    enemy.velocityY -=
                        Math.sin(enemy.angle) * 8;

                }

                //playerattack
                else if(playerFront && !enemyFront){

                    score += 25;

                }

                //enemyattack
                else if(enemyFront && !playerFront){

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