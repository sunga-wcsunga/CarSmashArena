const barriers = [

    // LEFT TIRES
    {
        x: 155,
        y: 290,
        width: 130,
        height: 80
    },

    // TOP CURVED TIRES
    {
        x: 450,
        y: 150,
        width: 200,
        height: 55
    },

    // BOTTOM RIGHT TIRES
    {
        x: 700,
        y: 400,
        width: 200,
        height: 100
    }

];

function drawBarriers(){


}

function checkBarrierCollision() {

    barriers.forEach(barrier => {

        if(

            player.x < barrier.x + barrier.width &&
            player.x + player.width > barrier.x &&
            player.y < barrier.y + barrier.height &&
            player.y + player.height > barrier.y

        ) {

            player.velocityX = 0;
            player.velocityY = 0;

            player.x = player.oldX;
            player.y = player.oldY;

        }

    });

}