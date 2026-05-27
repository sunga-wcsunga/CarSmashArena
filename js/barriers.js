const barriers = [

    // LEFT TIRES
    {
        x: 170,
        y: 300,
        width: 90,
        height: 60
    },

    // TOP CURVED TIRES
    {
        x: 550,
        y: 145,
        width: 150,
        height: 45
    },

    // BOTTOM RIGHT TIRES
    {
        x: 790,
        y: 470,
        width: 100,
        height: 60
    }

];

function drawBarriers(){

    // no drawing needed
    // barriers are already inside arena.png

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