function checkCollisions() {

    enemies.forEach(enemy => {

        if(

            player.x < enemy.x + enemy.width &&
            player.x + player.width > enemy.x &&
            player.y < enemy.y + enemy.height &&
            player.y + player.height > enemy.y
        
        ) {
        
            //addscore
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