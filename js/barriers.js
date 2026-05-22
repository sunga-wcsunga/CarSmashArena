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

function drawBarriers() {

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

function checkBarrierCollision() {

    barriers.forEach(barrier => {

        if(

            player.x < barrier.x + barrier.width &&
            player.x + player.width > barrier.x &&
            player.y < barrier.y + barrier.height &&
            player.y + player.height > barrier.y
        
        ) {

            //atopmovement
            player.velocityX = 0;
            player.velocityY = 0;

            //pushbackplayer
            player.x -= Math.cos(player.angle) * 10;
            player.y -= Math.sin(player.angle) * 10;
        
        }

    } );

}